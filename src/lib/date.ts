import { format, formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

/**
 * 날짜를 지정된 형식으로 포맷
 * @param date - Date 객체
 * @param pattern - 포맷 패턴 (기본값: 'yyyy.MM.dd')
 * @returns 포맷된 날짜 문자열
 */
export const formatDate = (date: Date, pattern = 'yyyy.MM.dd'): string => {
    return format(date, pattern, { locale: ko })
}

/**
 * 날짜를 상대 시간으로 포맷 (예: '3시간 전')
 * @param date - Date 객체
 * @returns 상대 시간 문자열
 */
export const formatRelativeTime = (date: Date): string => {
    return formatDistanceToNow(date, { addSuffix: true, locale: ko })
}

/**
 * 두 날짜 사이의 일수 계산
 * @param from - 시작 날짜
 * @param to - 종료 날짜
 * @returns 일수 차이
 */
export const getDaysDifference = (from: Date, to: Date): number => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000
    return Math.floor((to.getTime() - from.getTime()) / millisecondsPerDay)
}
