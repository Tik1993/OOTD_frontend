import { useState } from "react";
import { Link } from "react-router-dom";

function DropdownList({ category, itemList, handleCat, handleSub }) {
  const [isExpand, setIsExpand] = useState(false);
  const listItems = (
    <div className=" bg-white border rounded-lg shadow   ">
      <ul className="py-2 text-sm ">
        {itemList.map((s) => {
          return (
            <li
              key={s.name}
              className="mb-1 text-gray-800 hover:bg-gray-100"
              onClick={() => handleSub({ subcategory: s.name, id: s._id })}
            >
              <button>{s.name}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
  return (
    <>
      <div>
        <button
          className=""
          onClick={() => {
            setIsExpand(!isExpand);
            handleCat({ category: category.name, id: category._id });
            handleSub("");
          }}
        >
          {category.name}
        </button>
        {isExpand && listItems}
      </div>
    </>
  );
}

export default DropdownList;
