import React from 'react'
import moment from 'moment'

const DateText = ({ date }) => {
  return (
    <span>{moment(date).format('MMMM Do YYYY')}</span>
  )
}

export default DateText
