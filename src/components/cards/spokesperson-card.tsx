import Image from "next/image";

type SpokespersonCardProps = {
  spokesperson: {
    key: number;
    imageUrl: string;
    name: string;
    title: string;
    agreeRatio: number;
    disagreeRatio: number;
    participantsCount: number;
    inputWordCount: number;
    hasVoted: boolean;
  };
};

const SpokespersonCard = ({ spokesperson }: SpokespersonCardProps) => {
  return (
    <div className="inline-flex w-80 p-8 flex-col items-center gap-6 rounded-lg border border-opacity-10 custom-border-color">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 justify-center items-center">
          <Image
            src={spokesperson.imageUrl || "/icons/spokesperson.svg"}
            alt={spokesperson.name}
            width={128}
            height={128}
            style={{ borderRadius: "50%" }}
          />
        </div>
        <p className="text-xs font-medium leading-5 mt-1">
          {spokesperson.name}
        </p>
        <p className="text-base mt-2">{spokesperson.title}</p>
      </div>
      <div className="flex gap-1 justify-center w-full h-12">
        <div className="flex flex-row justify-between items-center w-80 h-12 bg-blue-900 py-2 px-4 rounded-l-xl">
          <p className="text-xl text-white">찬성</p>
          <p className="text-xl text-white">{spokesperson.agreeRatio}%</p>
        </div>
        <div className="flex flex-row justify-between items-center w-full h-12 bg-blue-700 py-2 px-4 rounded-r-xl ">
          <p className="text-sm text-white">{spokesperson.disagreeRatio}%</p>
          <p className="text-sm text-white">반대</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-row items-center justify-center gap-5">
          <div className="flex flex-row items-center justify-center gap-1">
            <Image
              src="/icons/person-spokespersonCard.svg"
              alt="participantsCount"
              width={15}
              height={15}
            />
            <p className="text-sm">{spokesperson.participantsCount}</p>
          </div>
          <div className="flex flex-row items-center justify-center gap-1">
            <Image
              src="/icons/chat-spokespersonCard.svg"
              alt="participantsCount"
              width={15}
              height={15}
            />
            <p className="text-sm">{spokesperson.inputWordCount}</p>
          </div>
        </div>
        {spokesperson.hasVoted ? (
          <div className="flex flex-row items-center justify-center gap-1 bg-sky-500 py-1 px-2.5 rounded-full">
            <Image
              src="/icons/check-spokespersonCard.svg"
              alt="hasvoted"
              width={16}
              height={16}
            />
            <p className="text-sm text-white">투표 완료</p>
          </div>
        ) : (
          <p>투표 미완료</p>
        )}
      </div>
    </div>
  );
};

export default SpokespersonCard;
