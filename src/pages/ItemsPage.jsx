import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../features/api/apiSlice";
import { useGetSubcategoriesQuery } from "../features/api/apiSlice";
import { useGetItemsQuery } from "../features/api/apiSlice";
import DropdownList from "../components/DropdownList";
import getImageUrl from "../utility/getImageUrl";

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
  if (catIsLoading || subIsLoading) {
    content = <div>Loading...</div>;
  }

  function Card({ item }) {
    const { name, category, subcategory, color_available } = item;
    // let imageUrl =
    //   "https://storage.googleapis.com/ootd_image/" +
    //   category.gender +
    //   "/" +
    //   category.name.replace(/ /g, "%20").replace(/&/g, "%26");
    // if (subcategory) {
    //   imageUrl += "/" + subcategory.name;
    // }
    // imageUrl +=
    //   "/" +
    //   name.replace(/ /g, "_").replace(/\//g, "&") +
    //   "_" +
    //   color_available[0].replace(/ /g, "_").replace(/\//g, "&") +
    //   ".jpg";
    let imageUrl = getImageUrl(name, category, color_available[0], subcategory);

    return (
      <>
        <Link to={`/items/${category.gender}/${item._id}`}>
          <div>
            <h1>{item.name}</h1>
            <img src={imageUrl} className="w-80 h-96" />
          </div>
        </Link>
      </>
    );
  }
  function Itemsgrid({ currentCategory, currentSubcategory, items }) {
    let itemsList;
    if (currentSubcategory["subcategory"]) {
      itemsList = items.filter(
        (item) =>
          item.subcategory && item.subcategory._id === currentSubcategory.id
      );
    } else {
      itemsList = items.filter(
        (item) => item.category && item.category._id === currentCategory.id
      );
    }
    let itemsgrid;
    itemsgrid = itemsList.map((item) => <Card key={item.name} item={item} />);
    return (
      <>
        <h1>Current Category:{currentCategory["category"]}</h1>
        <h1>Current Subcategory:{currentSubcategory["subcategory"]}</h1>
        <div className="grid grid-cols-4 gap-4">{itemsgrid}</div>
      </>
    );
  }

  if (catIsSuccess && subIsSuccess && itemIsSuccess) {
    // console.log(items);
    const categoriesList = categories.filter(
      (category) => category.gender == gender
    );
    content = (
      <div className="flex justify-between p-3 bg-gray-50">
        <div className="w-1/5">
          {/* sidebar */}
          <aside className="h-screen ">
            <div className="h-full px-3 py-4 ">
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
                      className="flex items-center text-gray-800 hover:bg-gray-100"
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
        <div className="w-4/5">
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
