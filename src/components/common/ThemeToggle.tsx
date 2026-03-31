import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLocalStorage } from 'usehooks-ts'

interface ThemeToggleProps {
    className?: string
}

/**
 * 다크/라이트 모드 토글 버튼
 * localStorage에 테마 상태를 저장해 새로고침 후에도 유지
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
    const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light')

    React.useEffect(() => {
        const html = document.documentElement
        if (theme === 'dark') {
            html.classList.add('dark')
        } else {
            html.classList.remove('dark')
        }
    }, [theme])

    const toggleTheme = (): void => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={className}
            aria-label="테마 전환"
        >
            {theme === 'light' ? (
                <Moon className="h-4 w-4" />
            ) : (
                <Sun className="h-4 w-4" />
            )}
        </Button>
    )
}
