import React from 'react';
import Image from 'next/image';

type PROPS = {
  class?: string;
  alt?: string;
  src: string;
  width?: string | number;
  height?: string | number;
  quality?: number;
};

export const NextImg: React.VFC<PROPS> = (props) => {
  const { alt, src, width, height, quality, class: className } = props;
  const addParentClass = className ? ` ${className}` : '';
  const qualityValue = quality ? quality : 75;
  return (
    <figure className={`m-0${addParentClass}`}>
      <Image
        alt={alt}
        src={src}
        width={width}
        height={height}
        quality={qualityValue}
      />
    </figure>
  );
};
