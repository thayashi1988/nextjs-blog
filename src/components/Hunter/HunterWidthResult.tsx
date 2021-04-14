// react
import type { DOMAttributes, VFC } from 'react';
import React from 'react';

type PROPS = {
  divisionRemainderWidthValue: any;
};

export const HunterWidthResult: VFC<PROPS> = (props) => {
  return (
    <div className="flex justify-between">
      <p className="text-right text-xs">
        余りは{props.divisionRemainderWidthValue}mm
      </p>
      <p className="text-right text-xs">
        余りの割る2は{props.divisionRemainderWidthValue / 2}mm
      </p>
    </div>
  );
};
