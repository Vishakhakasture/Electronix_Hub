import React, { createContext, useContext, useState } from "react";

const BreadcrumbContext = createContext();

export const BreadcrumbProvider = ({ children }) => {
  const [breadcrumb, setBreadcrumb] = useState(["Home"]);

  const updateBreadcrumb = (pathArray) => {
    setBreadcrumb(["Home", ...pathArray]);
  };

  return (
    <BreadcrumbContext.Provider value={{ breadcrumb, updateBreadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => useContext(BreadcrumbContext);
