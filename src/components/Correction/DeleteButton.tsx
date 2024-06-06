import { useState } from 'react';
import Button from '../common/Button';
import DeleteModal from './DeleteModal';

function DeleteButton({ id }: { id: string }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <Button
        size="basic"
        color="red"
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        삭제
      </Button>
      <DeleteModal
        id={id}
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
      />
    </>
  );
}

export default DeleteButton;
