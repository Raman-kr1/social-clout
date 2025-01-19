"use client";

import CommentsComponent from "../LinkedinPost/CommentsComponent"
import LikesComponent from "../LinkedinPost/LikesComponent"
import ProfileImage from "../LinkedinPost/ProfileImage"
import RepostsComponent from "../LinkedinPost/RepostsComponent"
import MultipleImagePostComponent from "../LinkedinPost/MultipleImagePostComponent";
import ReadMoreText from "../other/ReadMoreText";
import PostFooter from "../other/PostFooter";
import Image from "next/image";

const ImagePost = ({ data }: any) => {

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
                {
                  data.content["com.linkedin.voyager.feed.render.ImageComponent"]?.images.length > 1 ?
                    <p className="text-xs text-[#b136eb] bg-[#8c29993b] px-2 py-1 rounded-full font-medium">Images</p>
                    :
                    <p className="text-xs text-[#1A5CFF] bg-[#E8EEFF] px-2 py-1 rounded-full font-medium">Image</p>
                }
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

        <div className="relative rounded-2xl overflow-hidden mt-4">
          {
            data.content["com.linkedin.voyager.feed.render.ImageComponent"]?.images.length === 1 &&
            <img className="object-cover w-full" src={data.content["com.linkedin.voyager.feed.render.ImageComponent"]?.images[0].attributes[0].vectorImage.rootUrl + data.content["com.linkedin.voyager.feed.render.ImageComponent"]?.images[0].attributes[0].vectorImage.artifacts[0].fileIdentifyingUrlPathSegment} alt="content-image" />
          }
          {
            data.content["com.linkedin.voyager.feed.render.ImageComponent"]?.images.length > 1 && <MultipleImagePostComponent images={data.content["com.linkedin.voyager.feed.render.ImageComponent"]?.images} />
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

        <PostFooter data={data} />
      </div>
    </>
  )
}

export default ImagePost