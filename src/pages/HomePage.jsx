import { Link } from "react-router-dom";
import { useGetLatestItemsQuery } from "../features/api/apiSlice";

import getImageUrl from "../utility/getImageUrl";

function Homepage() {
  const {
    data: items,
    isLoading: itemIsLoading,
    isSuccess: itemIsSuccess,
  } = useGetLatestItemsQuery();

  if (itemIsLoading) return <h1>Loading...</h1>;
  // if (error) return <h1>Error: {error.data.message}</h1>;

  function Card({ item }) {
    const { name, category, subcategory, color_available } = item;
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
  let lastestItems;
  if (itemIsSuccess) {
    // console.log(items);
    let lastestItemsGrid = items.map((item) => (
      <Card key={item.name} item={item} />
    ));
    lastestItems = (
      <>
        <h1 className="text-2xl font-bold">Welcome to OOTD</h1>
        <h2 className="text-lg font-bold">Check out our latest products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {lastestItemsGrid}
        </div>
      </>
    );
  }

  let content = <div>{lastestItems && <section>{lastestItems}</section>}</div>;

  return <>{content}</>;
}

export default Homepage;
