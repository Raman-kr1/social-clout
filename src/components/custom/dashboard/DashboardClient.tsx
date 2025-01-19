"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CelebrationPost from "@/components/custom/PostTypes/CelebrationPost";
import ImagePost from "@/components/custom/PostTypes/ImagePost";
import TextPost from "@/components/custom/PostTypes/TextPost";
import VideoPost from "@/components/custom/PostTypes/VideoPost";
import MasonryLayout from "@/components/custom/other/MasonryLayout";
import { usePostStore, useProfileStore } from "@/store/profileSave";
import { SelectMultiple } from "@/components/MultiSelectDropdown";
import SortingSelect from "@/components/custom/sorting/SortingSelect";
import useSortingAndFilteringStore from "@/store/sortingAndFilterting";
import { Spinner } from "@/components/ui/spinner";
import FilterSidebar from "@/components/custom/filters/FilterSidebar";
import { Columns2, Columns3, Columns4, Rows3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useLayoutChanger from "@/store/layoutChanger";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import DocumentPost from "@/components/custom/PostTypes/DocumentPost";
import { postsDB } from '../../../lib/indexedDb';

const DashboardClient = ({ initialProfiles }: any) => {

  const { posts, setPost, fetchPostFromDatabase } = usePostStore();
  const { selectedSorting, likesRange, commentsRange, repostsRange, selectedMediaTypes, selectedTimeFilter } = useSortingAndFilteringStore();

  // const transformedData: { value: string, label: string }[] = initialProfiles && initialProfiles.map((item: any) => {
  //   const profileId = item.split('/').filter(Boolean).pop() || "Unknown";
  //   return {
  //     label: profileId,
  //     value: item
  //   };
  // }).filter((item: { label: string; value: string }) => item.label !== undefined); // Explicitly define the type of item

  const transformedData = useMemo(() =>
    initialProfiles?.map((item: any) => ({
      label: item.split('/').filter(Boolean).pop() || "Unknown",
      value: item
    })).filter((item: { label: string; value: string }) => item.label !== undefined),
    [initialProfiles]
  );

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(15); // Number of items to show
  const [loading, setLoading] = useState(false); // Number of items to show
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loaderRef = useRef(null);
  // Use a ref to track if the options have been set
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const loadMorePosts = () => {
    if (filteredAndSortedPosts.length > visibleCount) {
      setIsLoadingMore(true);
      // Simulate loading delay
      setTimeout(() => {
        setVisibleCount((prevCount) => prevCount + 15);
        setIsLoadingMore(false);
      }, 500);
    }
  };

  const optionsInitialized = useRef(false);
  useEffect(() => {
    // Set selectedOptions only if transformedData is not empty and not already initialized
    if (transformedData.length > 0 && !optionsInitialized.current) {
      setSelectedOptions(transformedData.map((option: { label: string, value: string }) => option.value)); // Initialize with all options
      optionsInitialized.current = true; // Mark as initialized
    }
  }, [transformedData]); // Only run when transformedData changes\


  // filtering code
  const filterPosts = useMemo(() => {
    return (postsToFilter: any[]) => {
      return postsToFilter.filter(post => {
        // Media Type Filter
        if (selectedMediaTypes.length > 0 && selectedMediaTypes[0] !== 'any') {
          const postType = getPostMediaType(post);
          if (!selectedMediaTypes.includes(postType)) {
            return false;
          }
        }

        // Time Filter
        if (selectedTimeFilter && selectedTimeFilter !== 'all_time') {
          const postTimestamp = parseDate(post.actor.subDescription.accessibilityText);
          const currentTime = Date.now();

          switch (selectedTimeFilter) {
            case 'today':
              if (currentTime - postTimestamp > 24 * 60 * 60 * 1000) return false;
              break;
            case '7_days':
              if (currentTime - postTimestamp > 7 * 24 * 60 * 60 * 1000) return false;
              break;
            case '1_month':
              if (currentTime - postTimestamp > 30 * 24 * 60 * 60 * 1000) return false;
              break;
            case '3_months':
              if (currentTime - postTimestamp > 3 * 30 * 24 * 60 * 60 * 1000) return false;
              break;
          }
        }

        // Likes Range Filter
        const numLikes = post.socialDetail.totalSocialActivityCounts.numLikes;
        if (likesRange.min !== null && numLikes < likesRange.min) return false;
        if (likesRange.max !== null && numLikes > likesRange.max) return false;

        // Comments Range Filter
        const numComments = post.socialDetail.totalSocialActivityCounts.numComments;
        if (commentsRange.min !== null && numComments < commentsRange.min) return false;
        if (commentsRange.max !== null && numComments > commentsRange.max) return false;

        // Reposts Range Filter
        const numReposts = post.socialDetail.totalSocialActivityCounts.numShares;
        if (repostsRange.min !== null && numReposts < repostsRange.min) return false;
        if (repostsRange.max !== null && numReposts > repostsRange.max) return false;

        // Note: Followers range filter would require additional user profile data
        // which isn't present in the current post object

        return true;
      });
    };
  }, [
    selectedMediaTypes,
    selectedTimeFilter,
    likesRange,
    commentsRange,
    repostsRange
  ]);

  // Helper function to determine post media type
  const getPostMediaType = (post: any): string => {
    if (post.content?.["com.linkedin.voyager.feed.render.ImageComponent"]) return 'image';
    if (post.content?.["com.linkedin.voyager.feed.render.DocumentComponent"]) return 'document';
    if (post.content?.["com.linkedin.voyager.feed.render.VideoComponent"]) return 'video';
    // Add more type checks as needed
    return 'text';
  };

  // sorting logic
  const getSortPost = (sorting: string | null, postsToSort: any[]) => {
    if (!sorting) return postsToSort; // Return original posts if no sorting is selected

    return [...postsToSort].sort((a, b) => {
      switch (sorting) {
        case "likes":
          return b.socialDetail.totalSocialActivityCounts.numLikes - a.socialDetail.totalSocialActivityCounts.numLikes;
        case "comments":
          return b.socialDetail.totalSocialActivityCounts.numComments - a.socialDetail.totalSocialActivityCounts.numComments;
        case "reposts":
          return b.socialDetail.totalSocialActivityCounts.numShares - a.socialDetail.totalSocialActivityCounts.numShares;
        case "relevance":
          return 0; // Keep original order for relevance
        case "date":
          return compareDates(a.actor.subDescription.accessibilityText, b.actor.subDescription.accessibilityText);
        default:
          return 0; // Default case
      }
    });
  };

  // helper method for soting
  const compareDates = (dateA: string, dateB: string) => {
    // Convert date strings to comparable values
    const timeA = parseDate(dateA);
    const timeB = parseDate(dateB);
    return timeB - timeA; // Sort in descending order
  };

  // helper method for soting
  const parseDate = (dateString: string) => {
    // Convert the date string to a timestamp
    const timeUnits: { [key: string]: number } = {
      'hour': 60 * 60 * 1000,
      'day': 24 * 60 * 60 * 1000,
      'week': 7 * 24 * 60 * 60 * 1000,
      'month': 30 * 24 * 60 * 60 * 1000,
      'year': 365 * 24 * 60 * 60 * 1000,
    };

    const regex = /(\d+)\s*(hour|day|week|month|year)/;
    const match = dateString.match(regex);
    if (match) {
      const value = parseInt(match[1], 10);
      const unit = match[2] as keyof typeof timeUnits;
      return Date.now() - value * timeUnits[unit]; // Calculate the timestamp
    }
    return Date.now(); // Default to now if parsing fails
  }

  // Fetching posts one by one
  // const fetchPostsOneByOne = async (profiles: string[]) => {
  //   setLoading(true);
  //   let allPosts: any[] = [];

  //   for (const url of profiles) {
  //     try {
  //       const response = await fetchPostFromDatabase(url);
  //       const postsData = response?.data?.[0]?.elements || [];

  //       if (postsData.length > 0) {
  //         allPosts = [...allPosts, ...postsData];
  //         setLoading(false);
  //         setPost(allPosts); // Add posts to the existing state
  //       }
  //     } catch (error) {
  //       console.error("Error fetching post:", error);
  //     }
  //   }
  // };

  // // // Sequential data fetching and progressive state update
  // useEffect(() => {
  //   // If there are selected options to fetch posts from
  //   if (selectedOptions.length > 0) {
  //     fetchPostsOneByOne(selectedOptions);
  //   };

  // }, [selectedOptions]);

  const fetchPostsProgressively = async (profiles: string[]) => {
    setLoading(true);

    if (profiles.length === 0) return;

    // Try to find the first profile with data
    let firstValidPosts = null;
    let firstValidIndex = 0;

    for (let i = 0; i < profiles.length; i++) {
      const cachedPosts = await postsDB.getPosts(profiles[i]);
      if (cachedPosts && Array.isArray(cachedPosts) && cachedPosts.length > 0) {
        firstValidPosts = cachedPosts;
        firstValidIndex = i;
        break;
      }

      const response = await fetchPostFromDatabase(profiles[i]);
      const postsData = response?.data?.[0]?.elements || [];
      if (postsData.length > 0) {
        await postsDB.savePosts(profiles[i], postsData);
        firstValidPosts = postsData;
        firstValidIndex = i;
        break;
      }
    }

    // Set first valid posts if found
    if (firstValidPosts) {
      setPost(firstValidPosts as any[]);
      setLoading(false);
      // Fetch remaining profiles in parallel
      const remainingProfiles = profiles.slice(firstValidIndex + 1);
      if (remainingProfiles.length > 0) {
        const promises = remainingProfiles.map(async (profileUrl) => {
          const cachedPosts = await postsDB.getPosts(profileUrl);
          if (cachedPosts) {
            return cachedPosts;
          } else {
            const response = await fetchPostFromDatabase(profileUrl);
            const postsData = response?.data?.[0]?.elements || [];
            if (postsData.length > 0) {
              await postsDB.savePosts(profileUrl, postsData);
            }
            return postsData;
          }
        });

        const results = await Promise.all(promises);
        const allRemainingPosts = results.flat();
        setPost([...firstValidPosts, ...allRemainingPosts]);
        setLoading(false);
      }
    }
  };

  // Initialize DB and fetch data
  useEffect(() => {
    postsDB.initDB().catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedOptions.length > 0) {
      setPost([]); // Clear current posts
      fetchPostsProgressively(selectedOptions);
    }
  }, [selectedOptions]);

  const filteredAndSortedPosts = useMemo(() => {
    const filteredPosts = filterPosts(posts);
    return getSortPost(selectedSorting, filteredPosts);
  }, [posts, filterPosts, selectedSorting]);


  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !isLoadingMore) {
          loadMorePosts();
        }
      },
      {
        root: null, // viewport
        rootMargin: '1600px 0px', // Start loading 400px before the element comes into view
        threshold: 0 // Trigger as soon as even one pixel is visible
      }
    );

    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [loaderRef, filteredAndSortedPosts]);

  const { columns, setColumns, disbaled } = useLayoutChanger();

  const toggleColumns = () => {
    if (columns === 4) {
      setColumns(1); // Cycle back to 1 column after 4
    } else if (columns === 1) {
      setColumns(2); // Switch to 2 columns
    } else if (columns === 2) {
      setColumns(3); // Switch to 3 columns
    } else if (columns === 3) {
      setColumns(4); // Switch to 4 columns
    }
  };

  return (
    <>
      <div className={`min-h-svh content-wrapper ${isSidebarOpen ? 'sidebar-open' : ''} p-4 relative`}>

        <div className="flex md:flex-row flex-col gap-2 justify-between items-center">
          <h3 className="text-2xl font-semibold">Inspiration</h3>
          <div className="md:max-w-80 w-full">
            <SelectMultiple allOptions={transformedData} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} placeholder="Select users..." />
          </div>
        </div>

        <div className="flex justify-between gap-2 items-center mt-2">
          <div className="flex w-full gap-2">
            <SortingSelect />
            <FilterSidebar onOpenChange={setIsSidebarOpen} />
          </div>
          <div className="flex items-center">
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" className="disabled:cursor-not-allowed" variant="outline" onClick={toggleColumns} disabled={disbaled}>
                    {
                      columns === 4 ? <Columns4 size={20} /> : columns === 3 ? <Columns3 size={20} /> : columns === 2 ? <Columns2 size={20} /> : columns === 1 ? <Rows3 size={20} /> : disbaled ? <Rows3 size={20} /> : <Rows3 size={20} />
                    }
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Layout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {
          loading ? <div className="flex items-center gap-2"><Spinner size="sm" className="bg-black dark:bg-white" /> Loading...</div> : <MasonryLayout>
            {
              filteredAndSortedPosts.length > 0 ?
                filteredAndSortedPosts.slice(0, visibleCount).map((postData, index) => {
                  if (postData.content?.["com.linkedin.voyager.feed.render.CelebrationComponent"]) {
                    return (
                      <CelebrationPost data={postData} key={index} />
                    )
                  }
                  else if (postData.content?.["com.linkedin.voyager.feed.render.ImageComponent"]) {
                    return (
                      <ImagePost data={postData} key={index} />
                    )
                  }
                  else if (postData.content?.["com.linkedin.voyager.feed.render.DocumentComponent"]) {
                    return (
                      <DocumentPost data={postData} key={index} />
                    )
                  }
                  else if (postData.content?.["com.linkedin.voyager.feed.render.LinkedInVideoComponent"]) {
                    return (
                      <VideoPost data={postData} key={index} />
                    )
                  }
                  else {
                    return (
                      <TextPost data={postData} key={index} />
                    )
                  }
                })
                :
                <div>No user selected !!</div>
            }
          </MasonryLayout>
        }

        {filteredAndSortedPosts.length > visibleCount && (
          <div
            ref={loaderRef}
            className="w-full py-4 flex justify-center"
          >
            {isLoadingMore && (
              <div className="flex items-center gap-2">
                <Spinner size="sm" className="bg-black dark:bg-white" /> Loading more...
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default DashboardClient;