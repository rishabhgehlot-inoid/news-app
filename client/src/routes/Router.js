import { lazy } from "react";
import { Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout.js";
import Login from "../views/ui/Login.jsx";
import SignUp from "../views/ui/Signup.jsx";
import News from "../views/ui/NewsList.jsx";
import DetailNews from "../views/ui/DetailNews.jsx";
import EditNews from "../views/ui/EditNews.jsx";
import Joint from "../views/ui/Joint.jsx";

const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const AddNews = lazy(() => import("../views/ui/AddNews.jsx"));
const ProtectedRouter = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to={"/auth/login"} />;
};
const ThemeRoutes = [
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "login", exact: true, element: <Login /> },
      { path: "signup", exact: true, element: <SignUp /> },
    ],
  },
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      {
        path: "/starter",
        exact: true,
        element: (
          <ProtectedRouter>
            <News />
          </ProtectedRouter>
        ),
      },
      {
        path: "/about",
        exact: true,
        element: (
          <ProtectedRouter>
            <About />
          </ProtectedRouter>
        ),
      },
      {
        path: "/alerts",
        exact: true,
        element: (
          <ProtectedRouter>
            <Alerts />
          </ProtectedRouter>
        ),
      },
      {
        path: "/badges",
        exact: true,
        element: (
          <ProtectedRouter>
            <Badges />
          </ProtectedRouter>
        ),
      },
      {
        path: "/buttons",
        exact: true,
        element: (
          <ProtectedRouter>
            <Buttons />
          </ProtectedRouter>
        ),
      },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      {
        path: "/add-news",
        exact: true,
        element: (
          <ProtectedRouter>
            <AddNews />
          </ProtectedRouter>
        ),
      },
      {
        path: "/news",
        exact: true,
        element: (
          <ProtectedRouter>
            <News />
          </ProtectedRouter>
        ),
      },
      {
        path: "/news/:newsId",
        exact: true,
        element: (
          <ProtectedRouter>
            <DetailNews />
          </ProtectedRouter>
        ),
      },
      {
        path: "/news/update/:newsId",
        exact: true,
        element: (
          <ProtectedRouter>
            <EditNews />
          </ProtectedRouter>
        ),
      },
      {
        path: "/joint",
        exact: true,
        element: (
          <ProtectedRouter>
            <Joint />
          </ProtectedRouter>
        ),
      },
    ],
  },
];

export default ThemeRoutes;
