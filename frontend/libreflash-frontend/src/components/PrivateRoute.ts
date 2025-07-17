import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

type PrivateRouteProps = {
  children: React.ReactElement;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const location = useLocation();
  console.log("Logged in?", isLoggedIn());

  if (!isLoggedIn()) {
    return React.createElement(Navigate, {
      to: "/login",
      replace: true,
      state: { from: location.pathname },
    });
  }

  return children;
}
