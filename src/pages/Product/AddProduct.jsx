import React, { useState } from "react";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import { Header } from "../../components";

import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { useNavigate } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import PageWrapper from "../../components/PageWrapper";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    supplier: "",
    quantity: 0,
    category: "",
    img: null,
    price: 0,
    desc: "",
  });
  const navigate = useNavigate();
  const { uploadProductImg, addNewProduct } = useProduct();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // console.log(name, value);
    if (name === "img") {
      product.img = files[0];
      setProduct({ ...product });
    } else {
      product[name] = value;
      setProduct({ ...product });
    }
  };

  const submitHandle = async () => {
    // debugger;
    const { addedImg } = await uploadProductImg(product.img);

    // console.log(addedImg, "img")
    // debugger;
    const { addedProduct } = await addNewProduct({
      ...product,
      img: addedImg,
    });
    if (addedProduct) {
      navigate("/products");
    } else {
      alert("Something Wrong");
    }
  };
  return (
    <PageWrapper>
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Add Product" />
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
              />
            </div>
            <div className="m-20 md:m-1 p-2 md:p-1">
              <TextBoxComponent
                placeholder="Description"
                cssClass="e-outline"
                floatLabelType="Auto"
                onChange={handleChange}
                name="desc"
                required={true}
                type="text"
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
              />
            </div>
            <div className="m-20 md:m-1 p-2 md:p-1">
              <input type="file" name="img" onChange={handleChange} />
            </div>
            <div className="p-4 flex rounded-lg shadow-lg  justify-center items-center ">
              <button
                style={{ width: "5rem" }}
                type="button"
                className="product-button p-2 hover:drop-shadow-xl"
                onClick={submitHandle}
              >
                Submit
              </button>
              <button
                type="button"
                style={{
                  backgroundColor: "lightgray",
                  color: "black",
                  marginLeft: "1rem",
                  width: "5rem",
                }}
                className="product-button p-2 hover:drop-shadow-xl"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </div>
        </GridComponent>
      </div>
    </PageWrapper>
  );
};

export default AddProduct;
