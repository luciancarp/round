import React from 'react'
import PropTypes from 'prop-types'

import StyledInput from './StyledInput'
import ErrorMsg from './ErrorMsg'

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  noMargin
}) => {
  return (
    <div>
      <StyledInput
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        noMargin={noMargin}
      />
      {/* {info && <small >{info}</small>} */}
      {/* {error && <div >{error}</div>} */}
      <ErrorMsg error={error} msg={error} />
    </div>
  )
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup
