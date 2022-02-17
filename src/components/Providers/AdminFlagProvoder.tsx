import React, { useState, createContext } from 'react';

type PROPS = {
  isAdmin?: Boolean;
  children?: React.ReactNode;
};

export const AdminFlagContext = createContext({});

export const AdminFlagProvoder = (props: PROPS) => {
  const [isAdmin, SetIsAdmin] = useState(false);

  // const sampleObj = {
  //   sampleValue: 'sampleValue',
  // };
  return (
    <AdminFlagContext.Provider value={{ isAdmin, SetIsAdmin }}>
      {props.children}
    </AdminFlagContext.Provider>
  );
};
