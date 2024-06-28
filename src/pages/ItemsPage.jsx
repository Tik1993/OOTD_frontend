import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../features/api/apiSlice";
import { useGetSubcategoriesQuery } from "../features/api/apiSlice";
import { useGetItemsQuery } from "../features/api/apiSlice";
import DropdownList from "../components/ItemsPage/DropdownList";
import Itemsgrid from "../components/ItemsPage/Itemsgrid";

function ItemsPage() {
  const {
    data: categories,
    isLoading: catIsLoading,
    isSuccess: catIsSuccess,
  } = useGetCategoriesQuery();
  const {
    data: subcategories,
    isLoading: subIsLoading,
    isSuccess: subIsSuccess,
  } = useGetSubcategoriesQuery();
  const {
    data: items,
    isLoading: itemIsLoading,
    isSuccess: itemIsSuccess,
  } = useGetItemsQuery();

  const { gender } = useParams();

  const [currentCategory, setCurrentCategory] = useState({
    category: "",
    id: "",
  });
  const [currentSubcategory, setCurrentSubcategory] = useState({
    subcategory: "",
    id: "",
  });

  let content;

  const [isExpand, setIsExpand] = useState(false);

  const toggleSidebar = () => {
    setIsExpand(!isExpand);
  };

  // content when loading
  if (catIsLoading || subIsLoading) {
    content = <div>Loading...</div>;
  }

  // content when success
  if (catIsSuccess && subIsSuccess && itemIsSuccess) {
    // console.log(items);
    const categoriesList = categories.filter(
      (category) => category.gender == gender
    );
    content = (
      <div className="p-3 bg-gray-50 flex flex-col md:flex-row justify-between ">
        <div className="md:w-1/5 px-3 py-4">
          {/* sidebar */}
          <button className="md:hidden" onClick={toggleSidebar}>
            {" "}
            <span>Click to choose category:</span>
          </button>
          <aside
            className={`${isExpand ? "block" : "hidden"} md:block md:h-screen`}
          >
            <div className="md:h-full  ">
              <ul className="space-y-2 font-medium">
                {categoriesList.map((category) => {
                  let subcategoriesList = subcategories.filter(
                    (sub) => sub.category._id === category._id
                  );
                  let listContent;
                  if (subcategoriesList.length != 0) {
                    listContent = (
                      <>
                        <DropdownList
                          category={category}
                          itemList={subcategoriesList}
                          handleCat={setCurrentCategory}
                          handleSub={setCurrentSubcategory}
                        />
                      </>
                    );
                  } else {
                    listContent = (
                      <button
                        className="text-left"
                        onClick={() => {
                          setCurrentCategory({
                            category: category.name,
                            id: category._id,
                          });
                          setCurrentSubcategory({
                            subcategory: "",
                            id: "",
                          });
                        }}
                      >
                        {category.name}
                      </button>
                    );
                  }

                  return (
                    <li
                      key={category.name}
                      className="border-b-4 text-gray-800 hover:bg-gray-100"
                    >
                      {listContent}
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
        {/* Item grid */}
        <div className="flex-1 px-3 py-4">
          <Itemsgrid
            currentCategory={currentCategory}
            currentSubcategory={currentSubcategory}
            items={items}
          />
        </div>
      </div>
    );
  }

  return content;
}

export default ItemsPage;
