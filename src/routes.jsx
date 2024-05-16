import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ItemsPage from "./pages/ItemsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "items",
        children: [{ path: ":gender", element: <ItemsPage /> }],
      },
    ],
  },
]);

export default router;
