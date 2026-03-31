import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Settings, User as UserIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/useAuth'

interface UserMenuProps {
    className?: string
}

/**
 * 사용자 정보와 로그아웃을 포함한 드롭다운 메뉴
 * useAuth 훅으로 사용자 정보 및 로그아웃 함수 접근
 */
export const UserMenu: React.FC<UserMenuProps> = ({ className }) => {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    if (!user) return null

    const handleLogout = (): void => {
        logout()
        navigate('/login')
    }

    // 사용자명의 첫 글자를 Avatar Fallback으로 사용
    const initials = user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={`cursor-pointer outline-none ${className || ''}`}>
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>프로필</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>설정</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>로그아웃</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
