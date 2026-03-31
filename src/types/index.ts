// 사용자 역할 타입
export type UserRole = 'admin' | 'user'

// 사용자 정보 인터페이스
export interface User {
    id: string
    email: string
    name: string
    role: UserRole
}

// 인증 상태 인터페이스
export interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
}

// API 응답 제네릭
export interface ApiResponse<T> {
    data: T
    message: string
    success: boolean
}

// 라우트 경로 union 타입
export type RoutePath = '/' | '/about' | '/login' | '/dashboard'
