import styled from 'styled-components'
import { device } from '../../styles/styles'

const StyledNarrowSection = styled.div`
  margin: auto;

  @media ${device.laptop} {  
    max-width: 700px;
  }

  @media ${device.desktop} {
    max-width: 1024px;
  }
`

export default StyledNarrowSection
