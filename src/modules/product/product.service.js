import Product from "../../models/product.js";

export default class ProductService {
  static async createproduct(productData) {
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
      } = productData;
      const checkProduct = await Product.findOne({
        where: { name: name },
      });
      console.log("checkProduct", checkProduct);
      if (checkProduct !== null) {
        return {
          status: "OK",
          message: "Tên của sản phẩm đã tồn tại",
        };
      }
      const newProduct = await Product.create({
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        description,
        discount,
        sold,
      });
      if (newProduct) {
        return {
          status: "OK",
          message: "SUCCESS",
          data: newProduct,
        };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getAllproducts(req, res) {
    try {
      const { page, limit = 5, sort, search } = req.query;
      // Tùy chỉnh truy vấn dựa trên các tham số được truyền vào từ client
      const options = {
        order: [],
        where: {},
      };
      // Xử lý phần trang
      if (page && limit) {
        const offset = (page - 1) * limit;
        options.offset = offset;
        options.limit = limit;
      }

      // Xử lý phần sắp xếp
      if (sort) {
        const [field, order] = sort.split(":");
        options.order.push([field, order]);
      }

      // Xử lý phần tìm kiếm
      if (search) {
        options.where = {
          [Op.or]: [
            { fullname: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
          ],
        };
      }
      const totalProducts = await Product.count(options.where);
      const totalPages = Math.ceil(totalProducts / limit);
      // Thực hiện truy vấn để lấy danh sách người dùng với các tùy chọn đã được đặt
      const products = await Product.findAll(options);
      return {
        totalProducts,
        totalPages,
        products,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateproduct(id, data) {
    try {
      const checkProduct = await Product.findByPk(id);
      if (checkProduct == null) {
        return {
          status: "ERR",
          message: "Sản phẩm không tồn tại",
        };
      }
      const updatedProduct = await Product.update(data, {
        where: { id: id },
      });
      return {
        status: "OK",
        message: "thanh cong",
        data: updatedProduct,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteproduct(id, req, res) {
    try {
      const existingProduct = await Product.findByPk(id);
      if (!existingProduct) {
        return res.status(404).json({
          error: "Sản phẩm không tồn tại.",
        });
      }
      const destroy = await Product.destroy({ where: { id } });
      return destroy;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getproductById(id, req, res) {
    try {
      // Tìm người dùng trong cơ sở dữ liệu với id được cung cấp
      const product = await Product.findByPk(id);
      return product;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
