import React from 'react';
import { LayoutProps } from './Layout.data';

const Layout = ({ children }: LayoutProps) => {
  return <main className="main">{children}</main>;
};

export default Layout;
