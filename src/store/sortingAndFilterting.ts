import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface RangeFilter {
  min: number | null;
  max: number | null;
}

interface SortingAndFilteringState {
  // Sorting
  selectedSorting: string | null;
  setSelectedSorting: (sorting: string | null) => void;

  // Media Types
  selectedMediaTypes: string[];
  toggleMediaType: (mediaType: string) => void;
  setSelectedMediaTypes: (mediaTypes: string[]) => void;

  // Time Filter
  selectedTimeFilter: string | null;
  setTimeFilter: (timeFilter: string | null) => void;

  // Likes Range Filter
  likesRange: RangeFilter;
  setLikesRange: (range: RangeFilter) => void;

  // Comments Range Filter
  commentsRange: RangeFilter;
  setCommentsRange: (range: RangeFilter) => void;

  // Reposts Filter
  repostsRange: RangeFilter;
  setRepostsRange: (range: RangeFilter) => void;

  // Followers Filter
  followersRange: RangeFilter;
  setFollowersRange: (range: RangeFilter) => void;

  // Reset All Filters
  resetAllFilters: () => void;
}

const useSortingAndFilteringStore = create<SortingAndFilteringState>()(
  persist(
    (set) => ({
      // Sorting
      selectedSorting: null,
      setSelectedSorting: (sorting) => set({ selectedSorting: sorting }),

      // Media Types
      selectedMediaTypes: [],
      toggleMediaType: (mediaType) => set((state) => {
        const isSelected = state.selectedMediaTypes.includes(mediaType);
        return {
          selectedMediaTypes: isSelected
            ? state.selectedMediaTypes.filter(type => type !== mediaType)
            : [...state.selectedMediaTypes, mediaType],
        };
      }),
      setSelectedMediaTypes: (mediaTypes) => set({ selectedMediaTypes: mediaTypes }),

      // Time Filter
      selectedTimeFilter: null,
      setTimeFilter: (timeFilter) => set({ selectedTimeFilter: timeFilter }),

      // Likes Range Filter
      likesRange: { min: null, max: null },
      setLikesRange: (range) => set({ likesRange: range }),

      // Comments Range Filter
      commentsRange: { min: null, max: null },
      setCommentsRange: (range) => set({ commentsRange: range }),

      // Reposts Filter
      repostsRange: { min: null, max: null },
      setRepostsRange: (range) => set({ repostsRange: range }),

      // Followers Filter
      followersRange: { min: null, max: null },
      setFollowersRange: (range) => set({ followersRange: range }),

      // Reset All Filters
      resetAllFilters: () => set({
        selectedSorting: null,
        selectedMediaTypes: [],
        selectedTimeFilter: null,
        likesRange: { min: null, max: null },
        commentsRange: { min: null, max: null },
        repostsRange: { min: null, max: null },
        followersRange: { min: null, max: null },
      }),
    }),
    {
      name: 'sorting-and-filtering-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useSortingAndFilteringStore;