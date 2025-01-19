"use client";

import { Button } from '@/components/ui/button';
import { Copy, CopyCheck } from 'lucide-react';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CopyLinkPost = ({ textToCopy }: { textToCopy: string }) => {

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLinkPost = async () => {
    try {
      // Using the Clipboard API to copy the text to the clipboard
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);

      // Reset the "Copied" message after 2 seconds
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm" className={`w-full min-w-0 ${isCopied ? "bg-green-400 transition-colors" : ""}`} onClick={handleCopyLinkPost}>
            {isCopied ? <CopyCheck size={20} /> : <Copy size={20} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy Url</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyLinkPost;
