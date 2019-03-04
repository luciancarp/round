import styled from 'styled-components'
import { device, spaces } from '../../styles/styles'

const StyledPage = styled.div`
  /* margin: auto; */
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0px;
  padding: ${spaces.medium}px;
  min-height: calc(100vh - 225px);
  /* text-align: center; */

  @media ${device.laptop} {  
    max-width: 1024px;
  }

  @media ${device.desktop} {
    max-width: 1400px;
  }
`

export default StyledPage
