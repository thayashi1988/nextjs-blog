import type { VFC } from 'react';
import Image from 'next/image';

type PROPS = {
  class?: string;
  src: string;
  width?: string | number;
  height?: string | number;
  quality?: string;
};

export const NextImg: VFC<PROPS> = (props) => {
  return (
    <figure className={props.class}>
      <Image
        src={props.src}
        width={props.width}
        height={props.height}
        quality={props.quality}
      />
    </figure>
  );
};
