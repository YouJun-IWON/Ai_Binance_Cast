"use client";
import Image from "next/image";
import SpokespersonCard from "@/components/cards/spokesperson-card";
import { useState } from "react";

const spokespersonDummyList = [
  {
    key: 2415,
    imageUrl: "",
    name: "대변인 이름",
    title: "제목제목제목제목",
    agreeRatio: 68,
    disagreeRatio: 32,
    participantsCount: 2344,
    inputWordCount: 264532,
    tags: ["총선", "블록체인", "AI", "세계", "경제"],
    hasVoted: true,
  },
  {
    key: 0,
    imageUrl: "",
    name: "일론머스크",
    title: "테슬라 주가는 어떻게 될 것인가",
    agreeRatio: 59,
    disagreeRatio: 41,
    participantsCount: 234,
    inputWordCount: 2642,
    tags: ["세계"],
    hasVoted: true,
  },
  {
    key: 1,
    imageUrl: "",
    name: "윤석열",
    title: "의대증원 이대로 ~ ?",
    agreeRatio: 67,
    disagreeRatio: 23,
    participantsCount: 144,
    inputWordCount: 2562,
    tags: ["총선"],
    hasVoted: true,
  },
  {
    key: 2,
    imageUrl: "",
    name: "파월",
    title: "기준금리 인상할 것인가",
    agreeRatio: 59,
    disagreeRatio: 41,
    participantsCount: 6534,
    inputWordCount: 321352,
    tags: ["경제"],
    hasVoted: true,
  },
  {
    key: 3,
    imageUrl: "",
    name: "젠슨 황",
    title: "1년 뒤 GPU 가격은 어떻게 될 것인가",
    agreeRatio: 59,
    disagreeRatio: 41,
    participantsCount: 124,
    inputWordCount: 242,
    tags: ["경제", "세계"],
    hasVoted: true,
  },
  {
    key: 4,
    imageUrl: "",
    name: "젠슨 황",
    title: "5년 뒤 AI는 인간이 내는 모든 문제를 풀 수 있을 것",
    agreeRatio: 59,
    disagreeRatio: 41,
    participantsCount: 124,
    inputWordCount: 242,
    tags: ["세계", "AI"],
    hasVoted: true,
  },
];

const tags = ["총선", "블록체인", "AI", "세계", "경제"];

const People = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag),
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

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

          {/* tags */}
          <div className="flex flex-row gap-2 w-full">
            {tags.map((tag) => (
              <div
                key={tag}
                className={`text-l ${
                  selectedTags.includes(tag)
                    ? "text-primary-300"
                    : "text-primary-300 text-opacity-60"
                } cursor-pointer`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* spokesperson card list */}
          <div className="grid justify-items-center lg:grid-cols-2 gap-x-5 gap-y-3 w-full ">
            {spokespersonDummyList.map((props) => {
              if (selectedTags.length === 0) {
                return (
                  <SpokespersonCard spokesperson={props} key={props.key} />
                );
              }
              return props.tags.some((tag) => selectedTags.includes(tag)) ? (
                <SpokespersonCard spokesperson={props} key={props.key} />
              ) : null;
            })}
          </div>
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
