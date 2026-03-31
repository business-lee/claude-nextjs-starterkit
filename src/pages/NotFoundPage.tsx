import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

/**
 * 404 Not Found 페이지
 */
export const NotFoundPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="text-center">
                <AlertCircle className="h-24 w-24 text-destructive mx-auto mb-6 opacity-50" />
                <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
                    404
                </h1>
                <p className="text-xl text-muted-foreground mb-2">페이지를 찾을 수 없습니다</p>
                <p className="text-muted-foreground mb-8">
                    요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
                </p>
                <Button asChild>
                    <Link to="/">홈으로 돌아가기</Link>
                </Button>
            </div>
        </div>
    )
}
