import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../components/layout/header";
import { Footer } from "../components/layout/footer";

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-[1200px] px-6 py-20 text-center text-gray-500">
      페이지를 찾을 수 없어요.
    </div>
  ),
});