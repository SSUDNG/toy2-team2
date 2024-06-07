# 🧑🏻‍💼 직원을 위한 급여 및 업무관리 플랫폼

- 배포 URL: 
- Test ID: testid
- Test PW: 1q2w3e$R

## 💻 프로젝트 소개
- 직원을 위한 인트라넷 서비스입니다.
- 보기 편하고 심플한 디자인을 추구했습니다.

## 🕓 개발 기간

### **전체 개발 기간: 05/31 ~  06/09** <br>
05/31 ~ 06/2: 페이지 디자인 & 퍼블리싱 <br>
06/03 ~ 06/09: 기능 구현 <br>

## 🙌 팀원 구성
|**김민수**|**송재원**|**변희준**|**장경빈**|
| :------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: |
 <img width="180" alt="장경빈_profile_img" src="https://github.com/FastCampus-Toy1/team5_intranet/assets/105346651/2113ce00-9401-4b3a-981a-7d83e43bb7d1"> | <img width="180"  alt="정보현_profile_img" src="https://github.com/FastCampus-Toy1/team5_intranet/assets/105346651/00fbefd1-5d1a-4f23-b659-15f4ee1bda13"> | <img width="180" alt="강수경_profile_img" src="https://github.com/FastCampus-Toy1/team5_intranet/assets/105346651/192a2a66-e4c5-4c6a-8ffe-d36574190518"> | <img width="180" alt="이진영_profile_img" src="https://github.com/FastCampus-Toy1/team5_intranet/assets/105346651/40942804-5f34-48e0-9b41-10106a35a8eb" > | <img width="180" alt="신수민_profile_img" src="https://github.com/FastCampus-Toy1/team5_intranet/assets/105346651/4ac1189e-d538-42c9-8ef9-b5e1480c2a75" > |
| [BaDook2](https://github.com/BaDook2) | [정보현](https://github.com/jeongbohyeoun) | [sue0226](https://github.com/sue0226) | [FE_이진영](https://github.com/holololob) | [soominnnn](https://github.com/soominnnn) |
| 팀장 | 팀원 | 팀원 | 팀원 | 팀원 |

## 🔥사용 기술 스택
1 ) 프론트엔드 기술<br><br>
<img src="https://img.shields.io/badge/typescript-blue?style=for-the-badge&logo=Typescript&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
<img src="https://img.shields.io/badge/zod-000000?style=for-the-badge&logo=Zod&logoColor=white">
<img src="https://img.shields.io/badge/Redux-8449C5?style=for-the-badge&logo=redux&logoColor=white">


2 ) 데이터베이스<br><br>
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"/>

3 ) 도구 및 라이브러리<br><br>
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white">
<img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white"/>

4 ) 협업 및 프로젝트 관리<br><br>
<img alt="Notion" src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white"/>
<img alt="Slack" src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"/>

5 ) 디자인<br><br>
<img alt="Figma" src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/><br>
[링크](https://www.figma.com/design/NPlCeMhCTzcKATiqvpInMl/layout?node-id=24-1270&t=z0hbYYIfkCN1Vc8c-0)

6 ) 배포<br><br>
<img alt="Vercel" src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"/>

