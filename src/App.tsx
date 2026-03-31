import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/contexts/AuthContext'
import { TooltipProvider } from '@/components/ui/tooltip'
import { MainLayout } from '@/components/layout/MainLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

/**
 * 메인 App 컴포넌트
 * BrowserRouter + AuthProvider로 감싸서 라우팅과 인증 관리를 전역으로 설정
 */
const App: React.FC = () => {
    return (
        <BrowserRouter>
            <TooltipProvider>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<HomePage />} />
                            <Route path="about" element={<AboutPage />} />
                            <Route path="login" element={<LoginPage />} />
                            <Route element={<ProtectedRoute />}>
                                <Route path="dashboard" element={<DashboardPage />} />
                            </Route>
                        </Route>
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                    <Toaster />
                </AuthProvider>
            </TooltipProvider>
        </BrowserRouter>
    )
}

export default App
