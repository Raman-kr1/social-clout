"use client";

import useLayoutChanger from "@/store/layoutChanger";
import dynamic from "next/dynamic";
import { useEffect } from "react";
const Masonry = dynamic(() => import("react-layout-masonry"), { ssr: false });

const MasonryLayout = ({ children }: any) => {

  const { columns, setColumns, setDisabled } = useLayoutChanger();

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1400) {
        setColumns(4); // Large screens: 4 columns
        setDisabled(false);
      } else if (window.innerWidth >= 1024) {
        setColumns(3); // Medium screens: 3 columns
        setDisabled(false);
      } else if (window.innerWidth >= 768) {
        setColumns(2); // Small screens: 2 columns
        setDisabled(false);
      } else {
        setColumns(1); // Mobile screens: 1 column
        setDisabled(true);
      }
    };

    // Initial load
    updateColumns();

    // Listen for resize events
    window.addEventListener("resize", updateColumns);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, [setColumns]); // Run this effect only once

  return (
    <Masonry
      columns={columns}
      gap={16}
      columnProps={{ className: "w-0" }}
      className={`mt-10 custom-font ${columns === 1 ? "lg:w-[460px] md:w-96 w-full" : columns === 2 ? "lg:w-9/12 md:w-full w-full" : ""} mx-auto`}>
      {children}
    </Masonry>
  )
}

export default MasonryLayout;