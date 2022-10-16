import { useGetReports } from '../../hooks/api/reports/useGetReports';
import { SearchIcon } from '../../shared/Icons';
import Layout from '../../shared/Layout';
import Loader from '../../shared/Loader';
import ReportItem from './Components/ReportItem';
import ReportsFilter from './Components/ReportsFilter';

const Reports = () => {
  const {
    data: reports,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useGetReports();

  const renderReports = reports?.pages?.map((page) =>
    page?.entities?.map((report) => {
      return <ReportItem singleReport={report} key={report.id} />;
    })
  );

  const handleLoadMore = () => fetchNextPage();

  if (isLoading) return <Loader />;

  return (
    <Layout>
      <div className="intro">
        <ReportsFilter />
        <div className="intro__right">
          <input type="text" placeholder="Pretrazi" className="search" />
          <button className="search-btn">
            <SearchIcon />
          </button>
        </div>
      </div>
      <ul className="panel__list">{renderReports}</ul>
      {hasNextPage && <button onClick={handleLoadMore}>Učitaj još</button>}
    </Layout>
  );
};

export default Reports;
