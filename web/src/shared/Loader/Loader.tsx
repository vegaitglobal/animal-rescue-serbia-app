import React from 'react';
import Layout from '../Layout';

const Loader = () => {
  return (
    <Layout>
      <div className="loader">
        <div className="pulse pulse1"></div>
        <div className="pulse pulse2"></div>
      </div>
    </Layout>
  );
};

export default Loader;
