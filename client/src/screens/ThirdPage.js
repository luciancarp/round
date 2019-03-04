import React, { Component } from 'react'
import StyledPage from '../components/layout/StyledPage'
import StyledTitle from '../components/layout/StyledTitle'

class ThirdPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: 'Third Page'
    }
  }

  render () {
    return (
      <StyledPage>
        <StyledTitle>{this.state.title}</StyledTitle>
        <p>Proin accumsan venenatis lectus, nec sollicitudin magna laoreet non. Cras porttitor, risus efficitur tincidunt vehicula, sapien lacus scelerisque diam, quis pretium lacus justo sit amet ante. Vivamus laoreet fringilla libero quis congue. Nunc nisl nunc, feugiat ut lectus ac, porta vehicula sem. Donec quis sollicitudin purus. Curabitur porttitor neque sed ipsum viverra, non congue odio venenatis. Nunc aliquet sem vitae justo tincidunt, ac rutrum purus bibendum. Aenean dictum pretium magna, et viverra arcu blandit id. Phasellus sit amet metus arcu. Cras vehicula leo vitae arcu mattis posuere. Duis viverra quis purus at pharetra. Proin ut lectus nec ipsum viverra maximus vitae eget orci. Sed vehicula mi neque, ut fringilla dolor congue vitae.
        </p>
      </StyledPage>
    )
  }
}

export default ThirdPage
