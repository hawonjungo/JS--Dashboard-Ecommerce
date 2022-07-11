import React from 'react'
import { GridComponent, ColumnsDirective,ColumnDirective,Resize,Sort,ContextMenu,Filter,Page,ExcelExport,PdfExport,Edit,Inject,Search } from '@syncfusion/ej2-react-grids'
import { ordersData,contextMenuItems,ordersGrid } from '../data/dummy';
import {Header} from '../components';

const Products = () => {
  const toolbarOptions = ['Edit', 'Delete', 'Update', 'Cancel','Search'];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="Page" title="Products"/>
      <GridComponent
        id="gridcomp"
        dataSource={ordersData} //order data
        allowPaging // page
        allowSorting // sorting :)

        toolbar={toolbarOptions}
        editSettings={editSettings} 
      >
        <ColumnsDirective>
          {ordersGrid.map((item,index)=> (
            //Order table
            <ColumnDirective key={index}{...item}/>
          ))}
        </ColumnsDirective>
        <Inject services={[Resize,Sort,ContextMenu,Filter,Page,ExcelExport,Edit,PdfExport,Search]}/>
      </GridComponent>
    </div>
  )
}

export default Products