# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개발 환경

- **프레임워크**: React 19 + TypeScript 5.8
- **빌드 도구**: Vite 7.0
- **번들러**: SWC (빠른 Fast Refresh)
- **스타일링**: Tailwind CSS 4.2
- **라우팅**: React Router v7
- **폼**: react-hook-form + Zod 검증
- **UI**: shadcn/ui + Radix UI
- **상태 관리**: Context API + localStorage

## 자주 사용하는 명령어

```bash
npm run dev         # Vite 개발 서버 시작 (localhost:5173, HMR 활성)
npm run build       # TypeScript 컴파일 + Vite 프로덕션 빌드 (dist/)
npm run lint        # ESLint 코드 검사
npm run preview     # 빌드 결과 미리보기
npx playwright install  # Playwright 브라우저 설치 (테스팅용)
```

## 프로젝트 구조 및 아키텍처

### 핵심 아키텍처

**5계층 컴포넌트 구조:**
1. **UI 컴포넌트** (`src/components/ui/`) - shadcn/ui 기반 원자 컴포넌트 (Button, Form, Input 등)
2. **공통 컴포넌트** (`src/components/common/`) - ThemeToggle, PageHeader, LoadingSpinner 등
3. **레이아웃** (`src/components/layout/`) - MainLayout, Header, Footer, MobileMenu
4. **특수 컴포넌트** (`src/components/auth/`) - ProtectedRoute 인증 보호
5. **페이지** (`src/pages/`) - HomePage, LoginPage, DashboardPage 등

### 상태 관리 패턴

```
AuthContext (전역 상태)
├─ user: User | null
├─ isAuthenticated: boolean
├─ isLoading: boolean
├─ login(email, password) → localStorage에 저장
├─ logout() → localStorage 제거
└─ useAuth() hook으로 소비

localStorage 활용:
├─ auth-user: 사용자 세션 저장
└─ theme: light/dark 테마 상태
```

**Context 사용 예:**
```typescript
// src/contexts/AuthContext.tsx 정의
// src/hooks/useAuth.ts에서 소비 (AuthProvider 내부에서만 사용 가능)
```

### 라우팅 구조

**src/App.tsx**에 정의된 라우트:
- `/` - HomePage (공개)
- `/about` - AboutPage (공개)
- `/login` - LoginPage (공개)
- `/dashboard` - DashboardPage (ProtectedRoute로 보호됨)
- `*` - NotFoundPage (404)

**인증 흐름:**
1. LoginPage에서 react-hook-form + Zod로 검증
2. AuthContext.login()에서 localStorage에 저장
3. ProtectedRoute에서 isAuthenticated 확인 후 리다이렉트
4. Header의 UserMenu에서 logout() 호출

### 폼 관리 패턴

**LoginPage 예제** (react-hook-form + Zod):
```typescript
// Zod 스키마로 런타임 검증
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

// react-hook-form으로 폼 상태 관리
const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: { email: '', password: '' }
});

// shadcn Form 컴포넌트와 통합
<Form {...form}>
  <FormField name="email" ... />
</Form>
```

### CSS 클래스 병합 유틸

**src/lib/utils.ts**의 `cn()` 함수:
```typescript
// clsx + tailwind-merge로 Tailwind 충돌 방지
cn("px-2 py-1", condition && "px-4")  // px-4가 px-2 덮어씀
```

모든 UI 컴포넌트와 shadcn 컴포넌트에서 사용.

### 날짜 포맷팅 유틸

**src/lib/date.ts**:
```typescript
formatDate(new Date(), 'yyyy.MM.dd')  // 기본값
formatRelativeTime(new Date(-3600000))  // "1시간 전"
getDaysDifference(date1, date2)  // 날짜 차이 계산
```

## 주요 파일 및 역할

