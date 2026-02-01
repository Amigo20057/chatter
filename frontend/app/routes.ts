import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "layouts/main.layout.tsx", [index("routes/home.tsx")]),
  route("/auth", "layouts/auth.layout.tsx", [
    route("login", "routes/login.tsx"),
    route("register", "routes/register.tsx"),
  ]),
  // route("*", "routes/notFound.tsx"),
] satisfies RouteConfig;
