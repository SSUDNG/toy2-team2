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
    dispatch(addEvent(isEvent));
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
          />
        </List>
        <List>
          <InputLabel>시작일</InputLabel>
          <InputBox
            type="date"
            name="startDate"
            value={type === 'edit' ? isEvent.startDate : undefined}
            onChange={handleChange}
          />
        </List>
        <List>
          <InputLabel>종료일</InputLabel>
          <InputBox
            type="date"
            name="endDate"
            value={type === 'edit' ? isEvent.endDate : ''}
            onChange={handleChange}
          />
        </List>
        <List>
          <InputLabel>색상</InputLabel>
          <ColorOptions
            selectedColor={isEvent.color}
            onColorChange={handleColorChange}
          />
        </List>
        <ButtonRow>
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const ModalContent = styled.div`
  background: white;
  padding: 1rem 2rem;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const EventHeader = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const EventTitle = styled.h1`
  font-size: ${(props) => props.theme.fontSize.title1};
  color: ${(props) => props.theme.color.black};
`;

const EventColor = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 1rem;
`;

const List = styled.li`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputLabel = styled.label`
  font-size: ${(props) => props.theme.fontSize.body1};
  color: ${(props) => props.theme.color.black};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  margin-bottom: 8px 0;
`;

const InputBox = styled.input`
  border-radius: 6px;
  border-style: solid;
  border-width: 1px;
  height: 50px;
  padding: 0 ${(props) => props.theme.fontSize.title2};
  font-size: ${(props) => props.theme.fontSize.title4};
  margin-bottom: 1rem;
`;

const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  gap: 1rem;
  margin-bottom: 1rem;
`;
