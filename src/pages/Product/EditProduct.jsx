import React, { useEffect, useState, useRef } from "react";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import { Header } from "../../components";

import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_API_URL } from "../../helpers/variables";
import { useLocation } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import PageWrapper from "../../components/PageWrapper";

const EditProduct = (props) => {
  const logoRef = useRef();
  debugger;
  const selectLogo = () => logoRef.current.click();
  const { state } = useLocation();
  const [product, setProduct] = useState(state.item);
  const navigate = useNavigate();
  const [selectedLogo, setSelectedLogo] = useState(null);
  // debugger

  const { uploadProductImg, updateProduct } = useProduct();

  console.log(state);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // console.log(name, value);
    setProduct({ ...product, [name]: value });
  };

  const handleUpdate = async () => {
    debugger;
    if (selectedLogo) {
      const { addedImg } = await uploadProductImg(selectedLogo);
      if (addedImg) product.image = addedImg;
    }
    // console.log(addedImg, "img")
    // debugger;
    const { updatedProduct } = await updateProduct({
      ...product,
    });
    debugger;
    if (updatedProduct) {
      navigate("/products");
    } else {
      alert("Something Wrong");
    }
  };

  return (
    <PageWrapper>
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Edit Product" />
        <GridComponent
          dataSource={""}
          width="auto"
          className="add-product-container"
        >
          <div className="mb-8">
            <div className="m-2 md:m-1 p-2 md:p-1">
              <TextBoxComponent
                placeholder="Title"
                cssClass="e-outline"
                floatLabelType="Auto"
                onChange={handleChange}
                name="title"
                required={true}
                type="text"
                value={product.title}
              />
            </div>
            <div className="m-2 md:m-1 p-2 md:p-1">
              <TextBoxComponent
                placeholder="Description"
                cssClass="e-outline"
                floatLabelType="Auto"
                onChange={handleChange}
                name="description"
                required={true}
                type="text"
                value={product.title}
              />
            </div>
            <div className="m-2 md:m-1 p-2 md:p-1">
              <TextBoxComponent
                placeholder="Supplier"
                cssClass="e-outline"
                floatLabelType="Auto"
                onChange={handleChange}
                name="supplier"
                required={true}
                type="text"
                value={product.supplier}
              />
            </div>
            <div className="m-20 md:m-1 p-2 md:p-1">
              <TextBoxComponent
                placeholder="Quantity"
                cssClass="e-outline"
                floatLabelType="Auto"
                onChange={handleChange}
                name="quantity"
                required={true}
                type="number"
                value={product.quantity}
              />
            </div>
            <div className="m-20 md:m-1 p-2 md:p-1">
              <TextBoxComponent
                placeholder="Category"
                cssClass="e-outline"
                floatLabelType="Auto"
                onChange={handleChange}
                name="category"
                required={true}
                type="text"
                value={product.category}
              />
            </div>
            <div className="m-20 md:m-1 p-2 md:p-1">
              <TextBoxComponent
                placeholder="Price"
                cssClass="e-outline"
                floatLabelType="Auto"
                onChange={handleChange}
                name="price"
                required={true}
                type="number"
                value={product.price}
              />
            </div>
            <div className="m-20 md:m-1 p-2 md:p-1">
              <input
                name="logo"
                id="logo"
                type="file"
                onChange={(e) => setSelectedLogo(e.target.files[0])}
                style={{ display: "none" }}
                ref={logoRef}
              />
              <div className="logoContainer__imageContainer">
                <img
                  src={
                    selectedLogo
                      ? URL.createObjectURL(selectedLogo)
                      : product.img && product.img.includes("http")
                      ? product.img
                      : `${BACKEND_API_URL}/${product.img}`
                  }
                  alt=""
                />
                <div
                  className="logoContainer__imageContainer__overlay"
                  onClick={selectLogo}
                >
                  <img src={require("../../assets/upload.png")} alt="" />
                </div>
              </div>
            </div>
            <div className="p-4 flex rounded-lg shadow-lg  justify-center items-center ">
              <button
                type="button"
                to="addProduct"
                id="logo"
                style={{ width: "5rem" }}
                className="product-button p-2 hover:drop-shadow-xl"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </GridComponent>
      </div>
    </PageWrapper>
  );
};

export default EditProduct;
