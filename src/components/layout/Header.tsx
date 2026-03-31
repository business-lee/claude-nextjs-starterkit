import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { UserMenu } from '@/components/common/UserMenu'
import { MobileMenu } from './MobileMenu'
import { useAuth } from '@/hooks/useAuth'

interface HeaderProps {
    className?: string
}

/**
 * 애플리케이션 헤더 컴포넌트
 * 데스크톱: 네비게이션 링크 + UserMenu + ThemeToggle
 * 모바일: 햄버거 메뉴 + ThemeToggle
 */
export const Header: React.FC<HeaderProps> = ({ className }) => {
    const { isAuthenticated } = useAuth()

    return (
        <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 ${className || ''}`}>
            <div className="w-full max-w-350 mx-auto px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 mr-8">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-sm font-bold text-primary-foreground">SK</span>
                        </div>
                        <span className="font-bold hidden sm:inline">StarterKit</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    isActive
                                        ? 'bg-accent text-accent-foreground'
                                        : 'text-foreground/70 hover:text-foreground'
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    isActive
                                        ? 'bg-accent text-accent-foreground'
                                        : 'text-foreground/70 hover:text-foreground'
                                }`
                            }
                        >
                            About
                        </NavLink>
                        {isAuthenticated && (
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-accent text-accent-foreground'
                                            : 'text-foreground/70 hover:text-foreground'
                                    }`
                                }
                            >
                                Dashboard
                            </NavLink>
                        )}
                    </nav>

                    {/* Right side controls */}
                    <div className="flex items-center gap-4 ml-auto">
                        {/* Desktop Login/UserMenu */}
                        <div className="hidden sm:flex items-center gap-2">
                            {isAuthenticated ? (
                                <UserMenu />
                            ) : (
                                <Button variant="default" size="sm" asChild>
                                    <Link to="/login">로그인</Link>
                                </Button>
                            )}
                        </div>

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Mobile Menu */}
                        <MobileMenu isAuthenticated={isAuthenticated} />
                    </div>
                </div>
            </div>
            <Separator className="m-0" />
        </header>
    )
}
