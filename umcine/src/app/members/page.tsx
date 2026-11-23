import type { Metadata } from "next";
import { MemberApiPage } from "../../screens/members/member-api-page";

export const metadata: Metadata = {
  title: "회원 API",
};

export default function MembersRoutePage() {
  return <MemberApiPage />;
}
