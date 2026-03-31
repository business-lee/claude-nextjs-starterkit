import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/common/PageHeader'

/**
 * About 페이지
 * 기술 스택 및 프로젝트 정보를 소개
 */
export const AboutPage: React.FC = () => {
    const technologies = [
        { name: 'React', version: '19.1.8', category: 'UI Framework' },
        { name: 'TypeScript', version: '5.8.3', category: 'Language' },
        { name: 'Vite', version: '7.0.0', category: 'Build Tool' },
        { name: 'Tailwind CSS', version: '4.2.2', category: 'Styling' },
        { name: 'shadcn/ui', version: 'latest', category: 'Component Library' },
        { name: 'React Router', version: '7.13.2', category: 'Routing' },
        { name: 'React Hook Form', version: '7.72.0', category: 'Form Management' },
        { name: 'Zod', version: 'latest', category: 'Schema Validation' },
        { name: 'date-fns', version: 'latest', category: 'Date Utility' },
        { name: 'Sonner', version: 'latest', category: 'Toast Notifications' },
        { name: 'usehooks-ts', version: 'latest', category: 'React Hooks' },
        { name: 'lucide-react', version: '1.7.0', category: 'Icons' },
    ]

    const categories = [...new Set(technologies.map((t) => t.category))]

    return (
        <div className="py-8">
            <PageHeader
                title="About Starter Kit"
                description="현대적이고 확장 가능한 웹 애플리케이션을 빠르게 시작할 수 있도록 설계된 스타터킷입니다."
            />

            <div className="grid gap-8">
                {/* Introduction */}
                <Card>
                    <CardHeader>
                        <CardTitle>프로젝트 목표</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>
                            이 스타터킷은 어떤 웹 애플리케이션에도 필요한 핵심 기능들을 미리
                            구성해두었습니다:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>5계층 컴포넌트 구조 (Primitives → Features → Layout → Pages)</li>
                            <li>인증 시스템 (Context API + localStorage)</li>
                            <li>다크/라이트 모드 지원</li>
                            <li>반응형 레이아웃 (데스크톱/모바일)</li>
                            <li>react-hook-form + zod 기반 폼 관리</li>
                            <li>타입 안전한 라우팅</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Technology Stack */}
                <Card>
                    <CardHeader>
                        <CardTitle>기술 스택</CardTitle>
                        <CardDescription>
                            프로덕션 환경에 검증된 라이브러리 조합
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {categories.map((category) => (
                                <div key={category}>
                                    <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
                                        {category}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {technologies
                                            .filter((t) => t.category === category)
                                            .map((tech) => (
                                                <Badge key={tech.name} variant="secondary">
                                                    {tech.name}{' '}
                                                    <span className="ml-1 text-xs opacity-70">
                                                        {tech.version}
                                                    </span>
                                                </Badge>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Features */}
                <Card>
                    <CardHeader>
                        <CardTitle>주요 기능</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4">
                                <h4 className="font-semibold mb-2">컴포넌트 라이브러리</h4>
                                <p className="text-sm text-muted-foreground">
                                    shadcn/ui 기반의 아름다운 UI 컴포넌트
                                </p>
                            </div>
                            <div className="border rounded-lg p-4">
                                <h4 className="font-semibold mb-2">상태 관리</h4>
                                <p className="text-sm text-muted-foreground">
                                    Context API와 커스텀 훅을 활용한 간단한 상태 관리
                                </p>
                            </div>
                            <div className="border rounded-lg p-4">
                                <h4 className="font-semibold mb-2">폼 관리</h4>
                                <p className="text-sm text-muted-foreground">
                                    react-hook-form과 zod를 활용한 타입 안전한 폼 처리
                                </p>
                            </div>
                            <div className="border rounded-lg p-4">
                                <h4 className="font-semibold mb-2">라우팅</h4>
                                <p className="text-sm text-muted-foreground">
                                    React Router v7을 활용한 선언적 라우팅
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
