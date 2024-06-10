export default function getImageUrl(name, category, color, subcategory = null) {
  let imageUrl =
    "https://storage.googleapis.com/ootd_image/" +
    category.gender +
    "/" +
    category.name.replace(/ /g, "%20").replace(/&/g, "%26");
  if (subcategory) {
    imageUrl += "/" + subcategory.name;
  }
  imageUrl +=
    "/" +
    name.replace(/ /g, "_").replace(/\//g, "&") +
    "_" +
    color.replace(/ /g, "_").replace(/\//g, "&") +
    ".jpg";

  return imageUrl;
}
