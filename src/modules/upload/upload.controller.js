import { uploadImage } from "./upload.service.js";


export const uploadImageController = async (req, res) => {
  try {
    await uploadImage(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
