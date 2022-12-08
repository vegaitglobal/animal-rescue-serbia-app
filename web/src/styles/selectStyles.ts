import { CSSObjectWithLabel } from 'react-select';

export const selectStyles = {
  control: (provided: CSSObjectWithLabel, state: { isFocused: boolean }) => ({
    ...provided,
    border: `2px solid ${state.isFocused ? '#3e3d3d' : '#3e3d3d'}`,
    boxShadow: `inset 0 0 0 0 ${state.isFocused ? '#3e3d3d' : '#3e3d3d'}`,
    width: '460px',
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
