import React from 'react';
import { ReportsStatus } from '../../services/api/reports/getReports';
import { SearchIcon } from '../../shared/Icons';
import Layout from '../../shared/Layout';
import ReportsFilter from './Components/ReportsFilter';
import Reports from './Reports';

export interface IReportsFilters {
  location: string;
  categoryId: string;
  status: ReportsStatus | null;
  search: string;
}

const ReportsContainer = () => {
  const [filters, setFilters] = React.useState<IReportsFilters>({
    location: '',
    categoryId: '',
    status: null,
    search: '',
  });

  const handleLocationChange = (event: any) => {
    setFilters({ ...filters, location: event.label });
  };

  const handleCategoryChange = (event: any) => {
    setFilters({ ...filters, categoryId: event.value });
  };

  const handleStatusChange = (event: any) => {
    setFilters({ ...filters, status: event.value });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: event.currentTarget.value });
  };

  return (
    <Layout>
      <div className="intro">
        <ReportsFilter
          onLocationChange={handleLocationChange}
          onCategoryIdChange={handleCategoryChange}
          onStatusChange={handleStatusChange}
        />
        <div className="intro__right">
          <input
            type="text"
            placeholder="Pretrazi"
            className="search"
            value={filters.search}
            onChange={handleSearchChange}
          />
          <button className="search-btn">
            <SearchIcon />
          </button>
        </div>
      </div>
      <Reports filters={filters} />
    </Layout>
  );
};

export default ReportsContainer;
