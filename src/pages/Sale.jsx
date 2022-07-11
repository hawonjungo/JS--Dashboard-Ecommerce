import React from 'react'
import { GridComponent, ColumnsDirective,ColumnDirective,Page,Inject,Toolbar,Edit,Selection} from '@syncfusion/ej2-react-grids'
import { employeesData,employeesGrid } from '../data/dummy';
import {Header} from '../components';

import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { Button } from '../components';


const Sale = () => {
  const toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
  const pageSettings = { pageCount: 5 };
 
  return (    

    
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>

     

      <Header category="Page" title="Sale"/>
      
      <GridComponent
        dataSource={""} //order data
        allowPaging // page
        allowSorting // sorting :)        
        toolbar={toolbarOptions}
        width='auto'        
        editSettings={editSettings} 
        pageSettings={pageSettings} 
      > 
        

        <div className="mb-8">
                <div className="m-2 md:m-1 p-2 md:p-1">
                    <TextBoxComponent placeholder="Customer name" cssClass="e-outline" floatLabelType="Auto"/>
                </div>
                <div className="m-2 md:m-1 p-2 md:p-1">
                    <TextBoxComponent placeholder="Address" cssClass="e-outline" floatLabelType="Auto" />
                </div>
                <div className="m-20 md:m-1 p-2 md:p-1">
                    <TextBoxComponent placeholder="Phone number" cssClass="e-outline" floatLabelType="Auto" />
                </div>
        </div>
        
        <ColumnsDirective>
          {employeesGrid.map((item,index)=> (
            //Order table
            <ColumnDirective key={index}{...item}/>
          ))}
        </ColumnsDirective>
        <Inject services={[Page,Toolbar,Edit,Selection]}/> 
      </GridComponent>

      <div class=" w-full  mt-10 p-10  gap-10 flex-wrap justify-center items-center ">
                  
                  <div class="bg-white border-transparent rounded-lg shadow-xl">
                      <div class="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                          <h2 class="font-bold uppercase text-gray-600">Payment</h2>
                      </div>

                      
                      <div className="flex-none items-center justify-center p-6">
                        <div className="">
                          <TextBoxComponent placeholder="Order Discount"  cssClass="e-outline" floatLabelType="Auto" />
                        </div>
                        <div className="">
                          <TextBoxComponent placeholder="Discription" cssClass="e-outline" floatLabelType="Auto" />
                        </div>
                        <div className="pl-20 pr-20 pt-4">
                          <TextBoxComponent placeholder="Total"  floatLabelType="Auto" value="$999.00" readOnly/>
                        </div>
                      </div>


                      <div className='p-4 flex rounded-lg shadow-lg  justify-center items-center '>
                        <Button 
                        color = "white"
                        bgColor= "blue"
                        text=" Pay"
                        borderRadius="10px"                
                        />
                      </div>
                      
                  </div>
                  
              </div>





    </div>
  )
}

export default Sale
