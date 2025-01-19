"use client";

import { Trash2 } from "lucide-react";
import { PostData } from "@/types/posts";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePostStore, useProfileStore } from "@/store/profileSave";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const FetchPostDataPageDashboard = () => {

  const fetchedDataArray: PostData[] = [];
  const { profiles, fetchProfiles, deleteProfile } = useProfileStore();
  const { fetchPostFromAPI, addPostToDatabase, deletePostFromDatabase, checkPostInDatabase } = usePostStore();
  const [mounted, setMounted] = useState<boolean>(false);


  const getRandomDelay = () => Math.floor(Math.random() * (20000 - 15000 + 1) + 15000);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // const fetchAllPostData = async () => {

  //   // Start checking each profile
  //   const userExistPromises = profiles.map(async (url) => {
  //     try {
  //       const checkResponse = await checkPostInDatabase(url);

  //       if (checkResponse) {
  //         return;
  //       }
  //       else {
  //         const data = await fetchPostFromAPI(url);
  //         fetchedDataArray.push(data);

  //         addPostToDatabase(data, url);
  //       }

  //     } catch (error) {
  //       console.error(`Error fetching or saving post for ${url}:`, error);
  //       toast.error(`Error processing ${url}`);
  //     }
  //   });

  //   // Wait for all the checks to complete
  //   await Promise.all(userExistPromises);
  // };

  const fetchAllPostData = async () => {
    // Process profiles sequentially with random delays
    for (const url of profiles) {
      try {
        const checkResponse = await checkPostInDatabase(url);

        if (!checkResponse) {
          // Add random delay before fetching
          const delayTime = getRandomDelay();
          console.log(`Waiting ${delayTime / 1000} seconds before fetching ${url}...`);
          await delay(delayTime);

          const data = await fetchPostFromAPI(url);
          fetchedDataArray.push(data);
          addPostToDatabase(data, url);
          toast.success(`Successfully fetched data for ${url}`);
        }
      } catch (error) {
        console.error(`Error fetching or saving post for ${url}:`, error);
        toast.error(`Error processing ${url}`);
      }
    }
  };

  const fetchOnePostData = async (url: string) => {
    const checkResponse = await checkPostInDatabase(url);

    if (checkResponse) {
      return;
    }
    else {
      const data = await fetchPostFromAPI(url);
      fetchedDataArray.push(data);

      if (data) {
        addPostToDatabase(data, url);
      }
    }
  }

  useEffect(() => {
    fetchProfiles();
    setMounted(true);
  }, []);

  return (
    <>
      <div className="p-4 bg-slate-100/60 h-full flex flex-col">
        <div className="flex justify-between items-center">
          <Button onClick={fetchAllPostData}>
            <span>Fetch All data</span>
          </Button>
        </div>

        {mounted ? (
          <div className="mt-4">

            {profiles.length > 0 ? (
              <ol className="mt-4 flex flex-col gap-2">
                <h3 className="text-2xl font-semibold">Available Profiles to fetch</h3>
                {profiles.map((profile, index) => (
                  <li key={index} className={`text-sm p-3 flex items-center justify-between bg-white font-medium list-decimal list-inside rounded-xl`}>
                    <span className="text-blue-500 hover:underline">{index + 1}. <Link href={profile} target="_blank">{profile}</Link></span>

                    <div className="flex items-center gap-3">
                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button onClick={() => fetchOnePostData(profile)}>Fetch</Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Fetch Data</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="sm" onClick={() => { deletePostFromDatabase(profile); deleteProfile(profile); }} className="rounded-full size-8 text-zinc-500 hover:text-red-700 hover:bg-rose-100" variant="ghost">
                              <Trash2 size={16} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete Data</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <h3 className="text-2xl font-semibold">No profiles available to fetch</h3>
            )}
          </div>
        ) : (
          <span className="mt-4">Loading...</span>
        )}
      </div>
    </>
  );
};

export default FetchPostDataPageDashboard;
