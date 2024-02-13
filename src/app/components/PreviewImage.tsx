import React from "react";
import Image from "next/image";

type PreviewImageProps = {
  imageUrl: string;
};

const PreviewImage = ({ imageUrl = "" }: PreviewImageProps) => {
  return (
    <div className="w-[338px] h-[220px] rounded-xl">
      <div className="relative w-full h-full">
        <Image
          src={imageUrl}
          fill
          alt="image"
          priority
          className="w-full h-full top-0 left-0 object-contain rounded-2xl"
          sizes="(min-width: 768px) 100%"
        />
      </div>
    </div>
  );
};

export default PreviewImage;
