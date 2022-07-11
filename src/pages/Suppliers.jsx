import React from 'react'
import { GridComponent,ColumnsDirective,ColumnDirective,Page,Resize,ContextMenu,ExcelExport,PdfExport,Toolbar,Search,Inject,Edit,Sort,Filter } from '@syncfusion/ej2-react-grids'
import { ordersData,ordersGrid } from '../data/dummy';

import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { Button } from '../components';

import {Header} from '../components';

const Suppliers = () => {
  const toolbarOptions = ['Edit', 'Delete', 'Update', 'Cancel','Search'];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="Page" title="Supllier"/>
      <GridComponent
        id="gridcomp"
        dataSource={ordersData} //order data
        allowPaging // page
        allowSorting // sorting :)

        toolbar={toolbarOptions}
        editSettings={editSettings} 
      >
          <div className="mb-8">
                <div className="m-2 md:m-1 p-2 md:p-1">
                    <TextBoxComponent placeholder="Supplier name" cssClass="e-outline" floatLabelType="Auto"/>
                </div>
                <div className="m-2 md:m-1 p-2 md:p-1">
                    <TextBoxComponent placeholder="Address" cssClass="e-outline" floatLabelType="Auto" />
                </div>
                <div className="m-20 md:m-1 p-2 md:p-1">
                    <TextBoxComponent placeholder="Phone number" cssClass="e-outline" floatLabelType="Auto" />
                </div>
           </div>


        <ColumnsDirective>
          {ordersGrid.map((item,index)=> (
            //Order table
            <ColumnDirective key={index}{...item}/>
          ))}
        </ColumnsDirective>
        <Inject services={[Resize,Sort,ContextMenu,Filter,Page,ExcelExport,Edit,PdfExport,Search,Toolbar]}/>
      </GridComponent>
    </div>
  )
}

export default Suppliers