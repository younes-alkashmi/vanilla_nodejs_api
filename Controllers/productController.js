const {
  findAll,
  findById,
  create,
  update,
  remove,
} = require("../Models/productModel.js");
const { getPostData } = require("../utils.js");

const getProducts = async (req, res) => {
  try {
    const products = await findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log({ message: error.message });
  }
};

const getProduct = async (req, res, id) => {
  try {
    const product = await findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const body = await getPostData(req);
    const { name, price } = JSON.parse(body);
    const product = { name, price };
    const nProduct = await create(product);

    res.writeHead(201, "Content-Type:application/json");
    res.end(JSON.stringify(nProduct));
  } catch (error) {
    console.log({ message: error.message });
  }
};

const updateProduct = async (req, res, id) => {
  try {
    const product = await findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      const body = await getPostData(req);
      const { name, price } = JSON.parse(body);
      const productData = {
        name: name || product.name,
        price: price || product.price,
      };

      const updProduct = await update(id, productData);
      res.writeHead(200, "Content-Type:application/json");
      res.end(JSON.stringify(updProduct));
    }
  } catch (error) {
    console.log({ message: error.message });
  }
};

const deleteProduct = async (req, res, id) => {
  try {
    const product = await findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      await remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Product ${id} removed` }));
    }
  } catch (error) {
    console.log({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
