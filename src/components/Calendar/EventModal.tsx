import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Button from '../common/Button';
import { addEvent, deleteEvent, updateEvent } from '../../store/calendar';
import { AppDispatch } from '../../store';
import ColorOptions from './ColorOptions';

interface Event {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  color: string;
}

interface EventModalProps {
  event?: Event;
  onClose: () => void;
  type: 'add' | 'edit';
}
const defaultEvent: Event = {
  id: '',
  name: '',
  startDate: '',
  endDate: '',
  color: '#B3B3B3',
};

function EventModal({ event = defaultEvent, onClose, type }: EventModalProps) {
  const dispatch: AppDispatch = useDispatch();
  const [isEvent, setIsEvent] = useState(event);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleColorChange = (color: string) => {
    setIsEvent((prevEvent) => ({ ...prevEvent, color }));
  };

  const handleUpdate = () => {
    dispatch(updateEvent(isEvent));
    onClose();
  };

  const handleDelete = () => {
    dispatch(deleteEvent(event.id));
    onClose();
  };

  const handleAdd = () => {
    const { id, ...newEvent } = isEvent;

    if (!newEvent.name) {
      setValidationError('일정 이름을 입력하세요.');
      setErrorKey((prev) => prev + 1);
      return;
    }

    if (!newEvent.startDate) {
      setValidationError('시작일을 입력하세요.');
      setErrorKey((prev) => prev + 1);
      return;
    }

    if (!newEvent.endDate) {
      setValidationError('종료일을 입력하세요.');
      setErrorKey((prev) => prev + 1);
      return;
    }

    if (newEvent.startDate > newEvent.endDate) {
      setValidationError('종료일이 시작일보다 빠를 수 없습니다.');
      setErrorKey((prev) => prev + 1);
      return;
    }

    dispatch(addEvent(newEvent));
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <EventHeader>
          <EventColor color={isEvent.color} />
          {type === 'edit' ? (
            <EventTitle>{isEvent.name}</EventTitle>
          ) : (
            <EventTitle>이벤트 추가</EventTitle>
          )}
        </EventHeader>
        <List>
          <InputLabel>일정</InputLabel>
          <InputBox
            type="text"
            name="name"
            value={type === 'edit' ? isEvent.name : undefined}
            placeholder="일정 이름을 입력하세요."
            onChange={handleChange}
            required
          />
        </List>
        <DateRow>
          <List>
            <InputLabel>시작일</InputLabel>
            <InputBox
              type="date"
              name="startDate"
              value={type === 'edit' ? isEvent.startDate : undefined}
              onChange={handleChange}
              required
            />
          </List>
          <span>~</span>
          <List>
            <InputLabel>종료일</InputLabel>
            <InputBox
              type="date"
              name="endDate"
              value={type === 'edit' ? isEvent.endDate : undefined}
              onChange={handleChange}
              required
            />
          </List>
        </DateRow>
        <List>
          <InputLabel>색상</InputLabel>
          <ColorOptions
            selectedColor={isEvent.color}
            onColorChange={handleColorChange}
          />
        </List>
        <ButtonRow>
          {validationError && (
            <ErrorMessage key={errorKey}>{validationError}</ErrorMessage>
          )}{' '}
          {type === 'edit' ? (
            <>
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
            </>
          ) : (
            <Button
              size="basic"
              color="primary"
              type="submit"
              onClick={handleAdd}
            >
              추가
            </Button>
          )}
          <Button size="basic" color="white" type="button" onClick={onClose}>
            취소
          </Button>
        </ButtonRow>
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
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 35rem;
  min-width: 10rem;
  padding: 1rem 2rem;
  border-radius: 5px;
  background: white;
`;

const EventHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const EventColor = styled.div`
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const EventTitle = styled.h1`
  font-size: ${(props) => props.theme.fontSize.title1};
  color: ${(props) => props.theme.color.black};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  box-sizing: border-box;
`;

const InputLabel = styled.label`
  font-size: ${(props) => props.theme.fontSize.body1};
  color: ${(props) => props.theme.color.black};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  margin-bottom: 8px 0;
`;

const InputBox = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 ${(props) => props.theme.fontSize.title2};
  margin-bottom: 1rem;
  border-width: 1px;
  border-style: solid;
  border-radius: 6px;
  font-size: ${(props) => props.theme.fontSize.title4};
  box-sizing: border-box;
  outline-color: ${(props) => props.theme.color.primary};
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: right;
  gap: 1rem;
  width: 100%;
  position: relative;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  position: absolute;
  left: 1rem;
  animation: vibration 0.3s;

  @keyframes vibration {
    0% {
      transform: translateX(0);
      color: ${(props) => props.theme.color.black};
    }
    25% {
      transform: translateX(-5px);
      color: #7e3f46;
    }
    50% {
      transform: translateX(5px);
      color: #be3f46;
    }
    75% {
      transform: translateX(-5px);
      color: #ff3f46;
    }
    100% {
      transform: translateX(0);
      color: ${(props) => props.theme.color.red};
    }
  }
`;
