import CommentsComponent from "../LinkedinPost/CommentsComponent"
import LikesComponent from "../LinkedinPost/LikesComponent"
import ProfileImage from "../LinkedinPost/ProfileImage"
import RepostsComponent from "../LinkedinPost/RepostsComponent"
import ReadMoreText from "../other/ReadMoreText"

const ResharePost = ({ data }: any) => {

  return (
    <>
      <div className="antialiased flex flex-col p-4 bg-white rounded-xl shadow border-2 border-zinc-100 h-fit">
        <div className="flex gap-4">
          <ProfileImage data={data} />
          <div className="w-full">
            <div className="flex items-center justify-between">
              <p className="font-medium">{data.actor.name.text}</p>
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-medium text-zinc-600">{data.actor.subDescription.accessibilityText}</p>
                <p className="text-xs text-[#6b5011] bg-[#eed337] px-2 py-1 rounded-full font-medium">Text</p>
              </div>
            </div>
            <p className="text-xs text-zinc-600">{data.actor.description.text}</p>
          </div>
        </div>
        <div className="mt-3 inline">
          {
            data?.commentary?.text?.text && <ReadMoreText textData={data.commentary.text.text} />
          }
        </div>

        <div className="flex items-center justify-between mt-4">
          <LikesComponent numOfLikes={data.socialDetail.totalSocialActivityCounts.numLikes} reactionTypes={data.socialDetail.totalSocialActivityCounts.reactionTypeCounts} />
          <div className="flex items-center gap-1">
            <CommentsComponent numOfComments={data.socialDetail.totalSocialActivityCounts.numComments} />
            {
              data.socialDetail.totalSocialActivityCounts.numShares > 0 && <>
                <span className="text-zinc-600">&bull;</span>
                <RepostsComponent numOfReposts={data.socialDetail.totalSocialActivityCounts.numShares} />
              </>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default ResharePost