import ProductService from "./product.service.js";

export default class ProductController {
  static async createProduct(req, res) {
    try {
      const { name, image, price, quantity, description, status } = req.body;
      if (!name || !image || !price || !description || !status || !quantity) {
        return res.status(200).json({
          status: "ERR",
          message: "Yêu cầu điền hết thông tin!",
        });
      }

      const response = await ProductService.createproduct(req.body);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  }

  static async getAllProducts(req, res) {
    try {
      const getallProduct = await ProductService.getAllproducts(req, res);
      res.status(200).json(getallProduct);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const data = req.body;
      if (!productId) {
        return res.status(200).json({
          status: "ERR",
          message: "Cần id của sản phẩm",
        });
      }
      const response = await ProductService.updateproduct(productId, data);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await ProductService.deleteproduct(id, req, res);
      res.status(200).json({ message: "Sản phẩm đã được xóa thành công." });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getproductById(id);
      if (!product) {
        return res.status(500).json({ error: "Sản phẩm không tồn tại." });
      }
      res.status(200).json({ data: product });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteManyProduct(req, res) {
    try {
      const { ids } = req.body; // Lấy danh sách các id cần xóa từ request body
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
          error: "Danh sách id không hợp lệ.",
        });
      }

      const destroyCount = await ProductService.deleteManyProduct(ids);

      // Trả về số lượng bản ghi đã được xóa
      res.status(200).json({
        message: `${destroyCount} sản phẩm đã được xóa thành công.`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
