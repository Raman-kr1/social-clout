import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { BookmarkCheck, BookmarkPlus, BookmarkX, ExternalLink, Eye } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import CopyLinkPost from './CopyLinkPost'
import { usePostStorageStore } from '@/store/profileSave';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from 'next/navigation'

const PostFooter = ({ data }: { data: any }) => {

  const savePost = usePostStorageStore((state) => state.savePost)
  const unsavePost = usePostStorageStore((state) => state.unsavePost)
  const savedPosts = usePostStorageStore((state) => state.savedPosts);
  const path = usePathname();

  const handleSavePost = () => {
    savePost(data, data.socialContent.shareUrl)
  }

  const handleUnsavePost = () => {
    unsavePost(data.socialContent.shareUrl)
  }

  const isPostSaved = savedPosts.some(savedPost => savedPost.url === data.socialContent.shareUrl);

  return (
    <>
      <Separator className="my-2" />
      <div className="flex items-center md:gap-2 gap-1 justify-center">

        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="w-full min-w-0" size="sm" asChild>
                <Link target='_blank' href={data.socialContent.shareUrl}>
                  <Eye size={20} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Post</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator orientation="vertical" className="h-5 text-slate-600" />

        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="w-full min-w-0" size="sm" disabled>
                <ExternalLink size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator orientation="vertical" className="h-5 text-slate-600" />
        <CopyLinkPost textToCopy={data.socialContent.shareUrl} />

        <Separator orientation="vertical" className="h-5 text-slate-600" />

        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className={`w-full min-w-0 ${isPostSaved ? 'bg-green-300/50 hover:bg-green-300/50 text-green-900 hover:text-green-900' : ''} ${path === "/saved-posts" ? "bg-red-300/50 text-rose-900 hover:bg-red-300/50 hover:text-rose-900" : ""}`}
                size="sm"
                onClick={isPostSaved ? handleUnsavePost : handleSavePost}
              >
                {isPostSaved && path === "/saved-posts" ? <BookmarkX size={20} /> : isPostSaved && path !== "/saved-posts" ? <BookmarkCheck size={20} /> : <BookmarkPlus size={20} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {
                  isPostSaved && path === "/saved-posts" ? "Remove" : isPostSaved && path !== "/saved-posts" ? "Saved" : "Save"
                }
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  )
}

export default PostFooter