import { getMovieDetail } from "../../../../api/movies/get-movie-detail";

// Route Handler: Next.js 안에 만든 작은 백엔드 API (GET /api/movies/{movieId})
// 브라우저(내 정보 즐겨찾기 목록, 회원 API 화면)는 TMDB 대신 여기로 요청
// → TMDB 토큰은 서버에만 있고, 응답은 TMDB 상세와 같은 모양
export async function GET(
  _request: Request,
  { params }: RouteContext<"/api/movies/[movieId]">,
) {
  const { movieId } = await params;
  const parsedMovieId = Number(movieId);

  if (!Number.isInteger(parsedMovieId) || parsedMovieId <= 0) {
    return Response.json({ message: "올바르지 않은 영화 번호예요." }, { status: 400 });
  }

  try {
    const movie = await getMovieDetail(parsedMovieId);
    if (!movie) {
      return Response.json({ message: "영화를 찾을 수 없어요." }, { status: 404 });
    }
    return Response.json(movie);
  } catch {
    return Response.json({ message: "영화 정보를 불러오지 못했어요." }, { status: 502 });
  }
}
