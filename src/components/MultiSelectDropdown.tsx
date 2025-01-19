"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";

interface SelectMultipleProps {
  placeholder?: string;
  allOptions: {
    label: string;
    value: string;
  }[];
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
  initialLoadCount?: number;
  loadMoreCount?: number;
}

export function SelectMultiple({
  placeholder = "Select options...",
  allOptions,
  selectedOptions,
  setSelectedOptions,
  initialLoadCount = 100,
  loadMoreCount = 100,
}: SelectMultipleProps) {

  const [searchTerm, setSearchTerm] = useState("");
  const [visibleItemCount, setVisibleItemCount] = useState(initialLoadCount);
  const [isOpen, setIsOpen] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle search and maintain order
  const filteredOptions = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return searchTerm === ""
      ? allOptions
      : allOptions.filter((option) =>
        option.label.toLowerCase().includes(lowerCaseSearchTerm)
      );
  }, [allOptions, searchTerm]);

  const visibleOptions = useMemo(() => {
    return filteredOptions.slice(0, visibleItemCount);
  }, [filteredOptions, visibleItemCount]);

  // Handle option selection
  const handleSelect = useCallback(
    (optionValue: string) => {
      const isSelected = selectedOptions.includes(optionValue);
      const newSelectedOptions = isSelected
        ? selectedOptions.filter((value) => value !== optionValue)
        : [...selectedOptions, optionValue];

      setSelectedOptions(newSelectedOptions);
    },
    [selectedOptions, setSelectedOptions]
  );

  // Infinite scroll: Load more items when scrolling to the bottom
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;

    if (scrollHeight - scrollTop - clientHeight < 100) {
      setVisibleItemCount((prev) => {
        const newCount = prev + loadMoreCount;
        return Math.min(newCount, filteredOptions.length);
      });
    }
  }, [filteredOptions.length, loadMoreCount]);

  // Debounce search input to reduce re-renders
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  // Reset visible items and scroll position when search changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    setVisibleItemCount(initialLoadCount);
  }, [searchTerm, initialLoadCount]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild className="w-full">
        <div className="min-h-[2.5rem] w-full border border-gray-200 bg-white cursor-pointer dark:border-gray-800 hover:text-accent-foreground inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 justify-between select-none">
          {selectedOptions?.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              <span>{selectedOptions.length} user selected</span>
            </div>
          ) : (
            <span className="justify-start text-black/50 dark:text-white/50 font-normal">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search username..."
            onValueChange={(value) => debouncedSearch(value)}
          />
          <CommandList>
            {filteredOptions.length === 0 ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              <div
                className="max-h-72 overflow-y-auto
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-thumb]:rounded-full"
                onScroll={handleScroll}
                ref={scrollContainerRef}
              >
                <CommandGroup>
                  {visibleOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                      value={option.value}
                      className="cursor-pointer"
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-gray-950 dark:border-gray-50",
                          selectedOptions.includes(option.value)
                            ? "bg-gray-950 text-gray-50 dark:bg-gray-50 dark:text-gray-950"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <Check className="h-4 w-4" />
                      </div>
                      <span>{option.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
                {visibleItemCount < filteredOptions.length && (
                  <div className="text-center py-2 text-sm text-gray-500">
                    Scroll to load more
                  </div>
                )}
              </div>
            )}
          </CommandList>
          {selectedOptions.length > 0 && (
            <div className="border-t p-2.5 flex justify-center">
              <button
                onClick={() => setSelectedOptions([])}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear selection
              </button>
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}