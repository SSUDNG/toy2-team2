// src/EventModal.tsx
import React from 'react';
import styled from 'styled-components';

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
`;

interface Event {
  id?: string;
  name: string;
  startDate: string;
  endDate: string;
  color: string;
}

interface EventModalProps {
  event: Event;
  onClose: () => void;
}

function EventModal({ event, onClose }: EventModalProps) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>{event.name}</h2>
        <p>
          {event.startDate} - {event.endDate}
        </p>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </ModalContent>
    </ModalOverlay>
  );
}

export default EventModal;
