import React, {useState} from 'react';
import {
  GridComponent,
} from '@syncfusion/ej2-react-grids';
import {employeesData, employeesGrid} from '../../data/dummy';
import {Header} from '../../components';

import {
  TextBoxComponent,
  UploaderComponent,
} from '@syncfusion/ej2-react-inputs';
import {Button} from '../../components';
import {Navigate} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import useProduct from '../../hooks/useProduct';

const AddProduct = () => {
  const [product, setProduct] = useState({
    item: '',
    supplier: '',
    quantity: 0,
    category: '',
    image: null,
    price: 0,
  });
  const navigate = useNavigate();
  const {uploadProductImg, addNewProduct} = useProduct();

  const handleChange = e => {
    debugger;

    const {name, value, files} = e.target;
    console.log(name, value);
    if (name === 'image') {
      product.image = files[0];
      setProduct({...product});
    } else {
      product[name] = value;
      setProduct({...product});
    }
  };

  const submitHandle = async () => {
    debugger;
    const {addedImg} = await uploadProductImg(product.image);
    debugger;
    const {addedProduct} = await addNewProduct({
      ...product,
      image: addedImg,
    });
    if (addedProduct) {
      navigate('/products');
    } else {
      alert('Something Wrong');
    }
  };
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Add Product" />
      <GridComponent
        dataSource={''}
        width="auto"
        className="add-product-container">
        <div className="mb-8">
          <div className="m-2 md:m-1 p-2 md:p-1">
            <TextBoxComponent
              placeholder="Item name"
              cssClass="e-outline"
              floatLabelType="Auto"
              onChange={handleChange}
              name="item"
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
            <input type="file" name="image" onChange={handleChange} />
          </div>
          <div className="p-4 flex rounded-lg shadow-lg  justify-center items-center ">
            <button
              type="button"
              className="product-button p-3 hover:drop-shadow-xl"
              onClick={submitHandle}>
              Submit
            </button>
          </div>
        </div>
      </GridComponent>
    </div>
  );
};

export default AddProduct;
