import React, { useState } from 'react';
import { useGetReports } from '../../hooks/api/reports/useGetReports';
import { IReportsResponse } from '../../services/api/reports/getReports';
import Layout from '../../shared/Layout';
import Pagination from '../../shared/Pagination';
import Search from '../../shared/Search';
import ReportItem from './Components/ReportItem';
import ReportsFilter from './Components/ReportsFilter';

const Reports = () => {
  const handleSuccess = (data: IReportsResponse[]) => {
    setReports(data);
  };

  const [reports, setReports] = useState<IReportsResponse[]>();

  const { data } = useGetReports({ onSuccess: handleSuccess });

  const reportItemsHTML = reports?.map((item) => (
    <ReportItem singleReport={item} key={item.id} />
  ));

  return (
    <Layout>
      <div className="intro">
        <ReportsFilter />
        <Search />
      </div>
      <ul className="panel__list">{reportItemsHTML}</ul>
      <Pagination />
    </Layout>
  );
};

export default Reports;
