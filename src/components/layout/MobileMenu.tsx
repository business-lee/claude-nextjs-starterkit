import React from 'react'
import { NavLink } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

interface MobileMenuProps {
    isAuthenticated: boolean
}

/**
 * 모바일 환경용 메뉴 (Sheet 컴포넌트 사용)
 */
export const MobileMenu: React.FC<MobileMenuProps> = ({ isAuthenticated }) => {
    const [open, setOpen] = React.useState(false)

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        ...(isAuthenticated ? [{ label: 'Dashboard', href: '/dashboard' }] : []),
    ]

    const handleNavClick = (): void => {
        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">메뉴 열기</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
                <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            onClick={handleNavClick}
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-lg transition-colors ${
                                    isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-foreground hover:bg-accent'
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    )
}