| 파일 경로 | 설명 |
|---------|------|
| `src/App.tsx` | React Router 라우트 정의 + Layout 래퍼 |
| `src/main.tsx` | React 진입점 (ReactDOM.createRoot) |
| `src/contexts/AuthContext.tsx` | 전역 인증 상태 + localStorage 동기화 |
| `src/hooks/useAuth.ts` | AuthContext 소비 훅 |
| `src/components/layout/MainLayout.tsx` | Header + Footer + Outlet 레이아웃 |
| `src/components/layout/Header.tsx` | 상단 네비게이션 + UserMenu + ThemeToggle |
| `src/components/auth/ProtectedRoute.tsx` | 인증 필요 라우트 보호 (로그인으로 리다이렉트) |
| `src/pages/LoginPage.tsx` | 폼 검증 구현 예제 (react-hook-form + Zod) |
| `src/types/index.ts` | User, AuthState, ApiResponse, RoutePath 타입 정의 |
| `src/lib/utils.ts` | cn() 클래스 병합 유틸 |
| `src/lib/date.ts` | formatDate, formatRelativeTime 유틸 |
| `components.json` | shadcn/ui 컴포넌트 설정 |
| `vite.config.ts` | React SWC, Tailwind, 경로 별칭 설정 |
| `tsconfig.json` | `@/*` 경로 별칭 정의 |
| `eslint.config.js` | ESLint flat config (TypeScript, React Hooks) |

## 설정 및 경로 별칭

**tsconfig.json의 경로 별칭:**
```json
"@/*": "./src/*"
```

**vite.config.ts의 플러그인:**
- `@vitejs/plugin-react-swc` - SWC 기반 Fast Refresh
- `TailwindPlugin` - Tailwind CSS 통합
- `tsconfigPaths` - tsconfig 경로 별칭 자동 해석

## 테마 시스템

**구현:**
- CSS 변수로 light/dark 색상 정의 (`src/index.css`)
- localStorage에 'theme' 키로 상태 저장
- Header의 ThemeToggle로 전환

**dark mode:**
```html
<!-- Dark mode: html 요소에 .dark 클래스 추가 -->
<html class="dark">
```

## 타입 정의

**src/types/index.ts**:
```typescript
type User = { id: string; email: string; name: string; role: 'user' | 'admin' };
type AuthState = { user: User | null; isAuthenticated: boolean; isLoading: boolean };
type ApiResponse<T> = { data: T; status: number; message?: string };
type RoutePath = '/' | '/about' | '/login' | '/dashboard';
```

**모든 props는 "[컴포넌트명]Props" 형태로 타이핑** (global CLAUDE.md 참조).

## 의존성 주의사항

**Core:**
- React 19는 새로운 JSX transform 사용 (import React 불필요)
- React Router v7 사용 (v6와 마이그레이션 필요)

**폼 검증:**
- Zod는 런타임 검증 (컴파일 타임 타입 추론은 불가)
- react-hook-form의 `resolver`로 연결

**스타일:**
- Tailwind v4는 CSS 변수 기반 (`tw-xxxx`)
- shadcn은 CSS 변수 theme (light/dark 자동 지원)

**라우팅:**
- `<Routes>` 내부에서만 `useNavigate()`, `useParams()` 사용 가능
- ProtectedRoute는 Routes 내부에 중첩

## 개발 팁

1. **경로 별칭 사용**: `import { cn } from '@/lib/utils'` (상대 경로 No)
2. **컴포넌트 props 타입**: 항상 `[컴포넌트명]Props` 패턴 사용
3. **폼 검증**: Zod 스키마 정의 → zodResolver로 연결
4. **localStorage**: useLocalStorage hook (usehooks-ts) 사용 권장
5. **shadcn 컴포넌트**: components.json의 별칭으로 import 가능
   ```typescript
   import { Button } from '@/components/ui/button'  // 별칭 불가
   import { Button } from '@/components/ui/button.tsx'  // OK
   ```
6. **다크 모드 테스트**: 개발 도구에서 `document.documentElement.classList.add('dark')` 실행

## 공통 오류 및 해결

**"useAuth should be used within <AuthProvider>"**
- useAuth()는 AuthContext.Provider 내부에서만 사용 가능
- App.tsx의 라우트 구조 확인

**React DevTools 경고: "forwardRef render functions accept exactly two parameters"**
- forwardRef는 (props, ref) 두 파라미터 필요
- ref를 사용하지 않으면 forwardRef 제거 고려
- ✅ 이미 수정됨 (src/components/ui/form.tsx)

**ESLint "react-hooks/exhaustive-deps" 경고**
- useEffect 의존성 배열이 불완전함
- 필요한 의존성 명시적으로 추가
- 무시 필요시: `// eslint-disable-next-line`

## 테스팅

**Playwright 설치 (필요시):**
```bash
npx playwright install
```

**콘솔 오류 확인:**
```bash
# Node.js 스크립트로 자동 검증 가능
# 예: Playwright로 브라우저 접속 → 콘솔 메시지 수집
```
