import React from 'react';
import Layout from '../../shared/Layout';
import Pagination from '../../shared/Pagination';
import Search from '../../shared/Search';
import ReportItem from './Components/ReportItem';
import ReportsFilter from './Components/ReportsFilter';

const Reports = () => {
  return (
    <Layout>
      <div className="intro">
        <ReportsFilter />
        <Search />
      </div>
      <ul className="panel__list">
        <ReportItem />
        <ReportItem />
        <ReportItem />
        <ReportItem />
        <ReportItem />
        <ReportItem />
        <ReportItem />
        <ReportItem />
        <ReportItem />
        <ReportItem />
        <ReportItem />
        <ReportItem />
        <ReportItem />
      </ul>
      <Pagination />
    </Layout>
  );
};

export default Reports;
