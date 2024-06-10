import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetItemDeatilQuery } from "../features/api/apiSlice";
import getImageUrl from "../utility/getImageUrl";

function ItemDetailPage() {
  const { itemId } = useParams();
  console.log(itemId);
  const { data: item, isLoading, isSuccess } = useGetItemDeatilQuery(itemId);
  const [color, setColor] = useState("");
  let content;

  useEffect(() => {
    if (isSuccess) {
      setColor(item.color_available[0]);
    }
  }, [item, isSuccess]);
  if (isSuccess) {
    console.log(item);
    let imageUrl = getImageUrl(
      item.name,
      item.category,
      color,
      item.subcategory
    );
    content = (
      <div className="flex p-5 bg-gray-50">
        <div className="w-2/5">
          <h1>Image</h1>
          <img src={imageUrl} className="w-80 h-96" />
        </div>
        <div className="flex flex-col w-3/5">
          <h1 className="text-3xl font-bold mb-3">{item.name}</h1>
          <h1 className="text-2xl font-bold mb-2">C$ {item.price}</h1>
          <div className="flex flex-col">
            <h1 className="text-2xl">Color Available: </h1>
            <p className="text-xl">
              <span className="font-bold">Color</span> {color}
            </p>
            <ul className="flex flex-wrap">
              {item.color_available.map((color) => (
                <li
                  key={color}
                  onClick={() => setColor(color)}
                  className="p-2 m-1 bg-gray-200 border-2 border-gray-700 rounded-md cursor-pointer"
                >
                  {color}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl">Size Available</h1>
            <ul className="flex flex-wrap">
              {item.size_available.map((size) => (
                <li
                  key={size}
                  className="p-2 m-1 bg-gray-200 border-2 border-gray-700 rounded-md"
                >
                  {size}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return content;
}

export default ItemDetailPage;
