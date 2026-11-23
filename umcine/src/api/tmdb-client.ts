import "server-only";
import ky from "ky";
import { serverEnv } from "../config/server-env";

// TMDB 요청은 서버(Server Component, Route Handler)에서만 보냄
export const tmdbClient = ky.create({
  baseUrl: `${serverEnv.tmdbApiBaseUrl}/`,
  headers: {
    Authorization: `Bearer ${serverEnv.tmdbAccessToken}`,
  },
});
