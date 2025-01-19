"use client";

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { usePostStore, useProfileStore } from '@/store/profileSave';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

const AddProfilePage = () => {

  const [mounted, setMounted] = useState<boolean>(false); // Local state for the textarea input
  const [input, setInput] = useState<string>(''); // Local state for the textarea input
  const [duplicateUrls, setDuplicateUrls] = useState<string[]>([]); // Track duplicate URLs
  const addProfiles = useProfileStore((state) => state.addProfiles);
  const currentProfiles = useProfileStore((state) => state.profiles);
  const { profiles, deleteProfile, fetchProfiles } = useProfileStore();
  const { deletePostFromDatabase } = usePostStore();

  const linkedInUrlPattern = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/$/;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Split the input by new lines, trim whitespace, and filter out empty URLs
    const profileUrls = input
      .split('\n')
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    // Validate each URL with the regex pattern
    const validUrls = profileUrls.filter((url) => linkedInUrlPattern.test(url));

    // Find any duplicate URLs
    const duplicates = validUrls.filter((url) => currentProfiles.includes(url));

    // Add unique profiles to the store and localStorage, and store duplicates for notification
    const uniqueUrls = validUrls.filter((url) => !currentProfiles.includes(url));

    if (uniqueUrls.length > 0) {
      addProfiles(uniqueUrls); // Add unique URLs to the store
    }

    if (duplicates.length > 0) {
      setDuplicateUrls(duplicates); // Store the duplicate URLs for notification
    } else {
      setDuplicateUrls([]); // Clear duplicates if there are none
    }

    // Reset the textarea after submission
    setInput('');
  };

  useEffect(() => {
    setMounted(true);
    fetchProfiles();
  }, []);

  return (
    <>
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="">
            <Textarea value={input} onChange={handleChange} placeholder='add profile urls example: https://www.linkedin.com/in/username/' rows={5} className="w-full" />
          </div>
          <div className="mt-3 float-end">
            <Button type='submit'>
              Add
            </Button>
          </div>
        </form>
        {duplicateUrls.length > 0 && (
          <div>
            <h3 className='text-red-600 text-sm'>Can&apos;t add duplicate URLs !!</h3>
          </div>
        )}
      </div>

      {
        mounted ? profiles.length > 0 ?
          <div className="p-4">
            <h3 className='text-lg font-semibold'>Profiles Added</h3>
            <ul className='mt-4 flex flex-col gap-2'>
              {
                profiles.map((profile, index) => {
                  return (
                    <li key={index} className='text-sm p-3 flex items-center bg-white justify-between font-medium list-decimal list-inside rounded-xl'>
                      <span className="text-blue-500 hover:underline">{index + 1}.  <Link href={profile} target="_blank">{profile}</Link></span>

                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="sm" className="rounded-full size-8 text-zinc-500 hover:text-red-700 hover:bg-rose-100" variant="ghost" onClick={() => { deleteProfile(profile); deletePostFromDatabase(profile) }}>
                              <Trash2 size={16} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  )
                })
              }
            </ul>
          </div> : <span className='text-lg font-semibold'>No Profile Added</span> : <span className='text-lg font-semibold'>Loading...</span>
      }
    </>
  )
}

export default AddProfilePage