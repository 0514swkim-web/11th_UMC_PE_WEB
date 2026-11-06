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

// 백엔드 SignUpRequest, ApiResponse<MemberResponse>(record)와 같은 모양
interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

interface SignupResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    memberId: number;
    email: string;
    nickname: string;
  };
}

export type {
  CheckAvailabilityResponse,
  MemberRating,
  SignupRequest,
  SignupResponse,
};
