import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({ component: RootShell });

function RootShell() {
  return <Outlet />;
}
