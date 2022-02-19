import React, { useState, createContext } from 'react';

interface CONTEXTPROPS {
  isAdmin?: Boolean;
  SetIsAdmin?: any;
}

type PROPS = {
  isAdmin?: Boolean;
  SetIsAdmin?: any;
  children?: React.ReactNode;
};

export const AdminFlagContext = createContext<CONTEXTPROPS>({});

export const AdminFlagProvoder = (props: PROPS) => {
  const { children } = props;
  const [isAdmin, SetIsAdmin] = useState(false);
  console.log('isAdmin:', isAdmin);

  // const sampleObj = {
  //   sampleValue: 'sampleValue',
  // };
  return (
    <AdminFlagContext.Provider value={{ isAdmin, SetIsAdmin }}>
      {children}
    </AdminFlagContext.Provider>
  );
};
