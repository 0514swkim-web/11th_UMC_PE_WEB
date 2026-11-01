import ky from "ky";
import { env } from "../config/env";

// 우리 Spring 서버(umc-web-be/movie). 다른 origin이라 서버의 CORS 허용이 필요함
export const umcClient = ky.create({
  baseUrl: `${env.umcApiBaseUrl}/`,
  // 로컬 서버가 꺼져 있을 때 재시도로 기다리지 않고 바로 오류를 보여 주기
  retry: 0,
});
