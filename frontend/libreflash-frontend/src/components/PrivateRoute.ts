import type { ReactNode } from "react";
import * as React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

interface Props {
  children: ReactNode;
}

export default function PrivateRoute({ children }: Props): React.ReactElement {
  if (!isLoggedIn()) {
    return React.createElement(Navigate, { to: "/login", replace: true });
  }
  return React.createElement(React.Fragment, null, children);
}
