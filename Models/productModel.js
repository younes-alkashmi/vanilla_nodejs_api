let products = require("../data/products.json");
const { v4 } = require("uuid");
const { writeToFile } = require("../utils.js");

// const products = require("../data/products.js");
const findAll = () => {
  return new Promise((resolve, reject) => resolve(products));
};

const findById = (id) => {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
};

const create = (product) => {
  return new Promise((resolve) => {
    const newProduct = { id: v4(), ...product };
    products.push(newProduct);
    writeToFile("./data/products.json", products);
    resolve(newProduct);
  });
};

const update = (id, data) => {
  return new Promise((resolve) => {
    const idx = products.findIndex((p) => p.id === id);
    products[idx] = { id, ...data };
    writeToFile("./data/products.json", products);
    resolve(products[idx]);
  });
};

const remove = (id) => {
  return new Promise((resolve) => {
    products = products.filter((p) => p.id !== id);
    writeToFile("./data/products.json", products);
    resolve();
  });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
