import Card from "./Card";

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

export default Itemsgrid;
