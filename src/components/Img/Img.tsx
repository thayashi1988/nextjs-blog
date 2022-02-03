import React from 'react';
import Image from 'next/image';

type PROPS = {
  class?: string;
  alt?: string;
  src: string;
  width?: string | number;
  height?: string | number;
  quality?: string;
};

export const NextImg: React.VFC<PROPS> = (props) => {
  const addParentClass = props.class ? ` ${props.class}` : '';
  return (
    <figure className={`m-0${addParentClass}`}>
      <Image
        alt={props.alt}
        src={props.src}
        width={props.width}
        height={props.height}
        quality={props.quality}
      />
    </figure>
  );
};
