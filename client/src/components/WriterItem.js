import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import StyledButton from './common/StyledButton'
import { removeWriter } from '../actions/profileActions'

import { palette, spaces } from '../styles/styles'

const StyledTitleArticleWrapper = styled.div`
  padding-left: ${spaces.medium}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${props =>
    props.selected ? `${palette.primaryColor}` : `${palette.text}`};
  white-space: nowrap;
`

class WriterItem extends Component {
  render() {
    return (
      <StyledTitleArticleWrapper>
        <li>
          <span>{this.props.name}</span>
          <span> •</span>
          <span>
            <StyledButton
              onClick={e => {
                if (
                  window.confirm(
                    "Are you sure you want to remove this writer's privilages?"
                  )
                )
                  this.props.removeWriter(this.props.id)
              }}
            >
              delete
            </StyledButton>
          </span>
        </li>
      </StyledTitleArticleWrapper>
    )
  }
}

WriterItem.propTypes = {
  removeWriter: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStatetoProps,
  { removeWriter }
)(WriterItem)