## 👀 유저 플로우
![image](https://github.com/FastCampus-Toy1/team5_intranet/assets/105346651/b946a399-36fc-4554-a8cb-b036f6ae7236)

## ✨ 역할 분담

### 장경빈
1. 부재 신청 기능 구현 - Main_UserAbsenceContainer.jsx
2. 반차, 연차, 외출 등 사유 선택 구현 - Main_AbsenceOption.jsx
    - 반차 선택 시, 시간 선택 버튼
3. 연차 사용 시, 사용하는 연차와 잔여 휴가 표시 기능 구현 - Main_AbsenceDate.jsx
    - 연차를 제외한 사유 선택 시, 금일만 선택되도록 구현
    - 사유 작성 후 제출 버튼 - Main_AbsenceReason.jsx
    - 이전 날짜 선택 시, 제출 버튼을 눌러도 신청 불가
4. 로그인 유저 부재 신청 내역 구현 - Main_AbsenceSubmitHistory.jsx
    - 현재 날짜로부터 7일 이내의 부재를 2초마다 보여주도록 구현
    - 휴가까지의 D-DAY를 보여주는 `D - n` 구현
    - 7일 이후의 부재를 모두 보여주는 기능 구현
    - 더보기 버튼 클릭 시, 모든 유저의 부재를 보여주는 페이지로 이동

### 정보현
1. 부재 신청 페이지 - Attnedance.jsx
2. 부재 신청 내역 확인창 구현 - Attendance_Datafield.jsx
    - 반차(오전 / 오후), 조퇴, 외출 선택 시 당일로 선택되도록 구현
    - 신청 상태 변경
        - 현재 날짜부터 7일 내 휴가 → 승인
        - 현재 날짜부터 7일 초과 → 승인 전
        - 이외 데이터 누락 → 거절
    - 부재 항목 휴가 정렬
        - 우선순위 ⇒ 휴가 시작일, 휴가 종료일
    - 부재 항목 클릭 시, 사유 transition 효과 구현
3. 부재 항목에 따른 필터링 기능 구현 - Attendance_Select.jsx
4. 부재 검색 기능 구현 - Attendance_Search.jsx
5. 비밀번호 변경 기능 구현 - Main_UserInfoPwChange.jsx

### 강수경
1. 헤더 - Header.jsx
    - 이전 페이지로 돌아가기, 로그아웃 기능 구현
2. 로그인 페이지 - Login.jsx
    - Session Storage에 로그인 정보 저장 후 마이 페이지로 이동
3. 로그인 체크 여부 기능 - CheckLogin.jsx
    - 로그인 여부 체크 후 로그인 되어있지 않은 경우 로그인 화면으로 이동
4. 공지사항 페이지 - Notice.jsx
    - 공지사항 리스팅 ( 무한 스크롤 5건씩 표시 )
5. 검색 기능 구현 - Notice_Search.jsx
6. 공지사항 글쓰기 기능 구현 - Notice_Add.sjx
    - 이미지와 공지 내용 업로드, 이미지가 업로드 되지 않은 경우 더미 이미지 출력
    - 공지사항 등록 후 공지사항 리스트 페이지 이동
7. 메인화면 공지 사항 - Main_Notice.jsx
    - 등록된 최신 날짜 순으로 3건씩 출력
    
### 이진영
1. 유저 프로필 구현 - Main_UserProfile.jsx
2. 유저 프로필 회원 정보 수정 모달 - Main_UserInfo.jsx
3.  유저 프로필 이미지 표시 구현 - Main_UserProfileImage.jsx
4. 회원 정보 수정 화면의 Input 컴포넌트 - Main_UserInfoInput.jsx

### 신수민
1. 근무 시작 및 종료 타임테이블 구현 - Main_Timetable.jsx
    - 세션 스토리지에 등록된 아이디와 오늘의 날짜 데이터를 통해 근무 확인
    - 출근 데이터가 있는 경우
        - 출근 시간 표시 및 근무 중 상태 변경
    - 출근 & 퇴근 데이터가 있는 경우
        - 더 이상 근무 불가 메시지를 alert로 표시
    - 오늘 날짜에 아무 데이터가 없는 경우
        - 근무 시작 버튼 클릭 시, 출근 데이터 전송
2. 근무 시작 및 종료 버튼 클릭 시, 모달 창 구현 - Main_WorkingModal.jsx
3. 공용 버튼 컴포넌트 구현 - Button.jsx
    - transition을 이용한 버튼 눌림 애니메이션 구현

## ❤️ 프로젝트 진행 소감
### 장경빈
다양한 리액트 훅을 써보지 못해서 아쉬웠고, 상태관리 라이브러리의 필요성을 절실하게 느꼈습니다. 또한, 파이어베이스를 처음 사용해보았는데 간단하게 사용할 수 있다는 것을 느꼈고, 나중에 혼자 많이 사용해봐야겠다고 다짐했습니다.

### 정보현
첫 팀 프로젝트여서 내가 못따라가면 어떡하나 싶었지만, 팀원들의 도움으로 잘 해결해나갈 수 있었고, 팀원들과의 소통이 재미있었습니다. <br>
특히, 이런 저런 오류나 맞춰야할 부분들을 팀원들과 소통하면서 해결하고, 모르는 것들을 알려주는 부분이 가장 좋았던 것 같습니다.

### 강수경
팀원들과 소통하면서 프로젝트를 진행하는 것이 재미있었고, 많이 공부가 되는 시간이었습니다.<br>
리액트로 개발을 하니 바닐라 JS 보다 훨씬 코드가 정리 되는 느낌이라 좋았습니다.

### 이진영
최초 계획한 것과 동일한 결과물이 나오지 않을 줄 예상하기는 했지만 직접 경험하는 것은 또 다른 일임을 알았습니다.<br>
굳이 필요하지 않은 컴포넌트를 만들거나, 또는 만든 컴포넌트를 재사용한 기회가 많지 않았다는 점이 아쉽습니다.
모달 창이 열릴 때 배경을 어둡게 처리하는 것은 어떻게든 구현하기는 했지만, 팀원에게 useRef를 사용하면 좋다고 조언 받아서 이번 프로젝트 이후 직접 만들어 볼 생각입니다.<br>
일신상의 사유로 학습이 부족했는데 이건 말 그대로 개인적인 사유일 뿐이고, 내 모자람이 팀에게 피해를 줄까 봐 걱정이 많았습니다. 실제로도 기능 구현은 하지 못하고 퍼블리싱을 한 것에 가깝습니다.<br>
그동안 부진한 성취 때문에 강사님께 질문하는 것도 망설이곤 했었는데, 팀 프로젝트를 하는 동안 역설적이게도 팀에게 피해를 주지 않기 위해서 질문을 많이 하려고 노력했습니다.<br>
모르는 것을 혼자서 붙잡고 있으며 시간을 보내기보다 나보다 잘 아는 사람에게 물어보고 빠르게 해결하는 것이 제 발전에도, 팀에게도 도움이 된다는 긍정 경험이 저에게는 의미 있는 일이었습니다.

### 신수민
부트캠프를 시작하면서, 처음으로 팀 프로젝트를 진행하게 되었는데 팀원들과 소통의 부재 없이 원활하게 항상 즐겁게 회의하면서 프로젝트를 진행해서 너무 즐거웠던 것 같습니다. <br>
서로서로 모르는 부분에 대해 알려주면서 다들 더 친밀해지고 서로가 몰랐던 부분들에 대해 더 많이 알 수 있던 기회였다고 생각합니다. <br>
아직은 리액트에 익숙하지 않지만 계속해서 공부해나가면서 성장하는 개발자가 되고싶습니다.