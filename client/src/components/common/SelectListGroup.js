import React from 'react'
import PropTypes from 'prop-types'

import StyledSelect from './StyledSelect'

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ))
  return (
    <div >
      <StyledSelect
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </StyledSelect>
      {info && <small >{info}</small>}
      {error && <div>{error}</div>}
    </div>
  )
}

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}

export default SelectListGroup
