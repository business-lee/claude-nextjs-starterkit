import React, { createContext } from 'react'
import type { ReactNode } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import type { User, AuthState } from '@/types'

// AuthContext 타입 정의
export interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}

// Context 생성 (초기값은 undefined로, Provider 외부에서 접근 시 에러 발생)
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// AuthProvider Props
interface AuthProviderProps {
    children: ReactNode
}

/**
 * 인증 상태를 관리하는 Context Provider
 * localStorage를 사용해 새로고침 후에도 세션 유지
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useLocalStorage<User | null>('auth-user', null)
    const [isLoading, setIsLoading] = React.useState(false)

    const isAuthenticated = user !== null

    /**
     * 로그인 함수 (모의 구현)
     * 실제 구현에서는 API 호출로 대체
     */
    const login = async (email: string, password: string): Promise<void> => {
        setIsLoading(true)
        try {
            // 모의 API 호출 - 500ms 딜레이
            await new Promise((resolve) => setTimeout(resolve, 500))

            // 간단한 유효성 검사
            if (!email.includes('@')) {
                throw new Error('유효한 이메일을 입력하세요')
            }

            if (password.length < 8) {
                throw new Error('비밀번호는 8자 이상이어야 합니다')
            }

            // 모의 사용자 객체 생성
            const newUser: User = {
                id: '1',
                email,
                name: email.split('@')[0],
                role: 'user',
            }

            setUser(newUser)
        } finally {
            setIsLoading(false)
        }
    }

    /**
     * 로그아웃 함수
     */
    const logout = (): void => {
        setUser(null)
    }

    const value: AuthContextType = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
