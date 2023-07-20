import React, { lazy, Suspense } from "react";
import Loader from "components/Loader";
import MainLayout from "../layout/MainLayout";
import AuthGuard from "utils/authguard";

const HomePage = lazy(() => import("../views/Home"));
const MyYeSpacePage = lazy(() => import("../views/MyYeSpace"));
const ExplorePage = lazy(() => import("../views/Explore"));
const PublicPage = lazy(() => import("../views/Public"));
const ErrorPage = lazy(() => import("../views/Error"));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: (
        <Suspense fallback={<Loader />}>
          <HomePage />
        </Suspense>
      ),
    },
    {
      path: "/explore",
      element: (
        <Suspense fallback={<Loader />}>
          <AuthGuard>
            <ExplorePage />
          </AuthGuard>
        </Suspense>
      ),
    },
    {
      path: "/myyespace",
      element: (
        <Suspense fallback={<Loader />}>
          <AuthGuard>
            <MyYeSpacePage />
          </AuthGuard>
        </Suspense>
      ),
    },
    {
      path: "/public",
      element: (
        <Suspense fallback={<Loader />}>
          <PublicPage />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<Loader />}>
          <ErrorPage />
        </Suspense>
      ),
    },
  ],
};

export default MainRoutes;
