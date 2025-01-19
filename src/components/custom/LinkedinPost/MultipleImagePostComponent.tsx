interface ImageArtifact {
  width: number;
  fileIdentifyingUrlPathSegment: string;
  expiresAt: number;
  height: number;
}

interface VectorImage {
  digitalmediaAsset: string;
  artifacts: ImageArtifact[];
  rootUrl: string;
}

interface Attribute {
  useCropping: boolean;
  mediaUrn: string;
  sourceType: "VECTOR";
  vectorImage: VectorImage;
  displayAspectRatio: number;
}

interface MediaData {
  accessibilityTextSourceType: "USER";
  attributes: Attribute[];
  editableAccessibilityText: boolean;
  accessibilityTextAttributes: any[];
  accessibilityText: string;
}

interface ImageProp {
  images: MediaData[]
}


const MultipleImagePostComponent: React.FC<ImageProp> = ({ images }) => {

  const renderCollage = () => {
    switch (true) {
      case images.length === 2:
        return (
          <div className="grid grid-cols-2 gap-0.5 h-96">
            {images.map((img, index) => (
              <div key={index} className="relative w-full h-full">
                <img
                  src={img.attributes[0].vectorImage.rootUrl + img.attributes[0].vectorImage.artifacts[0].fileIdentifyingUrlPathSegment}
                  alt={`Image ${index + 1}`}
                  width={800}
                  height={500}
                  className="object-cover w-full h-full"
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        );

      case images.length === 3:
        return (
          <div className="grid grid-cols-3 gap-0.5 h-96">
            {images.map((img, index) => (
              <div key={index} className={`relative ${index === 0 ? 'col-span-2' : 'col-span-1'} h-full`}>
                <img
                  src={img.attributes[0].vectorImage.rootUrl + img.attributes[0].vectorImage.artifacts[0].fileIdentifyingUrlPathSegment}
                  alt={`Image ${index + 1}`}
                  className="object-cover w-full h-full"
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        );

      case images.length === 4:
        return (
          <div className="grid grid-cols-2 gap-0.5 h-96">
            {images.map((img, index) => (
              <div key={index} className="relative w-full h-full">
                <img
                  src={img.attributes[0].vectorImage.rootUrl + img.attributes[0].vectorImage.artifacts[0].fileIdentifyingUrlPathSegment}
                  alt={`Image ${index + 1}`}
                  className="object-cover w-full h-full"
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        );

      case images.length === 5:
        return (
          <div className="grid grid-cols-3 gap-0.5 h-96">
            <div className="grid grid-cols-2 col-span-3 gap-0.5">
              {images.slice(0, 2).map((img, index) => (
                <div key={index} className="relative w-full h-full">
                  <img
                    src={img.attributes[0].vectorImage.rootUrl + img.attributes[0].vectorImage.artifacts[0].fileIdentifyingUrlPathSegment}
                    alt={`Image ${index + 1}`}
                    className="object-cover w-full h-full"
                  // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 col-span-3 gap-0.5">
              {images.slice(2).map((img, index) => (
                <div key={index} className="relative w-full h-full">
                  <img
                    src={img.attributes[0].vectorImage.rootUrl + img.attributes[0].vectorImage.artifacts[0].fileIdentifyingUrlPathSegment}
                    alt={`Image ${index + 3}`}
                    className="object-cover w-full h-full"
                  // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case images.length >= 6:
        return (
          <div className="grid grid-cols-3 gap-0.5 h-96">
            <div className="grid grid-cols-2 col-span-3 gap-0.5">
              {images.slice(0, 2).map((img, index) => (
                <div key={index} className="relative w-full h-full">
                  <img
                    src={img.attributes[0].vectorImage.rootUrl + img.attributes[0].vectorImage.artifacts[0].fileIdentifyingUrlPathSegment}
                    alt={`Image ${index + 1}`}
                    className="object-cover w-full h-full"
                  // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 col-span-3 gap-0.5">
              {images.slice(2, 4).map((img, index) => (
                <div key={index} className="relative w-full h-full">
                  <img
                    src={img.attributes[0].vectorImage.rootUrl + img.attributes[0].vectorImage.artifacts[0].fileIdentifyingUrlPathSegment}
                    alt={`Image ${index + 3}`}
                    className="object-cover w-full h-full"
                  // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))}
              <div className="relative w-full h-full">
                <img
                  src={images[4].attributes[0].vectorImage.rootUrl + images[4].attributes[0].vectorImage.artifacts[0].fileIdentifyingUrlPathSegment}
                  alt={`Image 5`}
                  className="object-cover w-full h-full"
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {images.length > 5 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white text-2xl font-light">
                      +{images.length - 5}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
            No images to display
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {renderCollage()}
    </div>
  );
};

export default MultipleImagePostComponent;