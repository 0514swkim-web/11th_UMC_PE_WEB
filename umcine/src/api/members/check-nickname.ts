import { umcClient } from "../umc-client";
import type { CheckAvailabilityResponse } from "./models";

function checkNickname(nickname: string) {
  return umcClient
    .get(`members/nickname/${encodeURIComponent(nickname)}`)
    .json<CheckAvailabilityResponse>();
}

export { checkNickname };
