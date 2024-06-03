import styled from 'styled-components';

const ProfileInfoStyle = styled.div`
  .confirmWrapper {
    display: flex;
    justify-content: space-between;
    height: 25vh;
  }
  .confirmEl {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 0 50px 0 50px;
    color: ${(props) => props.theme.color.black};
    font-size: ${(props) => props.theme.fontSize.title1};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    border: 1px solid ${(props) => props.theme.color.primary};
    border-radius: 10px;
    padding: 2em;
    background-color: ${(props) => props.theme.color.white};
    box-shadow: 0 5px 5px -4px;
  }
  .confirmApply {
    color: ${(props) => props.theme.color.yellow};
  }
  .confirmPay {
    color: ${(props) => props.theme.color.primary};
  }
  .confirmSchedule {
    color: ${(props) => props.theme.color.red};
  }
`;

export default function ProfileInfo() {
  return (
    <ProfileInfoStyle>
      <div>
        <div className="confirmWrapper">
          <div className="confirmEl">
            결재 대기중인 내역
            <div className="confirmApply">1건</div>
          </div>
          <div className="confirmEl">
            당월 예상 급여
            <div className="confirmPay">2,370,000</div>
          </div>
          <div className="confirmEl">
            오늘의 일정
            <div className="confirmSchedule">3건</div>
          </div>
        </div>
      </div>
    </ProfileInfoStyle>
  );
}
