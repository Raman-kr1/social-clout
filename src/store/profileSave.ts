import { PostData } from "@/types/posts";
import { create } from "zustand";

interface ProfileStore {
  profiles: string[];
  addProfiles: (newProfiles: any[]) => void;
  fetchProfiles: () => void;
  deleteProfile: (profileUrl: string) => void;
}

interface PostStore {
  posts: PostData["elements"];
  setPost: (data: any[]) => void;
  addPostToDatabase: (postData: any, url: string) => void;
  fetchPostFromAPI: (profileUrl: string) => Promise<PostData>;
  fetchPostFromDatabase: (profileUrl: string) => Promise<any>;
  fetchMultiplePostsFromDatabase: (profileUrls: string[]) => Promise<any>;
  deletePostFromDatabase: (profileUrl: string) => void;
  checkPostInDatabase: (profileUrl: string) => Promise<boolean>;
}

interface PostStorageStore {
  savedPosts: { data: any; url: string }[];
  savePost: (post: any, url: string) => void;
  unsavePost: (url: string) => void;
}

const useProfileStore = create<ProfileStore>((set, get) => ({
  profiles: [],
  fetchProfiles: async () => {
    try {
      const response = await fetch('/api/profile', { method: "GET" });
      const profilesRes = await response.json();
      const profileUrls: string[] = [];
      for (const i in profilesRes.data) {
        profileUrls.push(profilesRes.data[i].profile)
      }
      set({ profiles: profileUrls });
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  },
  addProfiles: async (newProfiles) => {
    const currentProfiles = get().profiles;
    const uniqueProfiles = newProfiles.filter((url) => !currentProfiles.includes(url));

    // Add only unique profiles
    if (uniqueProfiles.length > 0) {
      const updatedProfiles = [...currentProfiles, ...uniqueProfiles];
      set({ profiles: updatedProfiles });

      try {
        // Add profiles to MongoDB
        await fetch('/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ profileUrl: uniqueProfiles }),
        });

      } catch (error) {
        console.error('Error saving profiles to MongoDB:', error);
      }
    }
  },
  deleteProfile: async (profileUrl) => {
    try {
      await fetch(`/api/profile`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ profileUrl })
      });

      const currentProfiles = get().profiles;
      const updatedProfiles = currentProfiles.filter(url => url !== profileUrl); // Remove the profile
      set({ profiles: updatedProfiles });
    } catch (error) {
      console.error('Error deleting profile from MongoDB:', error);
    }
  }
}));

const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  setPost: (data) => {
    set({ posts: data })
  },
  addPostToDatabase: async (data, url) => {
    const response = await fetch("/api/save-posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data, profileUrl: url })
    });
    const res = await response.json();

    if (res.success) {
      return true
    }
    else {
      return false;
    }
  },
  fetchPostFromAPI: async (url) => {
    try {
      const res = await fetch(`/api/linkedin/posts`, {
        method: "POST",
        body: JSON.stringify({ profileUrl: url }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }

      const result = await res.json();
      return result;

    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  },
  fetchPostFromDatabase: async (url) => {
    try {
      // const res = await fetch(`/api/linkedin/posts`, { // big misktake: use fetch instead of posts
      const res = await fetch(`/api/linkedin/fetch`, {
        method: "POST",
        body: JSON.stringify({ profileUrl: url }),
        headers: {
          "Content-Type": "application/json"
        },
        cache: "force-cache"
      });

      // Check if the response is ok
      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }

      const result = await res.json();

      return result;

    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  },
  fetchMultiplePostsFromDatabase: async (urls) => {

    const fetchPromises = urls.map(url => get().fetchPostFromDatabase(url));
    return Promise.all(fetchPromises);

    // try {
    //   const res = await fetch(`/api/linkedin/fetch-multiple`, {
    //     method: "POST",
    //     body: JSON.stringify({ profileUrls: urls }),
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   });

    //   // Check if the response is ok
    //   if (!res.ok) {
    //     throw new Error('Failed to fetch multiple posts');
    //   }
    //   const result = await res.json();
    //   return result;
    // } catch (error) {
    //   console.error('Error fetching posts data:', error);
    // }
  },
  deletePostFromDatabase: async (url) => {
    try {
      const res = await fetch("/api/delete-post", {
        method: "DELETE",
        body: JSON.stringify({ profileUrl: url }),
      });

      if (res.ok) {
        return true;
      }
      else {
        return false;
      }
    } catch (error) {
      console.error('Error delete from db:', error);
    }
  },
  checkPostInDatabase: async (url) => {
    try {
      const res = await fetch("/api/check-post", {
        method: "POST",
        body: JSON.stringify({ profileUrl: url }),
      });

      const result = await res.json();
      return result.success;

    } catch (error) {
      console.error('Error checking post in db:', error);
    }
  },
}));

const usePostStorageStore = create<PostStorageStore>((set) => ({
  savedPosts: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('savedPosts') || '[]') : [],
  savePost: (post, url) => {
    set((state) => {
      const updatedPosts = [...state.savedPosts, { data: post, url }];
      if (typeof window !== 'undefined') {
        localStorage.setItem('savedPosts', JSON.stringify(updatedPosts));
      }
      return { savedPosts: updatedPosts };
    });
  },
  unsavePost: (url) => {
    set((state) => {
      const updatedPosts = state.savedPosts.filter((savedPost) => savedPost.url !== url);
      if (typeof window !== 'undefined') {
        localStorage.setItem('savedPosts', JSON.stringify(updatedPosts));
      }
      return { savedPosts: updatedPosts };
    });
  },
}));

export { useProfileStore, usePostStore, usePostStorageStore };