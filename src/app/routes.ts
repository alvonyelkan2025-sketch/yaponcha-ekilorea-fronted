import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Contest } from "./pages/Contest";
import { Token } from "./pages/Token";
import { Profile } from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "shop",
        Component: Shop,
      },
      {
        path: "contest",
        Component: Contest,
      },
      {
        path: "token",
        Component: Token,
      },
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
]);