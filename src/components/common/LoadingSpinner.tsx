import { Skeleton } from '@/components/ui/skeleton'

interface LoadingSpinnerProps {
    message?: string
}

/**
 * 로딩 상태를 표시하는 컴포넌트
 * Skeleton을 활용한 로딩 상태
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = '로딩 중...' }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <div className="flex gap-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-12 w-12 rounded-full" />
            </div>
            <p className="text-sm text-muted-foreground">{message}</p>
        </div>
    )
}
