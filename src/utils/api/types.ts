/**
 * API 응답 및 에러 타입 정의
 */

/**
 * 성공 응답 형식
 * @template T - 응답 데이터 타입
 */
export interface ApiResponse<T> {
	status: number;
	data: T;
	timestamp: string;
}

/**
 * 에러 응답 데이터 형식
 */
export interface ErrorData {
	errorCode: string;
	message: string;
}

/**
 * 에러 응답 형식
 */
export interface ErrorResponse {
	status: number;
	data: ErrorData;
	timestamp: string;
}

/**
 * API 요청 옵션
 */
export interface ApiRequestOptions {
	/** 요청 헤더 */
	headers?: Record<string, string>;
	/** 쿼리 파라미터 */
	searchParams?: Record<string, string | number | boolean>;
	/** 요청 타임아웃 (ms) */
	timeout?: number;
}
