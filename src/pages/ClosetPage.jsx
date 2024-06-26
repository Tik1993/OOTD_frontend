import { useSelector } from "react-redux";
import {
  useGetUserDetailQuery,
  useGetItemsQuery,
} from "../features/api/apiSlice";
import { selectCurrentUserid } from "../features/auth/authSlice";
import getImageUrl from "../utility/getImageUrl";
import { useEffect } from "react";

function ClosetPage() {
  const userId = useSelector(selectCurrentUserid);
  const {
    data: userDetail,
    error,
    isLoading,
    isSuccess: userIsSuccess,
    refetch,
  } = useGetUserDetailQuery(userId, {
    skip: !userId,
  });

  const {
    data: items,
    isLoading: itemIsLoading,
    isSuccess: itemIsSuccess,
  } = useGetItemsQuery();

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId]);

  if (!userId) {
    return <h1>Please login to view your closet</h1>;
  }

  if (isLoading || itemIsLoading) {
    return <h1>Loading...</h1>;
  }

  function ClosetItem({ closetItem }) {
    console.log(closetItem);
    const { name, category, subcategory, color, size, quantity } = closetItem;
    let imageUrl = getImageUrl(name, category, color, subcategory);
    return (
      <div className="m-auto p-4 border min-h-[700px] flex flex-col justify-between">
        <h2 className="mb-2 text-2xl font-bold">{name}</h2>
        <p>Category: {category.name}</p>
        <p>Subcategory: {subcategory ? subcategory.name : ""}</p>
        <p>Gender: {category.gender}</p>
        <p>Color: {color}</p>
        <p>Size: {size}</p>
        <p>Quantity: {quantity}</p>
        <img src={imageUrl} className="w-80 h-96" />
      </div>
    );
  }
  function ClosetGrid({ currentItems, items }) {
    console.log(currentItems);
    console.log(items);

    return (
      <div className="m-3 p-3">
        <h1 className="mb-2 text-4xl font-bold ">Your Closet: </h1>
        <div className="grid grid-cols-4 gap-4">
          {currentItems.map((item) => {
            const itemDetail = items.find((i) => i._id === item.itemId);
            console.log(itemDetail);

            const closetItem = {
              name: itemDetail.name,
              category: itemDetail.category,
              subcategory: itemDetail.subcategory,
              color: item.color,
              size: item.size,
              quantity: item.quantity,
            };
            return <ClosetItem key={item._id} closetItem={closetItem} />;
          })}
        </div>
      </div>
    );
  }

  if (userIsSuccess && itemIsSuccess) {
    const { username, currentItems } = userDetail;

    return (
      <div>
        <h1>Welcome back, {username}!</h1>
        <ClosetGrid currentItems={currentItems} items={items} />
      </div>
    );
  }
}

export default ClosetPage;
