import React from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'

// 로그인 폼 스키마
const loginSchema = z.object({
    email: z.string().email('유효한 이메일을 입력하세요'),
    password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
})

type LoginFormValues = z.infer<typeof loginSchema>

/**
 * 로그인 페이지
 * react-hook-form + zod + shadcn Form을 활용한 폼 예제
 */
export const LoginPage: React.FC = () => {
    const navigate = useNavigate()
    const { isAuthenticated, login, isLoading } = useAuth()

    // 이미 인증된 경우 대시보드로 리다이렉트
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (values: LoginFormValues): Promise<void> => {
        try {
            await login(values.email, values.password)
            toast.success('로그인 성공! 대시보드로 이동합니다.')
            navigate('/dashboard')
        } catch (error) {
            const message = error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다'
            toast.error(message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">로그인</CardTitle>
                    <CardDescription>계정에 로그인하여 대시보드에 접근하세요</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control as any}
                                name="email"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>이메일</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="example@gmail.com"
                                                type="email"
                                                autoComplete="email"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control as any}
                                name="password"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>비밀번호</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="8자 이상의 비밀번호"
                                                type="password"
                                                autoComplete="current-password"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? '로그인 중...' : '로그인'}
                            </Button>
                        </form>
                    </Form>

                    {/* Demo Info */}
                    <div className="mt-6 p-4 bg-accent/50 rounded-lg">
                        <p className="text-xs font-semibold mb-2">테스트 계정:</p>
                        <p className="text-xs text-muted-foreground">
                            이메일: <span className="font-mono">test@example.com</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                            비밀번호: <span className="font-mono">password123</span>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
