import React from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filterSlice';

import s from './Filter.module.css';

function Filter() {
  
const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  const changeFilter = e => {
    dispatch(setFilter(e.currentTarget.value));
  };


  return (
    <label className={s.filter}>
      
      <input 
      type="text" 
      value={filter} 
      onChange={changeFilter}
      placeholder="Find contacts by name" />
    </label>
  );
}

// Filter.propTypes = {
//   filter: PropTypes.string.isRequired,
// };

export default Filter;
