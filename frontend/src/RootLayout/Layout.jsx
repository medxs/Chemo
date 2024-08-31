import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/Navbar";
import SideDragger from "../components/plugins/SideDragger";

const Layout = () => {
  const navigate = useNavigate()
  const [sideDraggerOpen, setSideDraggerOpen] = useState(false);
  const handlCallBack = () => {
    setSideDraggerOpen(true);
  };

  const handleCloseSidebar = () => {
    setSideDraggerOpen(false);
  };

  useEffect(() => {
    navigate('/dashboard');
  }, [])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* <div className="col-md-3 col-lg-2 px-0">
            <Sidebar />
          </div> */}
          <SideDragger
            open={sideDraggerOpen}
            width={200}
            onClose={() => setSideDraggerOpen(false)}
          >
            <Sidebar handleCloseSidebar={handleCloseSidebar} />
          </SideDragger>
          <div className="col-12 px-0">
            <Navbar handlCallBack={handlCallBack} checked={sideDraggerOpen} />

            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
