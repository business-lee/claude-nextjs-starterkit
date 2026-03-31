import { useContext } from 'react'
import type { AuthContextType } from '@/contexts/AuthContext'
import { AuthContext } from '@/contexts/AuthContext'

/**
 * AuthContext를 소비하는 훅
 * AuthProvider 외부에서 사용 시 에러를 throw합니다
 * @returns AuthContextType
 * @throws Error - AuthProvider 외부에서 호출될 경우
 */
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}
