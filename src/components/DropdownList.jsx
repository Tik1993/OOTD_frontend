import { useState } from "react";
import { Link } from "react-router-dom";

function DropdownList({ category, itemList, handleCat, handleSub }) {
  const [isExpand, setIsExpand] = useState(false);
  const listItems = (
    <div className="w-44 bg-white border rounded-lg shadow   ">
      <ul className="py-2 text-sm text-gray-700">
        {itemList.map((s) => {
          return (
            <li
              key={s.name}
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
          className="bg-blue-500"
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
