import styled from 'styled-components'

const FadeWrapper = styled.div`
  transition: opacity 0.5s ease-in, transform 0.3s ease-in;

  // enter from
  &.fade-enter {
    opacity: 0;
    transform: translate(0px, -10px) rotate(0deg);
  }

  // enter to
  &.fade-enter-active {
    opacity: 1;
    transform: translate(0px, 0px) rotate(0deg);
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
