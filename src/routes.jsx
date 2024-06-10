import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ItemsPage from "./pages/ItemsPage";
import ItemDetailPage from "./pages/ItemDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "items",
        children: [
          { path: ":gender", element: <ItemsPage /> },
          { path: ":gender/:itemId", element: <ItemDetailPage /> },
        ],
      },
    ],
  },
]);

export default router;
