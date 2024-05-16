import { useGetCategoriesQuery } from "../features/api/apiSlice";
import { useGetSubcategoriesQuery } from "../features/api/apiSlice";

function NavBar() {
  const {
    data: categories,
    isLoading: categoiesIsLoading,
    isSuccess: categoriesIsSuccess,
    isError: categoriesIsError,
    error: categoriesError,
  } = useGetCategoriesQuery();
  const {
    data: subcategories,
    isLoading: subcategoriesIsLoading,
    isSuccess: subcategoriesIsSuccess,
    isError: subcategoriesIsError,
    error: subcategoriesError,
  } = useGetSubcategoriesQuery();
  console.log(subcategories);
  console.log(categories);
  return (
    <>
      <h1>NavBar</h1>
    </>
  );
}

export default NavBar;
