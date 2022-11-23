import Select, { CSSObjectWithLabel } from 'react-select';
import { useGetLocations } from '../../../../hooks/api/reports/useGetLocations';
import { useGetReportCategories } from '../../../../hooks/api/reports/useGetReportCategories';
import { ReportsStatus } from '../../../../services/api/reports/getReports';
import Reports from '../../Reports';

type IProps = {
  onLocationChange: (event: any) => void;
  onCategoryIdChange: (event: any) => void;
  onStatusChange: (event: any) => void;
};

const ReportsFilter: React.FC<IProps> = ({
  onLocationChange,
  onCategoryIdChange,
  onStatusChange,
}) => {
  const { data: locationOptions } = useGetLocations();

  const { data: categoryOptions } = useGetReportCategories();

  const statusOptions = [
    { value: ReportsStatus.Pending, label: 'Na čekanju' },
    { value: ReportsStatus.Rejected, label: 'Odbijen' },
    { value: ReportsStatus.Accepted, label: 'Prihvaćen' },
    { value: ReportsStatus.Processed, label: 'Procesuiran' },
  ];

  const locationsOptionsMapped = locationOptions
    ? locationOptions.map((value, index) => ({ value: index, label: value }))
    : [{}];

  const categoryOptionsMapped = categoryOptions
    ? categoryOptions.map((category) => ({
        value: category.id,
        label: category.name,
      }))
    : [{}];

  const filterStyles = {
    control: (provided: CSSObjectWithLabel, state: { isFocused: boolean }) => ({
      ...provided,
      border: `2px solid ${state.isFocused ? '#3e3d3d' : '#3e3d3d'}`,
      boxShadow: `inset 0 0 0 0 ${state.isFocused ? '#3e3d3d' : '#3e3d3d'}`,
      width: '190px',
      '&:hover': {
        cursor: 'pointer',
        borderColor: '#3e3d3d',
      },
    }),
    option: (provided: CSSObjectWithLabel, state: { isFocused: boolean }) => ({
      ...provided,
      fontSize: '15px',
      backgroundColor: state.isFocused ? '#3e3d3dc2' : 'transparent',
      color: state.isFocused ? '#fff' : '#3e3d3d',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#3e3d3dc2',
      },
    }),
  };

  return (
    <div className="intro__left">
      <Select
        options={locationsOptionsMapped}
        placeholder="Lokacija"
        styles={filterStyles}
        onChange={onLocationChange}
      />
      <Select
        options={categoryOptionsMapped}
        placeholder="Kategorija"
        styles={filterStyles}
        onChange={onCategoryIdChange}
      />
      <Select
        options={statusOptions}
        placeholder="Status"
        styles={filterStyles}
        onChange={onStatusChange}
      />
    </div>
  );
};

export default ReportsFilter;
