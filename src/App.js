import React,{ useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings} from 'react-icons/fi';
import { TooltipComponent} from '@syncfusion/ej2-react-popups';

import {Navbar, Footer, Sidebar, ThemeSettings,Button} from './components';
import { Ecommerce,Orders,Sale,Stacked,Pyramid,Supplier,Area,Bar,Pie,Financial,ColorMapping,ColorPicker,Line} from './pages'; 
import Product from './pages/Product'
import AddProduct from './pages/Product/AddProduct'
import './App.css'

import { useStateContext } from './contexts/ContextProvider';
const App = () => {
  const {activeMenu} = useStateContext();
 
  return (
    <div>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{zIndex:'1000'}}>
            <TooltipComponent content="Setting" position='Top'>
              <button type="button" 
              className="text-3xl p-3 hover:drop-shadow-xl
              hover:bg-light-gray text-white" style={{ background: 'blue', borderRadius: '50%'}}>
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (  
             // -- Sidebar ---
            <div className="w-80 fixed sidebar
             dark:bg-secondary-dark-bg 
             bg-white">
              <Sidebar />
            </div>
          ) : (            
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}         
          <div className={ 
            `dark:bg-main-bg bg-main-bg
             min-h-screen w-full ${activeMenu ? 'md:ml-80' : 'flex-2'}`          
          }>
            {/*-- Navbar -- */}
            <div className="fixed md:static bg-main-bg 
            dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>            
           <div>

              <Routes>
              
                <Route path="/" element={<Ecommerce />} />
                <Route path="/ecommerce" element={<Ecommerce />} />

              
                <Route path="/orders" element={<Orders />} />
                <Route path="/sale" element={<Sale />} />
                <Route path="/products" element={<Product />} />
                <Route path="/addProduct" element={<AddProduct />} />

                <Route path="/suppliers" element={<Supplier />} />


                <Route path="/color-picker" element={<ColorPicker />} />

              
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
              </Routes>
            </div> 
          </div>         
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App