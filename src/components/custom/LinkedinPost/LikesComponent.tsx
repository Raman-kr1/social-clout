import { CelebrateIcon, FunnyIcon, InsightfulIcon, LikeIcon, LoveIcon, SupportIcon } from "@/components/svgs/Icons";

interface LikesComponentProps {
  numOfLikes: number;
  reactionTypes: {
    count: number;
    reactionType: "LIKE" | "PRAISE" | "EMPATHY" | "ENTERTAINMENT" | "INTEREST" | "MAYBE" | string;
  }[]
};


const LikesComponent = ({ numOfLikes, reactionTypes }: LikesComponentProps) => {

  const reactionIcons = {
    "LIKE": <LikeIcon className="size-4" />,
    "PRAISE": <CelebrateIcon className="size-4" />,
    "EMPATHY": <SupportIcon className="size-4" />,
    "ENTERTAINMENT": <FunnyIcon className="size-4" />,
    "INTEREST": <LoveIcon className="size-4" />,
    "MAYBE": <InsightfulIcon className="size-4" />,
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="relative flex items-center w-fit">
          {
            reactionTypes.length > 0 && reactionTypes.map((react, index) => (
              <div className="flex" key={index} style={{ marginLeft: index === 0 ? "" : "-6px" }}>
                {reactionIcons[react.reactionType as keyof typeof reactionIcons] || null}
              </div>
            ))
          }
        </div>
        <span className="text-zinc-600 text-xs font-medium">
          {numOfLikes} likes
        </span>
      </div>
    </>
  )
}

export default LikesComponent