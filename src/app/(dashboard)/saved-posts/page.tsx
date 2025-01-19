"use client";

import { useEffect, useState } from 'react';
import { usePostStorageStore } from '@/store/profileSave';
import MasonryLayout from '@/components/custom/other/MasonryLayout';
import TextPost from '@/components/custom/PostTypes/TextPost';
import VideoPost from '@/components/custom/PostTypes/VideoPost';
import DocumentPost from '@/components/custom/PostTypes/DocumentPost';
import ImagePost from '@/components/custom/PostTypes/ImagePost';
import CelebrationPost from '@/components/custom/PostTypes/CelebrationPost';

const SavedPostsDashboard = () => {
  const [visiblePosts, setVisiblePosts] = useState<any[]>([]);
  const savedPosts = usePostStorageStore((state) => state.savedPosts); // Fetch saved posts from the store
  const [postsToShow, setPostsToShow] = useState(20); // Number of posts to show initially

  useEffect(() => {
    // Set the initial visible posts
    setVisiblePosts(savedPosts.slice(0, postsToShow));
  }, [savedPosts, postsToShow]);

  const handleScroll = () => {
    const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
    if (bottom) {
      // Load more posts when scrolled to the bottom
      setPostsToShow((prev) => prev + 20); // Increase the number of posts to show
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className='text-xl font-medium mb-2'>My Saved Posts</h2>
      {
        visiblePosts.length > 0 ? <MasonryLayout>
          {
            visiblePosts.map((postData: any, index: number) => {
              if (postData.data.content?.["com.linkedin.voyager.feed.render.CelebrationComponent"]) {
                return (
                  <CelebrationPost data={postData.data} key={index} />
                )
              }
              else if (postData.data.content?.["com.linkedin.voyager.feed.render.ImageComponent"]) {
                return (
                  <ImagePost data={postData.data} key={index} />
                )
              }
              else if (postData.data.content?.["com.linkedin.voyager.feed.render.DocumentComponent"]) {
                return (
                  <DocumentPost data={postData.data} key={index} />
                )
              }
              else if (postData.data.content?.["com.linkedin.voyager.feed.render.LinkedInVideoComponent"]) {
                return (
                  <VideoPost data={postData.data} key={index} />
                )
              }
              else {
                return (
                  <TextPost data={postData.data} key={index} />
                )
              }
            })
          }
        </MasonryLayout> : <span className='text-zinc-500'>No post saved yet</span>
      }
    </div>
  );
}

export default SavedPostsDashboard;