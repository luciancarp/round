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
`

export default StyledUnorderedList
