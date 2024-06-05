import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

interface Event {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  color: string;
}

interface EventModalProps {
  event: Event;
  onClose: () => void;
  onUpdate: (event: Event) => void;
  onDelete: (eventId: string) => void;
}

function EventModal({ event, onClose, onUpdate, onDelete }: EventModalProps) {
  const [editableEvent, setEditableEvent] = useState(event);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleUpdate = () => {
    onUpdate(editableEvent);
    onClose();
  };
  const handleDelete = () => {
    onDelete(event.id);
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Edit Event</h2>
        <div>Name: </div>
        <input
          type="text"
          name="name"
          value={editableEvent.name}
          onChange={handleChange}
        />

        <div>Start Date:</div>
        <input
          type="date"
          name="startDate"
          value={editableEvent.startDate}
          onChange={handleChange}
        />

        <div>End Date:</div>
        <input
          type="date"
          name="endDate"
          value={editableEvent.endDate}
          onChange={handleChange}
        />

        <Button
          size="basic"
          color="primary"
          type="submit"
          onClick={handleUpdate}
        >
          수정
        </Button>
        <Button
          size="basic"
          color="primary"
          type="submit"
          onClick={handleDelete}
        >
          삭제
        </Button>
        <Button size="basic" color="white" type="button" onClick={onClose}>
          취소
        </Button>
      </ModalContent>
    </ModalOverlay>
  );
}

export default EventModal;

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

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
