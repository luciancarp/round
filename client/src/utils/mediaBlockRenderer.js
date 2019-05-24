import React from 'react'
import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js'
import styled from 'styled-components'

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

export const mediaBlockRenderer = block => {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false
    }
  }
  return null
}

const Image = props => {
  if (props.src) {
    return <img src={props.src} />
  }
  return null
}

const Media = props => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0))
  const { src } = entity.getData()
  const type = entity.getType()

  let media

  if (type === 'image') {
    media = <StyledImage src={src} />
  }

  return media
}
