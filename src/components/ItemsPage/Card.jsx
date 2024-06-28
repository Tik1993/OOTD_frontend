import { Link } from "react-router-dom";
import getImageUrl from "../../utility/getImageUrl";

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

export default Card;
