import React from "react";
import useHandleErrors from "./useHandleErrors";
import axios from "axios";
import { BACKEND_API_URL } from "../helpers/variables";

const useAuthenticate = () => {
  const { handleErrors } = useHandleErrors();
  const login = async (user) => {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/customer/auth/login`,
        user
      );
      return { userObject: response.data };
    } catch (err) {
      handleErrors(err);
    }
  };

  const adminLogin = async (user) => {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/admin/auth/login`,
        user
      );
      return { userObject: response.data };
    } catch (err) {
      handleErrors(err);
    }
  };

  const register = async (user) => {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/customer/auth/register`,
        user
      );

      return { userObject: response.data };
    } catch (err) {
      handleErrors(err);
    }
  };

  return { login, register, adminLogin };
};

export default useAuthenticate;
