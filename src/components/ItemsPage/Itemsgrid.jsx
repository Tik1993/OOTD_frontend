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
      <h1 className="mb-2 text-xl font-bold">
        Current Category:
        <br />
        <span className="text-lg text-slate-700">
          {currentCategory["category"]}
        </span>
      </h1>
      <h1 className="mb-2 text-xl font-bold ">
        Current Subcategory:
        <br />
        <span className="text-lg text-slate-700">
          {currentSubcategory["subcategory"]}
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {itemsgrid}
      </div>
    </>
  );
}

export default Itemsgrid;
