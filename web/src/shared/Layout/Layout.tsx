import React from 'react';
import { LayoutProps } from './Layout.data';

const Layout = ({ children }: LayoutProps) => {
    return <div className="layout">{children}</div>;
};

export default Layout;
