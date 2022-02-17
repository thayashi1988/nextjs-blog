import React, { memo } from 'react';
import { BtnSuccess } from '@/components/Button/BtnSuccess';
import { Child2 } from '@/components/Memo/Child2';
import { Child3 } from '@/components/Memo/Child3';

type PROPS = {
  class?: string;
  margin?: string;
  children?: React.ReactNode;
  clickEvent?: React.MouseEventHandler<HTMLButtonElement>;
};

const style = {
  height: '200px',
  backgroundColor: '#666',
  padding: '8px',
};

export const Child1: React.VFC<PROPS> = memo((props) => {
  console.log('Child1 レンダリング:');

  return (
    <div style={style}>
      <p>Child1 レンダリング確認</p>
      <BtnSuccess link={false} click={props.clickEvent}>
        リセット
      </BtnSuccess>
      <Child2 />
      <Child3 />
    </div>
  );
});
