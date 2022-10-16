import Select, { CSSObjectWithLabel } from 'react-select';

const ReportsFilter = () => {
  const locationOptions = [{ value: '', label: '' }];

  const categoryOptions = [{ value: '', label: '' }];

  const statusOptions = [
    { value: '0', label: 'Na čekanju' },
    { value: '1', label: 'Odbijen' },
    { value: '2', label: 'Prihvaćen' },
    { value: '3', label: 'Procesuiran' },
  ];

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
        options={locationOptions}
        placeholder="Lokacija"
        styles={filterStyles}
      />
      <Select
        options={categoryOptions}
        placeholder="Kategorija"
        styles={filterStyles}
      />
      <Select
        options={statusOptions}
        placeholder="Status"
        styles={filterStyles}
      />
    </div>
  );

  // return (
  //   <div className="intro__left">
  //     <select name="location" id="location" className="filter">
  //       <option className="filter__option" value="">
  //         Lokacija
  //       </option>
  //       <option value="">Novi Sad</option>
  //       <option value="">Beograd</option>
  //       <option value="">Nis</option>
  //     </select>
  //     <select name="category" id="category" className="filter">
  //       <option value="">Kategorija</option>
  //       <option value="">Kategorija 1</option>
  //       <option value="">Kategorija 2</option>
  //       <option value="">Kategorija 3</option>
  //     </select>
  //     <select name="status" id="status" className="filter">
  //       <option value="">Status</option>
  //       <option value="">Status 1</option>
  //       <option value="">Status 2</option>
  //       <option value="">Status 3</option>
  //     </select>
  //   </div>
  // );
};

export default ReportsFilter;
