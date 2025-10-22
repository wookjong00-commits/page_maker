# Page Maker - No-Code Website Builder

코딩 지식이 없는 일반 사용자도 쉽게 홈페이지를 만들 수 있는 비주얼 웹 빌더입니다. AI를 활용하여 디자인을 실제 HTML/CSS 코드로 자동 변환합니다.

## 주요 기능

### 1. 비주얼 드래그 앤 드롭 에디터
- 마우스로 요소를 자유롭게 배치
- 실시간 크기 조절
- 직관적인 인터페이스

### 2. 다양한 컴포넌트
- **텍스트**: 폰트, 크기, 색상, 정렬 커스터마이징
- **이미지**: URL 기반 이미지 삽입
- **버튼**: 색상, 텍스트, 링크 설정
- **컨테이너**: 다른 요소를 그룹화

### 3. 스타일 편집
- 위치 (X, Y 좌표)
- 크기 (너비, 높이)
- 텍스트 스타일 (폰트, 크기, 색상, 정렬)
- 배경색, 테두리 둥글기

### 4. AI 기반 코드 생성
- **Claude (Anthropic)**: 최신 Claude API 지원
- **ChatGPT (OpenAI)**: GPT-4 모델 사용
- **Gemini (Google)**: Gemini 1.5 Pro 지원
- 사용자가 직접 API 키를 연동 (안전한 클라이언트 사이드 처리)

### 5. 내보내기 및 미리보기
- 완성된 디자인을 HTML 파일로 다운로드
- 브라우저에서 실시간 미리보기
- 반응형 웹 디자인 지원

## 기술 스택

### Frontend
- **React 18** + **TypeScript**
- **Vite** (빠른 개발 환경)
- **@dnd-kit** (드래그 앤 드롭)
- CSS-in-JS (인라인 스타일)

### Backend
- **Node.js** + **Express**
- **TypeScript**
- AI SDK:
  - `@anthropic-ai/sdk` (Claude)
  - `openai` (ChatGPT)
  - `@google/generative-ai` (Gemini)

## 설치 및 실행

### 1. 레포지토리 클론
```bash
git clone <repository-url>
cd page_maker
```

### 2. Frontend 설정
```bash
cd frontend
npm install
npm run dev
```

Frontend는 기본적으로 `http://localhost:5173`에서 실행됩니다.

### 3. Backend 설정
```bash
cd backend
npm install
npm run dev
```

Backend는 기본적으로 `http://localhost:3001`에서 실행됩니다.

### 4. 환경 변수 (선택사항)
Backend에서 환경 변수를 설정하려면 `.env` 파일을 생성하세요:

```env
PORT=3001
```

Frontend에서 API URL을 변경하려면 `.env` 파일을 생성하세요:

```env
VITE_API_URL=http://localhost:3001
```

## 사용 방법

### 1. AI API 설정
1. 앱 상단의 "AI API 설정" 버튼 클릭
2. 사용할 AI 제공자 선택 (Claude, ChatGPT, Gemini)
3. 해당 서비스의 API 키 입력
4. "저장" 버튼 클릭

**API 키 발급 방법:**
- **Claude**: [Anthropic Console](https://console.anthropic.com/)
- **ChatGPT**: [OpenAI Platform](https://platform.openai.com/)
- **Gemini**: [Google AI Studio](https://makersuite.google.com/)

### 2. 디자인 만들기
1. 상단 툴바에서 원하는 컴포넌트 클릭 (텍스트, 이미지, 버튼, 컨테이너)
2. 캔버스에 추가된 요소를 드래그하여 원하는 위치로 이동
3. 요소를 선택하면 우측 패널에서 스타일 편집 가능
4. 우측 하단의 크기 조절 핸들을 드래그하여 크기 조절

### 3. 코드 생성
1. 디자인 완성 후 "AI로 코드 생성" 버튼 클릭
2. AI가 디자인을 분석하여 완전한 HTML/CSS 코드 생성
3. "HTML 다운로드" 버튼으로 파일 저장
4. "미리보기" 버튼으로 새 탭에서 결과 확인

### 4. 추가 기능
- **요소 삭제**: 요소 선택 후 "선택 삭제" 버튼 클릭
- **자동 저장**: 디자인은 브라우저 로컬 스토리지에 자동 저장
- **반응형**: 생성된 HTML은 모바일 친화적

## 프로젝트 구조

```
page_maker/
├── frontend/                # React 프론트엔드
│   ├── src/
│   │   ├── components/     # React 컴포넌트
│   │   │   ├── Canvas.tsx          # 메인 캔버스
│   │   │   ├── DraggableElement.tsx # 드래그 가능한 요소
│   │   │   ├── Toolbar.tsx         # 컴포넌트 툴바
│   │   │   ├── StylePanel.tsx      # 스타일 편집 패널
│   │   │   └── ApiConfig.tsx       # API 설정
│   │   ├── types/          # TypeScript 타입 정의
│   │   ├── utils/          # 유틸리티 함수
│   │   └── App.tsx         # 메인 앱
│   └── package.json
├── backend/                # Express 백엔드
│   ├── src/
│   │   ├── routes/        # API 라우트
│   │   ├── services/      # AI 서비스 통합
│   │   │   ├── claude.ts
│   │   │   ├── chatgpt.ts
│   │   │   └── gemini.ts
│   │   └── index.ts       # 서버 엔트리포인트
│   └── package.json
└── README.md
```

## 개발 스크립트

### Frontend
- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run preview`: 빌드된 앱 미리보기

### Backend
- `npm run dev`: 개발 서버 실행 (nodemon + ts-node)
- `npm run build`: TypeScript 컴파일
- `npm start`: 컴파일된 코드 실행

## 보안 및 개인정보

- **API 키는 클라이언트에서 관리**: 사용자의 API 키는 브라우저 로컬 스토리지에 저장되며, 서버에 저장되지 않습니다.
- **직접 연동**: 백엔드는 단순히 프록시 역할만 수행하며, API 키를 저장하거나 로깅하지 않습니다.
- **HTTPS 권장**: 프로덕션 환경에서는 HTTPS를 사용하세요.

## 향후 개발 계획

- [ ] 애니메이션 및 모션 효과 추가
- [ ] 더 많은 컴포넌트 (폼, 비디오, 내비게이션 등)
- [ ] 템플릿 라이브러리
- [ ] 협업 기능
- [ ] 버전 관리
- [ ] 호스팅 통합
- [ ] 반응형 뷰포트 전환

## 라이선스

MIT License

## 기여

Pull Request와 Issue는 언제든 환영합니다!

## 문의

문제가 발생하거나 제안 사항이 있으면 GitHub Issues를 통해 알려주세요.
