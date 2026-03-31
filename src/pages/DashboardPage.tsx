import React from 'react'
import { BarChart3, Users, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/common/PageHeader'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'

/**
 * 대시보드 페이지 (보호된 라우트)
 * 인증된 사용자만 접근 가능
 */
export const DashboardPage: React.FC = () => {
    const { user } = useAuth()

    const handleShowToast = (): void => {
        toast.success(`안녕하세요, ${user?.name}님! 이것은 토스트 알림입니다.`)
    }

    const breadcrumbs = [{ label: 'Dashboard' }]

    const stats = [
        {
            title: '총 방문자',
            value: '12,543',
            description: '지난 30일',
            icon: <Users className="h-5 w-5" />,
        },
        {
            title: '매출',
            value: '₩2.4M',
            description: '지난 30일',
            icon: <TrendingUp className="h-5 w-5" />,
        },
        {
            title: '활성 사용자',
            value: '1,234',
            description: '지난 7일',
            icon: <BarChart3 className="h-5 w-5" />,
        },
    ]

    return (
        <div className="py-8 space-y-8">
            <PageHeader
                title={`${user?.name}님의 대시보드`}
                description="당신의 애플리케이션 통계 및 활동을 한눈에 확인하세요"
                breadcrumbs={breadcrumbs}
            />

            {/* User Info Card */}
            <Card>
                <CardHeader>
                    <CardTitle>사용자 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">이름</p>
                            <p className="font-semibold">{user?.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">이메일</p>
                            <p className="font-semibold">{user?.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">역할</p>
                            <div>
                                <Badge variant="default">{user?.role}</Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                {stat.icon}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Interactive Demo */}
            <Card>
                <CardHeader>
                    <CardTitle>기능 데모</CardTitle>
                    <CardDescription>스타터킷의 기능들을 체험해보세요</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <h4 className="font-semibold text-sm">토스트 알림</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                            아래 버튼을 클릭하면 Sonner 토스트가 표시됩니다.
                        </p>
                        <Button onClick={handleShowToast} variant="outline">
                            토스트 표시하기
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>최근 활동</CardTitle>
                    <CardDescription>당신의 최근 활동 내역</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { action: '로그인', time: '방금 전' },
                            { action: '프로필 업데이트', time: '2일 전' },
                            { action: '설정 변경', time: '1주일 전' },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                                <p className="text-sm">{item.action}</p>
                                <p className="text-xs text-muted-foreground">{item.time}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
