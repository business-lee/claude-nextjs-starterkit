import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

interface MainLayoutProps {
    className?: string
}

/**
 * 메인 레이아웃 컴포넌트
 * Header + 메인 콘텐츠 영역 + Footer로 구성
 * 최소 높이를 100vh로 설정해 Footer가 항상 아래에 위치하도록 함 (Sticky Footer)
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ className }) => {
    return (
        <div className={`flex flex-col min-h-screen ${className || ''}`}>
            <Header />
            <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
