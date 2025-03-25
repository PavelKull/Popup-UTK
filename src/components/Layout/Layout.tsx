import React from 'react';
import styles from './Layout.module.scss';
type LayoutProps = {
    children?: React.ReactNode;
    className?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
    return <div className={`${styles.layout} ${className}`}>{children}</div>;
};

export default Layout;
