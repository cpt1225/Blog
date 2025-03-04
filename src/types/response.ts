import { NextResponse } from "next/server";


type ResponseData = {
  status?: number;
  message: string;
  data?: unknown;
}

export function errorResponse(error: ResponseData): NextResponse {
  const { status,message, data } = error;
  return NextResponse.json({
    status: status || 400,
    message,
    data: data || null,
  });
}

export function successResponse(success: ResponseData): NextResponse {
  const { status,message, data } = success;
  return NextResponse.json({
    status: status || 200,
    message,
    data: data || null,
  });
  
}