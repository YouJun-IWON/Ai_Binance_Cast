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

interface AgendaDisagreeAccordionProps {
  setDisagreeClicked: (value: boolean) => void;
  agreeClicked: boolean;
  agendaDetail: any;
}

export function AgendaDisagreeAccordion({
  setDisagreeClicked,
  agreeClicked,
  agendaDetail,
}: AgendaDisagreeAccordionProps) {
  const [close, setClose] = useState(0);

  const { removeAllMessages } = useContext(MessagesContext);

  const firstTouch = true;

  const { mutate: sendMessage, isPending } = useAIChatServer(firstTouch);

  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccordionItem value='item-1'>
        <div className='bg-white border border-gray-200 rounded-md overflow-hidden'>
          <div className='w-full h-full flex flex-col '>
            <AccordionTrigger
              disabled={agreeClicked || isPending}
              onClick={() => {
                if (close) {
                  removeAllMessages();
                  setDisagreeClicked(false);
                  setClose(0);
                } else {
                  setDisagreeClicked(true);
                  const message: MessagePayload = {
                    id: nanoid(),
                    isUserMessage: true,
                    text: agendaDetail.disagree_comment,
                    input: agendaDetail.disagree_comment,
                    agenda: agendaDetail.subject,
                    agree_disagree: 'disagree',
                    chat_history: [],
                  };

                  sendMessage(message);
                  setClose(1);
                }
              }}
              className='px-6 border-b border-zinc-300'
            >
              <ChatHeader comment={agendaDetail.disagree_comment} />
            </AccordionTrigger>
            <AccordionContent>
              <div className='flex flex-col text-black'>
                <ChatMessages className='px-2 py-3 flex-1' />
                <ChatInput
                  className='px-4'
                  isPendingParent={isPending}
                  agree={false}
                  comment={agendaDetail.disagree_comment}
                  subject={agendaDetail.subject}
                />
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
