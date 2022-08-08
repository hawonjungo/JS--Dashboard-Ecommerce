import React, { useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Sidebar } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

const PageWrapper = ({ children }) => {
  const { activeMenu } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    let admin = JSON.parse(localStorage.getItem("admin"));

    if (!user && !admin) {
      navigate("/signIn");
    }
  }, []);
  return (
    <>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Setting" position="Top">
            <button
              type="button"
              className="text-3xl p-3 hover:drop-shadow-xl
              hover:bg-light-gray text-white"
              style={{ background: "blue", borderRadius: "50%" }}
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {activeMenu ? (
          // -- Sidebar ---
          <div
            className="w-80 fixed sidebar
             dark:bg-secondary-dark-bg 
             bg-white"
          >
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={`dark:bg-main-bg bg-main-bg
             min-h-screen w-full ${activeMenu ? "md:ml-80" : "flex-2"}`}
        >
          {/*-- Navbar -- */}
          <div
            className="fixed md:static bg-main-bg 
            dark:bg-main-dark-bg navbar w-full"
          >
            <Navbar />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default PageWrapper;
