import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Code2, Zap, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'

/**
 * 홈페이지
 * 스타터킷 소개 및 컴포넌트 쇼케이스
 */
export const HomePage: React.FC = () => {
    const { isAuthenticated } = useAuth()

    const features = [
        {
            icon: <Code2 className="h-6 w-6" />,
            title: '모던한 코드 구조',
            description: '5계층 컴포넌트 아키텍처로 유지보수가 쉬운 구조',
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: '빠른 개발 속도',
            description: 'shadcn/ui와 Tailwind CSS로 빠른 UI 개발',
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: '타입 안전',
            description: 'TypeScript strict mode로 런타임 에러 방지',
        },
    ]

    return (
        <div className="space-y-12 py-8">
            {/* Hero Section */}
            <div className="text-center space-y-6">
                <div className="inline-block">
                    <Badge>Welcome to Frontend Starter Kit</Badge>
                </div>
                <h1 className="text-5xl font-bold tracking-tight text-foreground">
                    빠르게 시작하는
                    <br />
                    <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        웹 개발
                    </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    React 19, TypeScript, Tailwind CSS와 shadcn/ui로 구성된 프로덕션급 스타터킷.
                    모든 웹 애플리케이션에 필요한 핵심 기능을 미리 준비했습니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                        <Link to="/about">
                            시작하기
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    {!isAuthenticated && (
                        <Button size="lg" variant="outline" asChild>
                            <Link to="/login">로그인</Link>
                        </Button>
                    )}
                    {isAuthenticated && (
                        <Button size="lg" variant="outline" asChild>
                            <Link to="/dashboard">대시보드</Link>
                        </Button>
                    )}
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <Card key={index} className="border">
                        <CardHeader>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    {feature.icon}
                                </div>
                            </div>
                            <CardTitle className="text-lg">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Tech Stack Preview */}
            <Card>
                <CardHeader>
                    <CardTitle>기술 스택</CardTitle>
                    <CardDescription>프로덕션 환경에 검증된 라이브러리들</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            'React 19',
                            'TypeScript',
                            'Vite',
                            'Tailwind CSS',
                            'shadcn/ui',
                            'React Router',
                            'React Hook Form',
                            'Zod',
                        ].map((tech) => (
                            <div
                                key={tech}
                                className="p-4 rounded-lg bg-accent/50 text-center text-sm font-medium"
                            >
                                {tech}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* CTA Section */}
            <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                    <CardTitle>준비되셨나요?</CardTitle>
                    <CardDescription>지금 바로 프로젝트를 시작해보세요</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="default" asChild>
                            <Link to="/about">자세히 알아보기</Link>
                        </Button>
                        {!isAuthenticated && (
                            <Button variant="outline" asChild>
                                <Link to="/login">로그인하기</Link>
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
