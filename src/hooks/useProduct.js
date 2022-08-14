import axios from "axios";
import { BACKEND_API_URL, USER_STORAGE_KEY } from "../helpers/variables";
import useHandleErrors from "./useHandleErrors";

const useProduct = () => {
  const { handleErrors } = useHandleErrors();
  // const user = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));

  const addNewProduct = async (product) => {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/admin/product`,
        product
      );

      console.log(response.data);
      return { addedProduct: response.data.product };
    } catch (err) {
      handleErrors(err);
    }
  };

  const uploadProductImg = async (imgFile) => {
    try {
      const fd = new FormData();
      fd.append("image", imgFile, imgFile.name);
      const response = await axios.post(
        `${BACKEND_API_URL}/general/upload/single`,
        fd
      );

      console.log(response.data);

      return {
        addedImg: response.data.file,
      };
    } catch (err) {
      handleErrors(err);
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_API_URL}/admin/product`);
      console.log(response.data.products);
      return { items: response.data.products };
    } catch (err) {
      handleErrors(err);
    }
  };

  const deleteProduct = async (_id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_API_URL}/admin/product/${_id}`
      );
      console.log(response.data);
      return { msg: response.data.msg };
    } catch (err) {
      handleErrors(err);
    }
  };

  const updateProduct = async (product) => {
    try {
      const response = await axios.put(
        `${BACKEND_API_URL}/admin/product/${product._id}`,
        product
      );

      console.log(response.data);
      return { updatedProduct: response.data.product };
    } catch (err) {
      alert("Something Wrong");
    }
  };

  const updateProductQuantity = async (id) => {
    try {
      const response = await axios.put(
        `${BACKEND_API_URL}/admin/product/quantity/${id}`
      );

      console.log(response.data);
      return { updatedProduct: response.data.product };
    } catch (err) {
      alert("Something Wrong");
    }
  };

  return {
    addNewProduct,
    uploadProductImg,
    getAllProducts,
    deleteProduct,
    updateProduct,
    updateProductQuantity,
  };
};

export default useProduct;
