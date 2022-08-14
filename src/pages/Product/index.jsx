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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductTable from "./ProductTable";
import { TextField } from "@mui/material";

const Product = () => {
  const [selectedItem, setSelectedItem] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filtered, setFiltered] = useState([]);
  const { getAllProducts } = useProduct();
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin"));
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    let { items } = await getAllProducts();
    items = items.filter((item) => item.quantity > 0);
    setProducts([...items]);
    setFiltered([...items]);
  };

  useEffect(() => {
    let filteredProds = products.filter((prod) =>
      prod.title.includes(searchKeyword)
    );
    setFiltered([...filteredProds]);
  }, [searchKeyword]);

  const deleteProduct = async (item) => {
    try {
      await axios.delete(`${BACKEND_API_URL}/admin/product/${item._id}`);
      const list = products.filter((product) => product._id !== item._id);
      setFiltered([...list]);
    } catch (err) {
      console.log("err");
    }
  };

  const updateProduct = (item) => {
    if (!selectedItem) return alert("Please select an Item to update!");
    navigate("/editProduct", {
      state: { item: item },
    });
  };

  const addToCart = (item) => {
    if (!selectedItem) return alert("Please select an Item to update!");
    setSelectedItem([...selectedItem, item]);
  };

  const cart = () => {
    navigate("/cart", { state: { items: selectedItem } });
  };

  return (
    <PageWrapper>
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        <div className="product-header">
          <div className="heading">
            <Header category="Page" title="Products" />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "0.7rem",
              marginBottom: "1rem",
            }}
          >
            <input
              type="text"
              placeholder="Search product"
              className="search-input"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />

            {admin && (
              <Link
                style={{ marginRight: ".5rem", width: "7.5rem" }}
                to="/addProduct"
                type="button"
                className="product-button p-1 hover:drop-shadow-xl"
              >
                Add Product
              </Link>
            )}
            {user && (
              <div className="CartContainer">
                <button className="CartContainer__cart" onClick={cart}>
                  <span>{selectedItem.length}</span>
                  <ShoppingCartIcon style={{ fontSize: "25px" }} />
                </button>
              </div>
            )}
          </div>
        </div>
        <ProductTable
          products={filtered}
          updateProduct={updateProduct}
          deleteProduct={deleteProduct}
          addToCart={addToCart}
        />
      </div>
    </PageWrapper>
  );
};

export default Product;
