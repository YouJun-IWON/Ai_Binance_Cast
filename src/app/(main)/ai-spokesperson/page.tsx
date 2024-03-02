"use client";
import Image from "next/image";
import SpokespersonCard from "@/components/cards/spokesperson-card";

const spokespersonDummy = {
  key: 2415,
  imageUrl: "",
  name: "대변인 이름",
  title: "제목제목제목제목",
  agreeRatio: 68,
  disagreeRatio: 32,
  participantsCount: 2344,
  inputWordCount: 264532,
  hasVoted: true,
};

const spokespersonDummyList = [
  {
    key: 0,
    imageUrl: "",
    name: "일론머스크",
    title: "테슬라 CEO",
    agreeRatio: 59,
    disagreeRatio: 41,
    participantsCount: 234,
    inputWordCount: 2642,
    hasVoted: true,
  },
  {
    key: 1,
    imageUrl: "",
    name: "kasljgle",
    title: "akeieboabjioj",
    agreeRatio: 59,
    disagreeRatio: 41,
    participantsCount: 234,
    inputWordCount: 2642,
    hasVoted: true,
  },
  {
    key: 2,
    imageUrl: "",
    name: "kasljgle",
    title: "akeieboabjioj",
    agreeRatio: 59,
    disagreeRatio: 41,
    participantsCount: 234,
    inputWordCount: 2642,
    hasVoted: true,
  },
  {
    key: 3,
    imageUrl: "",
    name: "kasljgle",
    title: "akeieboabjioj",
    agreeRatio: 59,
    disagreeRatio: 41,
    participantsCount: 234,
    inputWordCount: 2642,
    hasVoted: true,
  },
];

const People = () => {
  return (
    <main className="flex flex-1">
      <div className="common-container">
        <div className="home-agendas">
          <div className="flex gap-4 w-full max-w-5xl">
            <Image
              src="/icons/users.svg"
              width={40}
              height={40}
              alt="edit"
              className="dark:invert-white"
            />
            <h2 className="h3-bold md:h2-bold text-left w-full">AI 대변인들</h2>
          </div>

          <ul className="flex flex-col flex-1 gap-9 w-full ">
            {/* {agendas.map((agenda: any) => (
              <AgendaCard agenda={agenda} key={agenda.id} />
            ))} */}
            {spokespersonDummyList.map((props) => (
              <SpokespersonCard spokesperson={props} key={props.key} />
            ))}
            <SpokespersonCard spokesperson={spokespersonDummy} />
          </ul>
        </div>
      </div>

      <div className="home-creators border-l-2">
        <h3 className="h3-bold text-black dark:text-light-1">
          Top AI 대변인들
        </h3>

        {/* <MessagesProvider>
        <Chat />
      </MessagesProvider> */}
      </div>
    </main>
  );
};

export default People;
