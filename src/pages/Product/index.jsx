import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
  Search,
} from "@syncfusion/ej2-react-grids";
import { productsGrid } from "../../data/dummy";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import { BACKEND_API_URL } from "../../helpers/variables";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";

const Product = () => {
  const toolbarOptions = ["Edit", "Delete", "Update", "Cancel", "Search"];
  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    newRowPosition: "Top",
  };
  const [selectedItem, setSelectedItem] = useState();
  const [products, setProducts] = useState([]);
  const { getAllProducts } = useProduct();
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    const { items } = await getAllProducts();

    setProducts([...items]);
  };

  const deleteProduct = async () => {
    if (!selectedItem) return alert("Please select an Item to delete!");

    await axios.delete(`${BACKEND_API_URL}/product/delete/${selectedItem._id}`);

    window.location.reload();
  };

  const updateProduct = () => {
    if (!selectedItem) return alert("Please select an Item to update!");
    navigate("/editProduct", { state: { item: selectedItem } });
  };

  return (
    <PageWrapper>
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        <div className="product-header">
          <div className="heading">
            <Header category="Page" title="Products" />
          </div>
          {admin && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginTop: "0.7rem",
                marginBottom: "1rem",
              }}
            >
              <Link
                style={{ marginRight: ".5rem", width: "7.5rem" }}
                to="/addProduct"
                type="button"
                className="product-button p-1 hover:drop-shadow-xl"
              >
                Add Product
              </Link>
              <button
                style={{ marginRight: ".5rem", width: "3.5rem" }}
                to="/editProduct"
                type="button"
                className="product-button p-1 hover:drop-shadow-xl"
                onClick={updateProduct}
              >
                Edit
              </button>
              <Link
                style={{
                  marginRight: ".5rem",
                  width: "4.5rem",
                  backgroundColor: "red",
                }}
                to="/products"
                onClick={deleteProduct}
                type="button"
                className="product-button p-1 hover:drop-shadow-xl"
              >
                Delete
              </Link>
            </div>
          )}
        </div>
        <GridComponent
          id="gridcomp"
          dataSouring // page
          dataSource={products}
          allowSorting // sorting :)
          toolce={products} //order data
          allowPagbar={toolbarOptions}
          allowEditing={true}
          rowSelected={(selectedRec) => setSelectedItem(selectedRec.data)}
        >
          <ColumnsDirective>
            {productsGrid.map((item, index) => (
              //Order table
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          {/* <Inject services={[Page,Toolbar,Edit,Selection]}/>  */}
          <Inject
            services={[
              Resize,
              Sort,
              ContextMenu,
              Filter,
              Page,
              ExcelExport,
              Edit,
              PdfExport,
              Search,
            ]}
          />
        </GridComponent>
      </div>
    </PageWrapper>
  );
};

export default Product;
