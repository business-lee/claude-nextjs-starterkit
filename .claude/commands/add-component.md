---
description: src/components/ 폴더에 React 함수형 컴포넌트 파일을 생성합니다
argument-hint: <ComponentName>
---

컴포넌트 이름: $ARGUMENTS

다음 규칙을 따르는 React 함수형 컴포넌트를 `src/components/` 폴더에 생성해주세요:

## 요구사항
1. **파일명**: [컴포넌트명].tsx (camelCase나 PascalCase 그대로 사용)
2. **타입**: `[컴포넌트명]Props` 형태로 정의 (CLAUDE.md 규칙)
3. **구조**:
   - `@/lib/utils`에서 `cn()` import
   - TypeScript 인터페이스로 Props 타입 정의
   - React 19 함수형 컴포넌트 (import React 불필요)
   - Tailwind CSS 클래스 사용
   - className prop으로 스타일 확장 가능
   - default export
4. **제약조건**:
   - any 타입 금지
   - 불필요한 주석 없음
   - 간단하고 재사용 가능한 구조

## 템플릿 예시
```tsx
import { cn } from '@/lib/utils';

interface [ComponentName]Props {
    className?: string;
    children: React.ReactNode;
}

export default function [ComponentName]({ className, children }: [ComponentName]Props) {
    return (
        <div className={cn('', className)}>
            {children}
        </div>
    );
}
```
