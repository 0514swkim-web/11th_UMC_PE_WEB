// 백엔드 NicknameCheckResponse·EmailCheckResponse, RatingResponse(record)와 같은 모양
interface CheckAvailabilityResponse {
  available: boolean;
}

interface MemberRating {
  ratingId: number;
  movieId: number;
  score: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export type { CheckAvailabilityResponse, MemberRating };
