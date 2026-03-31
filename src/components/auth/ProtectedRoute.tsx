import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { useAuth } from '@/hooks/useAuth'

interface ProtectedRouteProps {
    redirectTo?: string
}

/**
 * 인증이 필요한 라우트를 보호하는 컴포넌트
 * 로딩 중: LoadingSpinner 표시
 * 미인증: 로그인 페이지로 리다이렉트
 * 인증: Outlet 렌더링
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectTo = '/login' }) => {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return <LoadingSpinner message="인증 상태 확인 중..." />
    }

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />
    }

    return <Outlet />
}
