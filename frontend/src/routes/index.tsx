import { createBrowserRouter, Navigate } from "react-router-dom";
import { PublicLayout } from "@/components/layout/public-layout";
import { AdminLayout } from "@/components/layout/admin-layout";
import { RequireAdmin } from "./guards";
import { LandingPage } from "@/features/catalog/landing-page";
import { CatalogPage } from "@/features/catalog/catalog-page";
import { ServiceDetailPage } from "@/features/catalog/service-detail-page";
import { LoginPage } from "@/features/auth/login-page";
import { AdminServicesPage } from "@/features/admin/admin-services-page";
import { AdminCommentsPage } from "@/features/admin/admin-comments-page";
import { NotFoundPage } from "@/features/misc/not-found-page";
import { AboutPage } from "@/features/misc/about-page";
import { ContactPage } from "@/features/misc/contact-page";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/services", element: <CatalogPage /> },
      { path: "/services/:slug", element: <ServiceDetailPage /> },
      { path: "/a-propos", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/connexion", element: <LoginPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    element: <RequireAdmin />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "/admin", element: <Navigate to="/admin/services" replace /> },
          { path: "/admin/services", element: <AdminServicesPage /> },
          { path: "/admin/avis", element: <AdminCommentsPage /> },
        ],
      },
    ],
  },
]);
