import React, {useState, useEffect} from 'react';
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
} from '@syncfusion/ej2-react-grids';
import {productsGrid} from '../../data/dummy';
import {Header} from '../../components';
import {Button} from '../../components';
import {Link, NavLink} from 'react-router-dom';
import useProduct from '../../hooks/useProduct';

const Product = () => {
  const toolbarOptions = ['Edit', 'Delete', 'Update', 'Cancel', 'Search'];
  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    newRowPosition: 'Top',
  };
  const [products, setProducts] = useState([]);
  const {getAllProducts} = useProduct();
  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    const {items} = await getAllProducts();
    setProducts([...items]);
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <div className="product-header">
        <Header category="Page" title="Products" />
        <Link
          to="/addProduct"
          type="button"
          className="product-button p-3 hover:drop-shadow-xl">
          Add Product
        </Link>
      </div>
      <GridComponent
        id="gridcomp"
        dataSource={products} //order data
        allowPaging // page
        allowSorting // sorting :)
        toolbar={toolbarOptions}
        editSettings={editSettings}>
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
  );
};

export default Product;
