'use client';
import { useContext, useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ChatHeader from './components/ChatHeader';
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import { MessagesContext } from '@/context/messages';
import { MessagePayload } from '@/validation/message';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import useAIChatServer from '@/hooks/getAIServer.tsx/useAIChatServer';
import { Button } from '@/components/ui';

interface AgendaAgreeAccordionProps {
  setAgreeClicked: (value: boolean) => void;
  disagreeClicked: boolean;
  agendaDetail: any;
}

export function AgendaAgreeAccordion({
  setAgreeClicked,
  disagreeClicked,
  agendaDetail,
}: AgendaAgreeAccordionProps) {
  const [close, setClose] = useState(0);

  const { removeAllMessages, messages } = useContext(MessagesContext);

  const firstTouch = true;

  const { mutate: sendMessage, isPending } = useAIChatServer(firstTouch);

  function SubmitSave() {
    // Your logic goes here
    console.log('Button clicked!', messages);
  }

  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccordionItem value='item-1'>
        <div className='bg-white border border-gray-200 rounded-md overflow-hidden'>
          <div className='flex flex-col '>
            <AccordionTrigger
              disabled={disagreeClicked || isPending}
              onClick={() => {
                if (close) {
                  removeAllMessages();
                  setAgreeClicked(false);
                  setClose(0);
                } else {
                  setAgreeClicked(true);
                  const message: MessagePayload = {
                    id: nanoid(),
                    isUserMessage: true,
                    text: agendaDetail.agree_comment,
                    input: agendaDetail.agree_comment,
                    agenda: agendaDetail.subject,
                    agree_disagree: 'agree',
                    chat_history: [],
                  };

                  sendMessage(message);
                  setClose(1);
                }
              }}
              className='px-6 border-b border-zinc-300'
            >
              <ChatHeader comment={agendaDetail.agree_comment} />
            </AccordionTrigger>
            <AccordionContent>
              <div className='flex flex-col text-black '>
                <ChatMessages className='px-2 py-3 flex-1' />
                <ChatInput
                  className='px-4'
                  isPendingParent={isPending}
                  agree={true}
                  comment={agendaDetail.agree_comment}
                  subject={agendaDetail.subject}
                />
                <Button
                  className='w-full border border-dark-1 mt-5 bg-[#F6D658] hover:opacity-70'
                  onClick={SubmitSave}
                >
                  Submit & Save
                </Button>
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
