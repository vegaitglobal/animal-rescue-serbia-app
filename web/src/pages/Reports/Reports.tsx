import React from 'react';
import { useGetReports } from '../../hooks/api/reports/useGetReports';
import Loader from '../../shared/Loader';
import ReportItem from './Components/ReportItem';
import { IReportsFilters } from './ReportsContainer';

interface IReportsProps {
  filters: IReportsFilters;
}

const Reports: React.FC<IReportsProps> = ({ filters }) => {
  const {
    data: reports,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useGetReports(filters);

  const renderReports = reports?.pages?.map((page) =>
    page?.entities?.map((report) => {
      return <ReportItem singleReport={report} key={report.id} />;
    })
  );

  const handleLoadMore = () => fetchNextPage();

  if (isLoading) return <Loader />;

  return (
    <>
      <ul className="panel__list">{renderReports}</ul>
      {hasNextPage && (
        <button className="load-more__button" onClick={handleLoadMore}>
          Učitaj još
        </button>
      )}
    </>
  );
};

export default Reports;
