import { RouterProvider } from "react-router-dom";

import { router } from "./AppRoutes";

export default function App() {
  return <RouterProvider router={router} />;
}
