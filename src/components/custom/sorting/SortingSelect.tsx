"use client";

import { CalendarArrowDown, HandHeart, MessagesSquare, Repeat2, ThumbsUp } from 'lucide-react';
import {
  CustomSelect,
  CustomSelectContent,
  CustomSelectItem,
  CustomSelectTrigger,
  CustomSelectValue,
} from "@/components/ui/select-with-icon";
import useSortingAndFilteringStore from '@/store/sortingAndFilterting';

const SortingSelect = () => {
  const { setSelectedSorting, selectedSorting } = useSortingAndFilteringStore();

  const sortingValues = [
    { value: "relevance", label: "relevance", icon: <HandHeart className="h-4 w-4" /> },
    { value: "date", label: "date", icon: <CalendarArrowDown className="h-4 w-4" /> },
    { value: "likes", label: "likes", icon: <ThumbsUp className="h-4 w-4" /> },
    { value: "comments", label: "comments", icon: <MessagesSquare className="h-4 w-4" /> },
    { value: "reposts", label: "reposts", icon: <Repeat2 className="h-4 w-4" /> },
  ];

  const currentSortValue = sortingValues.find(val => val.value === selectedSorting);

  return (
    <div>
      <CustomSelect
        value={selectedSorting || ''}
        onValueChange={(value) => {
          setSelectedSorting(value);
        }}
      >
        <CustomSelectTrigger className="w-52">
          <div className="flex items-center gap-2 select-none capitalize">
            {currentSortValue?.icon}
            <CustomSelectValue placeholder="Sort by" />
          </div>
        </CustomSelectTrigger>
        <CustomSelectContent>
          {sortingValues.map((val) => (
            <CustomSelectItem
              className='capitalize hover:bg-zinc-200'
              key={val.value}
              value={val.value}
              icon={val.icon}
            >
              {val.label}
            </CustomSelectItem>
          ))}
        </CustomSelectContent>
      </CustomSelect>
    </div>
  );
};

export default SortingSelect;