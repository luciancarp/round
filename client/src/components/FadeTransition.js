import React from 'react'
import { CSSTransition } from 'react-transition-group'

const FadeTransition = props => (
  <CSSTransition {...props} classNames='fade' timeout={300} unmountOnExit />
)

export default FadeTransition
