import styled from 'styled-components'
import { device, spaces } from '../../styles/styles'

const StyledPage = styled.div`
  position: absolute;
  width: 100%;
  top: 75;
  left: 0;
  right: 0;

  /* margin: auto; */
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0px;
  padding: ${spaces.medium}px;
  // min-height: calc(100vh - 225px);
  min-height: calc(100vh - 50px);
  /* text-align: center; */

  @media ${device.laptop} {
    max-width: 1024px;
  }

  @media ${device.desktop} {
    max-width: 1400px;
  }

  transition: opacity 0.5s ease-in-out, transform 0.3s ease-in-out;

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

export default StyledPage
