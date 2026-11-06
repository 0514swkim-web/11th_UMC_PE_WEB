import { umcClient } from "../umc-client";
import type { SignupRequest, SignupResponse } from "./models";

function signup(body: SignupRequest) {
  return umcClient.post("members", { json: body }).json<SignupResponse>();
}

export { signup };
