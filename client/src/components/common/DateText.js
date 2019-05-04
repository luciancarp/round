import React from 'react'
import moment from 'moment'

const DateText = ({ date, issue }) => {
  var format = 'MMMM Do YYYY'
  if (issue) {
    format = 'MMMM YYYY'
  }
  return (
    <span>{moment(date).format(format)}</span>
  )
}

export default DateText
