import { umcClient } from "../umc-client";
import type { CheckAvailabilityResponse } from "./models";

function checkEmail(email: string) {
  return umcClient
    .get(`members/email/${encodeURIComponent(email)}`)
    .json<CheckAvailabilityResponse>();
}

export { checkEmail };
