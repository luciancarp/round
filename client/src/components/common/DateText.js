import React from 'react'
import moment from 'moment'

const DateText = ({ date, issue, since }) => {
  var format = 'MMMM Do YYYY'
  if (issue) {
    format = 'MMMM YYYY'
  }

  if (since) {
    return (
      <span>{moment(date).fromNow()}</span>
    )
  } else {
    return (
      <span>{moment(date).format(format)}</span>
    )
  }
}

export default DateText
