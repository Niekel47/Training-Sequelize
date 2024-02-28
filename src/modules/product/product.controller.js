import {
  createproduct,
  getallproducts,
  updateproduct,
  deleteproduct,
  getproductById,
} from "./product.service.js";

const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      type,
      price,
      countInStock,
      rating,
      description,
      discount,
      sold,
    } = req.body;
    if (
      !name ||
      !image ||
      !type ||
      !price ||
      !countInStock ||
      !rating ||
      !discount ||
      !description ||
      !sold
    ) {
      return res.status(200).json({
        status: "ERR",
        message: "Yêu cầu điền hết thông tin!",
      });
    }

    const response = await createproduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const getallProduct = await getallproducts(req, res);
    res.status(200).json(getallProduct);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "Cần id của sản phẩm",
      });
    }
    const response = await updateproduct(productId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteproduct(id, req, res);
    res.status(200).json({ message: "Sản phẩm đã được xóa thành công." });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getproductById(id);
    if (!product) {
      return res.status(500).json({ error: "Sản phẩm không tồn tại." });
    }
    res.status(200).json({ data: product });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  // logoutUser,
};
