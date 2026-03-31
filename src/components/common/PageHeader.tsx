import React from 'react'
import { Link } from 'react-router-dom'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

interface BreadcrumbItem {
    label: string
    href?: string
}

interface PageHeaderProps {
    title: string
    description?: string
    breadcrumbs?: BreadcrumbItem[]
    className?: string
}

/**
 * 페이지 제목과 설명, Breadcrumb을 포함한 헤더 컴포넌트
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    description,
    breadcrumbs,
    className,
}) => {
    return (
        <div className={`mb-8 ${className || ''}`}>
            {breadcrumbs && breadcrumbs.length > 0 && (
                <div className="mb-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbs.map((item, index) => (
                                <React.Fragment key={index}>
                                    <BreadcrumbItem>
                                        {item.href ? (
                                            <BreadcrumbLink asChild>
                                                <Link to={item.href}>{item.label}</Link>
                                            </BreadcrumbLink>
                                        ) : (
                                            <span className="text-foreground font-semibold">
                                                {item.label}
                                            </span>
                                        )}
                                    </BreadcrumbItem>
                                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                                </React.Fragment>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            )}
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">{title}</h1>
            {description && <p className="text-lg text-muted-foreground">{description}</p>}
        </div>
    )
}
