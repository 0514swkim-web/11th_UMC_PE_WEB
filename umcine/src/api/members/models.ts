// 백엔드 CheckResponseDto, RatingResponseDto와 같은 모양
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
