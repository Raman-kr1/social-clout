"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

interface ManifestResponseTypes {
  asset: string;
  perResolutions: {
    height: number;
    width: number;
    imageManifestUrl: string;
  }[];
  scanRequiredForDownload: boolean;
  transcribedDocumentUrl: string;
  transcriptManifestUrl: string;
}

interface ImagesResponseTypes {
  pages: string[];
}

const DocumentCarousel = ({ manifestUrl }: { manifestUrl: string }) => {

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {

    const getImagesArray = async (url: string) => {
      const res = await fetch(url);
      const data: ImagesResponseTypes = await res.json();
      setImages(data.pages)
    }

    const getImageFromManifestUrl = async () => {
      const res = await fetch(manifestUrl);
      const data: ManifestResponseTypes = await res.json();
      if (res.ok) {
        getImagesArray(data.perResolutions[3].imageManifestUrl)
      }
    }
    getImageFromManifestUrl()
  }, [])

  return (
    <>
      {
        images.length > 0 && <Carousel opts={{ align: "start" }} className="w-full border-2 rounded-2xl overflow-hidden">
          <CarouselContent className="w-full m-0">
            {images.map((image, index) => (
              <CarouselItem key={index} className="w-full p-0">
                <Image src={image} width={500} height={500} className="w-full mx-auto object-contain" alt={`document-image-page-${index + 1}`} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious variant="default" size="sm" />
          <CarouselNext variant="default" size="sm" />
        </Carousel>
      }
    </>
  );
};

export default DocumentCarousel;