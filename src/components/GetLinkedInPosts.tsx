"use client";

import { FormEvent, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner";

const GetLinkedInPosts = () => {

  const [elementsData, setElementsData] = useState([]);
  const [profileUrlString, setProfileUrlString] = useState("");
  const [multiple, setMultiple] = useState<boolean | "indeterminate">(false);
  const [loading, setLoading] = useState(false);

  const handleForm = async (e: FormEvent) => {

    e.preventDefault();
    const allPosts: any = [];

    if (profileUrlString.includes(",") && !multiple) {
      return toast.error("Please enable multiple mode !!")
    }

    else if (!profileUrlString.includes(",") && multiple) {
      return toast.error("Please use comma for profile separation !!")
    }

    else if (profileUrlString.includes(",") && multiple) {
      const profileUrls = profileUrlString.split(",").map((url) => url.trim());
      try {
        setLoading(true);

        for (const url of profileUrls) {
          const res = await fetch(`/api/linkedin/posts`, {
            method: "POST",
            body: JSON.stringify({ profileUrl: url }),
          });
          const data = await res.json();
          if (data?.elements) {
            allPosts.push(data.elements);
          }
          setElementsData(allPosts);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    else {
      setLoading(true);
      const res = await fetch(`/api/linkedin/posts`, {
        method: "POST",
        body: JSON.stringify({ profileUrl: profileUrlString }),
      });
      const data = await res.json();
      setLoading(false);
      if (data?.elements) {
        allPosts.push(data.elements);
        setElementsData(allPosts);
      }
    }
  }

  return (
    <>
      <div className="w-full">
        <form onSubmit={handleForm} className="flex flex-col">
          <div className="flex gap-2">
            <div className="w-full flex flex-col">
              <input type="text" value={profileUrlString} onChange={(e) => setProfileUrlString(e.currentTarget.value)} className="border-2 px-4 py-2 w-full rounded-2xl outline-none focus:ring-2 focus:ring-blue-300" placeholder="profile url example: linkedin.com/in/your_username" required />
            </div>
            <div className="shrink-0">
              <button type="submit" disabled={loading} className="rounded-2xl disabled:bg-blue-100 disabled:opacity-70 disabled:cursor-not-allowed bg-blue-200 flex px-4 h-full py-2 text-blue-800 items-center justify-center text-center">
                {
                  loading ? "Loading..." : "Fetch posts"
                }
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2 py-3">
            <Checkbox id="multipleUrls" checked={multiple} onCheckedChange={setMultiple} />
            <label
              htmlFor="multipleUrls"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
            >
              For multiple profiles use comma &quot;,&quot;
            </label>
          </div>
        </form>

        {
          elementsData.length > 0 && <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 grid-cols-1 gap-2 mt-14">
            {
              elementsData.map((postElementsDataArray: any[], index: number) => {
                return (
                  <div key={index} className="bg-white border-2 p-3 rounded-2xl">
                    {
                      postElementsDataArray.length > 0 ?
                        <div className="h-80 overflow-y-auto p-4">
                          <div className=" space-y-2">
                            <div className="flex justify-between items-center">
                              <p>{postElementsDataArray[0]?.actor?.name?.text}</p>
                              <p>Posts: <span className="font-medium">{postElementsDataArray.length}</span></p>
                            </div>
                            <ul className="flex flex-col space-y-2">
                              {
                                postElementsDataArray.map((postsData, index) => {
                                  return (
                                    <li key={index} className="ring-2 p-3 rounded-xl ring-blue-200 text-sm bg-white">
                                      {postsData?.commentary?.text?.text || "no text available"}
                                    </li>
                                  )
                                })
                              }
                            </ul>
                          </div>
                        </div>
                        : "no post available"
                    }
                  </div>
                )
              })
            }
          </div>
        }
      </div>
    </>
  )
}

export default GetLinkedInPosts;