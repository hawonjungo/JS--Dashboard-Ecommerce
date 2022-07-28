import React from 'react';
import axios from 'axios';
import {BACKEND_API_URL} from '../helpers/variables';

const useProduct = () => {
  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_API_URL}/product`);
      console.log(response.data.products);
      return {items: response.data.products};
    } catch (err) {
      alert('Something Wrong');
    }
  };

  const addNewProduct = async product => {
    try {
      const response = await axios.post(`${BACKEND_API_URL}/product`, product);

      console.log(response.data);
      return {addedProduct: response.data.product};
    } catch (err) {
      alert('Something Wrong');
    }
  };

  const uploadProductImg = async imgFile => {
    try {
      const fd = new FormData();
      fd.append('image', imgFile, imgFile.name);
      const response = await axios.post(
        `${BACKEND_API_URL}/general/single`,
        fd,
      );

      console.log(response.data);

      return {
        addedImg: response.data.file,
      };
    } catch (err) {
      alert('Something wrong');
    }
  };

  return {
    uploadProductImg,
    addNewProduct,
    getAllProducts,
  };
};

export default useProduct;
