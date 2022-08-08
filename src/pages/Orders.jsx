import React from "react";
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
import { ordersData, ordersGrid } from "../data/dummy";
import { Header } from "../components";
import PageWrapper from "../components/PageWrapper";

const Orders = () => {
  const toolbarOptions = ["Edit", "Delete", "Update", "Cancel", "Search"];
  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    newRowPosition: "Top",
  };
  return (
    <PageWrapper>
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Orders" />
        <GridComponent
          id="gridcomp"
          dataSource={ordersData} //order data
          allowPaging // page
          allowSorting // sorting :)
          toolbar={toolbarOptions}
          editSettings={editSettings}
        >
          <ColumnsDirective>
            {ordersGrid.map((item, index) => (
              //Order table
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
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

export default Orders;
