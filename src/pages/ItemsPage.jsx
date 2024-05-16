import { useParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../features/api/apiSlice";
import { useGetSubcategoriesQuery } from "../features/api/apiSlice";

function ItemsPage() {
  const { gender } = useParams();
  return (
    <div>
      <h1>Items Page: {gender}</h1>
    </div>
  );
}

export default ItemsPage;
