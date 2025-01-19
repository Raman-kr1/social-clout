const base_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://social-clout.vercel.app";


export const getProfiles = async () => {
  const response = await fetch(`${base_URL}/api/profile`, { cache: "force-cache" });
  const profilesRes = await response.json();
  const profileUrls: string[] = [];
  for (const i in profilesRes.data) {
    profileUrls.push(profilesRes.data[i].profile)
  }
  return profileUrls;
}

// export const getMultiplePosts = async (urls: string[]) => {
//   const res = await fetch(`${base_URL}/api/linkedin/fetch-multiple`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ profileUrls: urls })
//   });

//   const result = await res.json();

//   // Check if result.data exists and is an array
//   if (result?.data && Array.isArray(result.data)) {
//     // Flatten all 'elements' arrays from all objects in result.data
//     const allElements = result.data.flatMap((res: any) => res?.elements || []);
//     return allElements;
//   }
// };