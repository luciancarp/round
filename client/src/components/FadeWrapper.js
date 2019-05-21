import styled from 'styled-components'

const FadeWrapper = styled.div`
  transition: opacity 0.5s;
  transition-timing-function: ease-out;

  // enter from
  &.fade-enter {
    opacity: 0;
  }

  // enter to
  &.fade-enter-active {
    opacity: 1;
  }

  // exit from
  &.fade-exit {
    opacity: 1;
  }

  // exit to
  &.fade-exit-active {
    opacity: 0;
  }
`
export default FadeWrapper
