import { useState } from 'react';
import Button from '../common/Button';
import CorrectionModal from './CorrectionModal';

function CorrectionButton({ month }: { month: number }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <Button
        size="basic"
        color="white"
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        정정 신청
      </Button>
      <CorrectionModal
        month={month}
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
      />
    </>
  );
}

export default CorrectionButton;
