import React, { memo } from 'react';
import { useMicromodal } from '@/components/Hooks/useMicromodal';
import { TextAlert } from '@/components/Text/TextAlert';
import { Grid } from '@/components/Grid/Grid';
import { GridItem } from '@/components/Grid/GridItem';
import { BtnSuccess } from '@/components/Button/BtnSuccess';
import { BtnSecondary } from '@/components/Button/BtnSecondary';

type PROPS = {
  handleFileDelete: React.MouseEventHandler<HTMLButtonElement>;
};

export const FirebaseStorageModal: React.VFC<PROPS> = memo((props) => {
  console.log('FirebaseStorageModalのレンダリング');
  const { handleFileDelete } = props;
  const { Modal, close } = useMicromodal('sample-modal');

  return (
    <Modal id="sample-modal">
      <TextAlert class="mb-6">画像をサーバーから削除しますか？</TextAlert>
      <Grid class="grid-cols-2 gap-4">
        <GridItem>
          <BtnSuccess link={false} click={handleFileDelete} margin="!mb-0">
            削除
          </BtnSuccess>
        </GridItem>
        <GridItem>
          <BtnSecondary link={false} click={close} margin="!mb-0">
            キャンセル
          </BtnSecondary>
        </GridItem>
      </Grid>
    </Modal>
  );
});
