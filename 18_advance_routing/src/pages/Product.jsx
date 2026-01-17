// ============================================
// PRODUCT PAGE - Nested Routes with Outlet
// ============================================

import React from "react";
import { Link, Outlet } from "react-router-dom";
// Outlet: Acts as a placeholder where child routes will be rendered
// Think of it as a "slot" where nested content appears

const Product = () => {
  return (
    <div>
      {/* Sub-navigation for nested routes */}
      <div className="flex justify-center gap-10 py-4">
        {/* 
                  Links to NESTED routes
                  Full paths: /product/men, /product/women, /product/kids
                  These match the child routes defined in App.jsx
                */}
        <Link className="text-xl font-semibold" to="/product/men">
          Men
        </Link>
        <Link className="text-xl font-semibold" to="/product/women">
          Women
        </Link>
        <Link className="text-xl font-semibold" to="/product/kids">
          Kids
        </Link>
      </div>

      {/* 
              OUTLET COMPONENT
              This is where child route components will be rendered
              
              When user visits:
              - /product           -> Outlet is empty
              - /product/men       -> <Men /> component renders here
              - /product/women     -> <Women /> component renders here
              - /product/kids      -> <Kids /> component renders here
              
              Everything above <Outlet /> stays the same (persistent layout)
              Only content inside <Outlet /> changes based on route
            */}
      <Outlet />
    </div>
  );
};

export default Product;
