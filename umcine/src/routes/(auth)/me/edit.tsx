import { createFileRoute } from "@tanstack/react-router";
import { MyInfoEditPage } from "../../../pages/me/my-info-edit-page";

export const Route = createFileRoute("/(auth)/me/edit")({ component: MyInfoEditPage });
