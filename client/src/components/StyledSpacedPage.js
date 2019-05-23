import styled from 'styled-components'
import { device, spaces } from '../styles/styles'
import StyledPage from './layout/StyledPage'

const StyledSpacedPage = styled(StyledPage)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export default StyledSpacedPage
