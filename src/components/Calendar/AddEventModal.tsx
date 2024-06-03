import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

const ModalWrapper = styled.div`
  /* 모달 스타일 */
`;

const ColorOption = styled.input<{ color: string }>`
  background-color: ${(props) => props.color};
  /* 기타 스타일 */
`;

interface FormData {
  name: string;
  startDate: string;
  endDate: string;
  color: string;
}

function AddEventModal() {
  const { register, handleSubmit } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    const userId = sessionStorage.getItem('id');
    if (!userId) return;

    const event = {
      ...data,
      eventId: Date.now().toString(),
    };

    try {
      await addDoc(collection(firestore, 'event', userId, 'events'), event);
      alert('Event added successfully!');
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
    <ModalWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div>
          <ColorOption
            type="radio"
            value="red"
            color="red"
            name={colorProps.name}
            onChange={colorProps.onChange}
            onBlur={colorProps.onBlur}
            ref={colorProps.ref}
          />
          <ColorOption
            type="radio"
            value="blue"
            color="blue"
            name={colorProps.name}
            onChange={colorProps.onChange}
            onBlur={colorProps.onBlur}
            ref={colorProps.ref}
          />
          <ColorOption
            type="radio"
            value="green"
            color="green"
            name={colorProps.name}
            onChange={colorProps.onChange}
            onBlur={colorProps.onBlur}
            ref={colorProps.ref}
          />
          <ColorOption
            type="radio"
            value="yellow"
            color="yellow"
            name={colorProps.name}
            onChange={colorProps.onChange}
            onBlur={colorProps.onBlur}
            ref={colorProps.ref}
          />
          <ColorOption
            type="radio"
            value="purple"
            color="purple"
            name={colorProps.name}
            onChange={colorProps.onChange}
            onBlur={colorProps.onBlur}
            ref={colorProps.ref}
          />
          <ColorOption
            type="radio"
            value="orange"
            color="orange"
            name={colorProps.name}
            onChange={colorProps.onChange}
            onBlur={colorProps.onBlur}
            ref={colorProps.ref}
          />
        </div>
        <button type="submit">Add Event</button>
      </form>
    </ModalWrapper>
  );
}

export default AddEventModal;
