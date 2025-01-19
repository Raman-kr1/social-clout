import Image from "next/image"
import CommentsComponent from "../LinkedinPost/CommentsComponent"
import LikesComponent from "../LinkedinPost/LikesComponent"
import ProfileImage from "../LinkedinPost/ProfileImage"
import RepostsComponent from "../LinkedinPost/RepostsComponent"
import PostFooter from "../other/PostFooter"

const CelebrationPost = ({ data }: any) => {

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
                <p className="text-xs text-[#0e4739] bg-[#abffca] px-2 py-1 rounded-full font-medium">Celebration</p>
              </div>
            </div>
            <p className="text-xs text-zinc-600">{data.actor.description.text}</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-sm text-zinc-800 font-medium">
            {
              data?.commentary?.text?.text
            }
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden mt-4">
          {
            <img className="object-cover" src={data.content["com.linkedin.voyager.feed.render.CelebrationComponent"]?.image.attributes[0].imageUrl} alt="content-image" />
          }
          <span className="absolute bg-gradient-to-t from-black/60 from-10% to-transparent w-full h-full top-0 inset-0"></span>
          <p className="absolute bottom-2 left-2 text-white/70 text-sm font-light">
            {data?.content["com.linkedin.voyager.feed.render.CelebrationComponent"]?.headline.text}
          </p>
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

        <PostFooter data={data} />
      </div>
    </>
  )
}

export default CelebrationPost