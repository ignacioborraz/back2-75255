import crypto from "crypto";
const { PERSISTENCE } = process.env;

class ProductsDTO {
  constructor(data) {
    if (PERSISTENCE !== "mongo") {
      this._id = crypto.randomBytes(12).toString("hex");
    }
    this.title = data.title;
    this.description = data.description;
    this.category = data.category || "Laptops";
    this.image =
      data.image ||
      "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-600nw-1552421075.jpg";
    this.price = data.price || 10;
    this.stock = data.stock || 10;
    this.onsale = data.onsale || false;
    this.owner_id = data.owner_id;
    if (PERSISTENCE !== "mongo") {
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}

export default ProductsDTO