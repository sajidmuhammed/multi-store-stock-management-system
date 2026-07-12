import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

interface Props {
  children: ReactNode;
}

export default function Providers({
  children,
}: Props) {
  return (
    <BrowserRouter>
      <AuthProvider>
        {children}
      </AuthProvider>
    </BrowserRouter>
  );
}