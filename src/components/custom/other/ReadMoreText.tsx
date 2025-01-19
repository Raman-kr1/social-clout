"use client";

import { useState } from "react";
import FormattedText from "./FormattedText";

const ReadMoreText = ({ textData }: { textData: string }) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateTextByWords = (text: string, wordLimit: number) => {
    const words = text.split(' '); // Split text into words
    if (words.length <= wordLimit) return text; // If text has fewer words than the limit, return it as is
    return words.slice(0, wordLimit).join(' ') + "..."; // Otherwise, return the first 'wordLimit' words
  };

  return (
    <>
      <div className="text-sm text-zinc-800 font-medium inline w-fit">
        {
          isExpanded ? <FormattedText text={textData} /> : <FormattedText text={truncateTextByWords(textData, 24)} />
        }

        {
          textData.split(' ').length > 20 && <button className="text-zinc-600 hover:text-blue-600 font-medium text-xs ml-1 inline" onClick={toggleExpanded}>
            {isExpanded ? "…less" : "…read more"}
          </button>
        }
      </div >
    </>
  )
}

export default ReadMoreText