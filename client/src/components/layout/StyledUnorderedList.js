import styled from 'styled-components'
import { spaces, palette } from '../../styles/styles'

const StyledUnorderedList = styled.ul`
  padding: 0px;
  padding-left: ${spaces.medium}px;
  margin-left: ${spaces.wide}px;
  list-style-type: none;
  border-style: solid;
  border-width: 0px 0px 0px 3px;
  border-radius: 0px 0px 0px 0px;
  border-color: ${palette.primaryColor};

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

export default StyledUnorderedList
