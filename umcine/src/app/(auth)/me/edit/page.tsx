import type { Metadata } from "next";
import { MyInfoEditPage } from "../../../../screens/me/my-info-edit-page";

export const metadata: Metadata = {
  title: "내 정보 수정",
};

export default function MyInfoEditRoutePage() {
  return <MyInfoEditPage />;
}
