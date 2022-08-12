import axios from "axios";
import { BACKEND_API_URL } from "../helpers/variables";
import useHandleErrors from "./useHandleErrors";

const useOrder = () => {
  const { handleErrors } = useHandleErrors();

  const createOrder = async (user, basket) => {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/customer/order/create`,
        {
          ...user,
          basket,
        }
      );

      console.log(response.data);
      return response.data;
    } catch (err) {
      handleErrors(err);
    }
  };

  const getOrders = async () => {
    try {
      const response = await axios.get(`${BACKEND_API_URL}/customer/order`);
      return { orders: response.data.orders };
    } catch (err) {
      handleErrors(err);
    }
  };

  const updateOrder = async order => {
    try {
      const response = await axios.put(
        `${BACKEND_API_URL}/customer/order`,
        order
      );

      return response.data;
    } catch (err) {
      handleErrors(err);
    }
  };

  const getOrderById = async _order => {
    try {
      const response = await axios.get(
        `${BACKEND_API_URL}/customer/order/getOrder/${_order}`
      );

      console.log(response?.data?.order?.basket);
      return { basket: response?.data?.order?.basket };
    } catch (err) {
      handleErrors(err);
    }
  };

  return { createOrder, getOrders, updateOrder, getOrderById };
};

export default useOrder;
