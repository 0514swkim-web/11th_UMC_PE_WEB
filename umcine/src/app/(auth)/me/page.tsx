import type { Metadata } from "next";
import { Suspense } from "react";
import { MyInfoPage } from "../../../screens/me/my-info-page";
import { parsePage } from "../../../utils/parse-page";

export const metadata: Metadata = {
  title: "내 정보",
};

export default function MyInfoRoutePage({ searchParams }: PageProps<"/me">) {
  return (
    <Suspense
      fallback={
        <p className="py-32 text-center text-sm text-gray-500">
          내 정보를 불러오는 중이에요.
        </p>
      }
    >
      <MyInfoScreen searchParams={searchParams} />
    </Suspense>
  );
}

async function MyInfoScreen({
  searchParams,
}: Pick<PageProps<"/me">, "searchParams">) {
  const { page } = await searchParams;
  return <MyInfoPage page={parsePage(page)} />;
}
