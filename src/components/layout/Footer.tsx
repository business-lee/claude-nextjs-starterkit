import React from 'react'
import { Separator } from '@/components/ui/separator'

interface FooterProps {
    className?: string
}

/**
 * 애플리케이션 푸터 컴포넌트
 */
export const Footer: React.FC<FooterProps> = ({ className }) => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className={`mt-auto ${className || ''}`}>
            <Separator className="mb-6" />
            <div className="w-full max-w-350 mx-auto px-6 py-6">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="text-center text-sm text-muted-foreground md:text-left">
                        <p>© {currentYear} Frontend Starter Kit. All rights reserved.</p>
                    </div>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <a
                            href="#"
                            className="hover:text-foreground transition-colors"
                        >
                            Privacy
                        </a>
                        <a
                            href="#"
                            className="hover:text-foreground transition-colors"
                        >
                            Terms
                        </a>
                        <a
                            href="#"
                            className="hover:text-foreground transition-colors"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
