import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { setDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import ColorOptions from './ColorOptions';
import Button from '../common/Button';

interface FormData {
  name: string;
  startDate: string;
  endDate: string;
  color: string;
}

interface AddEventModalProps {
  onClose: () => void;
}

function AddEventModal({ onClose }: AddEventModalProps) {
  const { register, handleSubmit } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    const userId = sessionStorage.getItem('id');
    if (!userId) return;

    const eventId = Date.now().toString();
    const event = {
      ...data,
    };

    try {
      await setDoc(doc(firestore, 'events', userId, 'event', eventId), event);
      alert('Event added successfully!');
      onClose();
    } catch (error) {
      console.error('Error adding event: ', error);
      alert('Error adding event. Please try again.');
    }
  }

  const nameProps = register('name', { required: true });
  const startDateProps = register('startDate', { required: true });
  const endDateProps = register('endDate', { required: true });
  const colorProps = register('color', { required: true });

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>일정 추가</h2>
        <input
          type="text"
          placeholder="Event Name"
          name={nameProps.name}
          onChange={nameProps.onChange}
          onBlur={nameProps.onBlur}
          ref={nameProps.ref}
        />
        <input
          type="date"
          placeholder="Start Date"
          name={startDateProps.name}
          onChange={startDateProps.onChange}
          onBlur={startDateProps.onBlur}
          ref={startDateProps.ref}
        />
        <input
          type="date"
          placeholder="End Date"
          name={endDateProps.name}
          onChange={endDateProps.onChange}
          onBlur={endDateProps.onBlur}
          ref={endDateProps.ref}
        />
        <ColorOptions colorProps={colorProps} />
        <Button size="basic" color="primary" type="submit">
          추가
        </Button>
        <Button size="basic" color="white" type="button" onClick={onClose}>
          취소
        </Button>
      </ModalContent>
    </ModalOverlay>
  );
}

export default AddEventModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalContent = styled.form`
  background: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
`;
