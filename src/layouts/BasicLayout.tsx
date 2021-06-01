import React from 'react';
import ProLayout from '@ant-design/pro-layout';
import logo from '../assets/logo.svg';

const BasicLayout: React.FC = ({ children }) => {
  return (
    <>
      <ProLayout logo={logo}>{children}</ProLayout>
    </>
  );
};

export default BasicLayout;
