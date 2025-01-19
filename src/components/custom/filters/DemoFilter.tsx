"use client";

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Settings2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import useSortingAndFilteringStore from '@/store/sortingAndFilterting';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Input } from '@/components/ui/input';

interface FilterSidebarProps {
  onOpenChange: (open: boolean) => void;
}

const DemoFilter = ({ onOpenChange }: FilterSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    onOpenChange(!isOpen);
  };

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const {
    selectedMediaTypes,
    toggleMediaType,
    selectedTimeFilter,
    setTimeFilter,
    likesRange,
    setLikesRange,
    commentsRange,
    setCommentsRange,
    repostsRange,
    setRepostsRange,
    followersRange,
    setFollowersRange,
    resetAllFilters
  } = useSortingAndFilteringStore();

  const mediaTypes = [
    { value: "image", label: "Image" },
    { value: "text", label: "Text" },
    // { value: "carousel", label: "Carousel" },
    { value: "video", label: "Video" },
    { value: "document", label: "Carousel" },
    { value: "any", label: "Any" },
  ];

  const timeFilterOptions = [
    { value: "all_time", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "7_days", label: "7 days" },
    { value: "1_month", label: "1 month" },
    { value: "3_months", label: "3 months" },
  ];

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Range Input Change Handler
  const handleRangeInputChange = (
    type: 'likes' | 'comments' | 'reposts' | 'followers',
    field: 'min' | 'max',
    value: string
  ) => {
    const numberValue = value === '' ? null : Number(value);

    switch (type) {
      case 'likes':
        setLikesRange({
          ...likesRange,
          [field]: numberValue
        });
        break;
      case 'comments':
        setCommentsRange({
          ...commentsRange,
          [field]: numberValue
        });
        break;
      case 'reposts':
        setRepostsRange({
          ...repostsRange,
          [field]: numberValue
        });
        break;
      case 'followers':
        setFollowersRange({
          ...followersRange,
          [field]: numberValue
        });
        break;
    }
  };

  // Close sidebar on escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        onOpenChange(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onOpenChange]);

  useEffect(() => {
    // Function to check if the screen width is 640px or less
    const checkScreenSize = () => {
      if (window.innerWidth <= 768) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    // Check screen size on initial load
    checkScreenSize();

    // Add event listener to check on window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []); // Empty dependency array to run only on mount and unmount



  // If not hydrated, show a placeholder
  if (!isHydrated) {
    return (
      <Button variant="outline" disabled>
        Filters
        <Settings2 />
      </Button>
    );
  }

  return (
    <>
      {
        isSmallScreen ?
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">
                Filters
                <Settings2 />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Apply Filters</DrawerTitle>
                </DrawerHeader>
                  <Separator className='mb-3' />
                <div className="flex flex-col gap-3 p-4">
                  <div className="grid gap-4">
                    <Select
                      value={selectedTimeFilter || ''}
                      onValueChange={(value) => setTimeFilter(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {timeFilterOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Media Type Filter */}
                  <div>
                    <Accordion type="single" className="border rounded-md px-3" collapsible>
                      <AccordionItem value="media-type" className="border-b-0">
                        <AccordionTrigger className="text-sm font-normal py-2.5 hover:no-underline">
                          Media Type
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-2 gap-1 mt-4">
                            {mediaTypes.map((type) => (
                              <div
                                key={type.value}
                                className="flex items-center space-x-2 p-1 px-2 rounded-md bg-zinc-100 hover:bg-zinc-200 w-full"
                              >
                                <Checkbox
                                  id={type.value}
                                  checked={selectedMediaTypes.includes(type.value)}
                                  onCheckedChange={() => toggleMediaType(type.value)}
                                />
                                <label
                                  htmlFor={type.value}
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full py-2"
                                >
                                  {type.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Likes Range Filter */}
                  <div>
                    <Accordion type="single" className="border rounded-md px-3" collapsible>
                      <AccordionItem value="likes-range" className="border-b-0">
                        <AccordionTrigger className="text-sm font-normal py-2.5 hover:no-underline">
                          Likes Range
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex gap-3 p-2">
                            <Input
                              type="number"
                              placeholder="min"
                              min={0}
                              max={9999999}
                              className="bg-white placeholder:text-sm"
                              value={likesRange.min ?? ''}
                              onChange={(e) => handleRangeInputChange('likes', 'min', e.target.value)}
                            />
                            <Input
                              type="number"
                              placeholder="max"
                              min={1}
                              max={9999999}
                              className="bg-white placeholder:text-sm"
                              value={likesRange.max ?? ''}
                              onChange={(e) => handleRangeInputChange('likes', 'max', e.target.value)}
                            />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Comments Range Filter */}
                  <div>
                    <Accordion type="single" className="border rounded-md px-3" collapsible>
                      <AccordionItem value="comments-range" className="border-b-0">
                        <AccordionTrigger className="text-sm font-normal py-2.5 hover:no-underline">
                          Comments Range
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex gap-3 p-2">
                            <Input
                              type="number"
                              placeholder="min"
                              min={0}
                              max={9999999}
                              className="bg-white placeholder:text-sm"
                              value={commentsRange.min ?? ''}
                              onChange={(e) => handleRangeInputChange('comments', 'min', e.target.value)}
                            />
                            <Input
                              type="number"
                              placeholder="max"
                              min={1}
                              max={9999999}
                              className="bg-white placeholder:text-sm"
                              value={commentsRange.max ?? ''}
                              onChange={(e) => handleRangeInputChange('comments', 'max', e.target.value)}
                            />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Followers Range Filter */}
                  <div>
                    <Accordion type="single" className="border rounded-md px-3" collapsible>
                      <AccordionItem value="followers-range" className="border-b-0">
                        <AccordionTrigger className="text-sm font-normal py-2.5 hover:no-underline">
                          Followers Range
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex gap-3 p-2">
                            <Input
                              type="number"
                              placeholder="min"
                              min={0}
                              max={9999999}
                              className="bg-white placeholder:text-sm"
                              value={followersRange.min ?? ''}
                              onChange={(e) => handleRangeInputChange('followers', 'min', e.target.value)}
                            />
                            <Input
                              type="number"
                              placeholder="max"
                              min={1}
                              max={9999999}
                              className="bg-white placeholder:text-sm"
                              value={followersRange.max ?? ''}
                              onChange={(e) => handleRangeInputChange('followers', 'max', e.target.value)}
                            />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Reposts Range Filter */}
                  <div>
                    <Accordion type="single" className="border rounded-md px-3" collapsible>
                      <AccordionItem value="reposts-range" className="border-b-0">
                        <AccordionTrigger className="text-sm font-normal py-2.5 hover:no-underline">
                          Reposts Range
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex gap-3 p-2">
                            <Input
                              type="number"
                              placeholder="min"
                              min={0}
                              max={9999999}
                              className="bg-white placeholder:text-sm"
                              value={repostsRange.min ?? ''}
                              onChange={(e) => handleRangeInputChange('reposts', 'min', e.target.value)}
                            />
                            <Input
                              type="number"
                              placeholder="max"
                              min={1}
                              max={9999999}
                              className="bg-white placeholder:text-sm"
                              value={repostsRange.max ?? ''}
                              onChange={(e) => handleRangeInputChange('reposts', 'max', e.target.value)}
                            />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button onClick={resetAllFilters}>Reset</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer> :
          <>
            <Button variant="outline" className="ml-2" onClick={toggleSidebar}>
              Filters
              <Settings2 />
            </Button>
            <div
              className={cn(
                "fixed right-0 top-12 h-full overflow-y-auto bg-white border-l w-[200px] sm:w-[300px] z-50",
                "transform transition-transform duration-300 ease-in-out",
                "p-3",
                isOpen ? "translate-x-0" : "translate-x-full"
              )}
            >
              <div className="flex flex-col gap-3 border rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Apply Filters</h3>
                  <Button className='size-6' onClick={toggleSidebar} variant="outline" size="icon"><X /></Button>
                </div>
                <Separator className='mb-3' />
                <div className="grid gap-4">
                  <Select
                    value={selectedTimeFilter || ''}
                    onValueChange={(value) => setTimeFilter(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {timeFilterOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Media Type Filter */}
                <div>
                  <Accordion type="single" className="border rounded-md px-3" collapsible>
                    <AccordionItem value="media-type" className="border-b-0">
                      <AccordionTrigger className="text-sm font-normal py-2.5 hover:no-underline">
                        Media Type
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-1 mt-4">
                          {mediaTypes.map((type) => (
                            <div
                              key={type.value}
                              className="flex items-center space-x-2 p-1 px-2 rounded-md bg-zinc-100 hover:bg-zinc-200 w-full"
                            >
                              <Checkbox
                                id={type.value}
                                checked={selectedMediaTypes.includes(type.value)}
                                onCheckedChange={() => toggleMediaType(type.value)}
                              />
                              <label
                                htmlFor={type.value}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full py-2"
                              >
                                {type.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* Likes Range Filter */}
                <div>
                  <Accordion type="single" className="border rounded-md px-3" collapsible>
                    <AccordionItem value="likes-range" className="border-b-0">
                      <AccordionTrigger className="text-sm font-normal py-2.5 hover:no-underline">
                        Likes Range
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex gap-3 p-2">
                          <Input
                            type="number"
                            placeholder="min"
                            min={0}
                            max={9999999}
                            className="bg-white placeholder:text-sm"
                            value={likesRange.min ?? ''}
                            onChange={(e) => handleRangeInputChange('likes', 'min', e.target.value)}
                          />
                          <Input
                            type="number"
                            placeholder="max"
                            min={1}
                            max={9999999}
                            className="bg-white placeholder:text-sm"
                            value={likesRange.max ?? ''}
                            onChange={(e) => handleRangeInputChange('likes', 'max', e.target.value)}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* Comments Range Filter */}
                <div>
                  <Accordion type="single" className="border rounded-md px-3" collapsible>
                    <AccordionItem value="comments-range" className="border-b-0">
                      <AccordionTrigger className="text-sm font-normal py-2.5 hover:no-underline">
                        Comments Range
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex gap-3 p-2">
                          <Input
                            type="number"
                            placeholder="min"
                            min={0}
                            max={9999999}
                            className="bg-white placeholder:text-sm"
                            value={commentsRange.min ?? ''}
                            onChange={(e) => handleRangeInputChange('comments', 'min', e.target.value)}
                          />
                          <Input
                            type="number"
                            placeholder="max"
                            min={1}
                            max={9999999}
                            className="bg-white placeholder:text-sm"
                            value={commentsRange.max ?? ''}
                            onChange={(e) => handleRangeInputChange('comments', 'max', e.target.value)}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* Followers Range Filter */}
                <div>
                  <Accordion type="single" className="border rounded-md px-3" collapsible>
                    <AccordionItem value="followers-range" className="border-b-0">
                      <AccordionTrigger className="text-sm font-normal py-2.5 hover:no-underline">
                        Followers Range
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex gap-3 p-2">
                          <Input
                            type="number"
                            placeholder="min"
                            min={0}
                            max={9999999}
                            className="bg-white placeholder:text-sm"
                            value={followersRange.min ?? ''}
                            onChange={(e) => handleRangeInputChange('followers', 'min', e.target.value)}
                          />
                          <Input
                            type="number"
                            placeholder="max"
                            min={1}
                            max={9999999}
                            className="bg-white placeholder:text-sm"
                            value={followersRange.max ?? ''}
                            onChange={(e) => handleRangeInputChange('followers', 'max', e.target.value)}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* Reposts Range Filter */}
                <div>
                  <Accordion type="single" className="border rounded-md px-3" collapsible>
                    <AccordionItem value="reposts-range" className="border-b-0">
                      <AccordionTrigger className="text-sm font-normal py-2.5 hover:no-underline">
                        Reposts Range
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex gap-3 p-2">
                          <Input
                            type="number"
                            placeholder="min"
                            min={0}
                            max={9999999}
                            className="bg-white placeholder:text-sm"
                            value={repostsRange.min ?? ''}
                            onChange={(e) => handleRangeInputChange('reposts', 'min', e.target.value)}
                          />
                          <Input
                            type="number"
                            placeholder="max"
                            min={1}
                            max={9999999}
                            className="bg-white placeholder:text-sm"
                            value={repostsRange.max ?? ''}
                            onChange={(e) => handleRangeInputChange('reposts', 'max', e.target.value)}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="flex items-center justify-end gap-2 mt-4">
                  <Button
                    className="inline"
                    variant="outline"
                    size="sm"
                    onClick={resetAllFilters}
                  >
                    Reset all
                  </Button>
                </div>
              </div>
            </div>
          </>
      }
    </>
  );
};

export default DemoFilter