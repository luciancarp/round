import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

import { palette, spaces } from '../styles/styles'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: ${spaces.narrow}px;
  border-style: solid;
  border-width: 2px 2px 2px 2px;
  border-radius: 5px 5px 5px 5px;
  border-color: ${palette.text};
  background: ${palette.darkBackgroundColor};
  font-family: inherit;
  font-size: inherit;
  color: ${palette.text};

  -webkit-transition: border-color 0.2s; /* Safari */
  transition: border-color 0.2s;
  transition-timing-function: ease-out;

  &:focus {
    border-color: ${palette.primaryColor};
    background: ${palette.darkBackgroundColor};
    outline: none;
  }

  &:hover {
    border-color: ${palette.primaryColor};
  }
`

export function Dropzone() {
  const maxSize = 5242880
  const onDrop = useCallback(acceptedFiles => {}, [])
  const {
    acceptedFiles,
    rejectedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    minSize: 0,
    maxSize: 5242880,
    multiple: false
  })

  const isFileTooLarge =
    rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize

  return (
    <StyledDiv {...getRootProps({ refKey: 'innerRef' })}>
      <input {...getInputProps()} />
      {!isDragActive &&
        !isFileTooLarge &&
        'Click here or drop a file to upload!'}
      {isDragActive && !isDragReject && 'Drop it!'}
      {isDragReject && 'File type not accepted, sorry! Use jpeg or png'}
      {isFileTooLarge && !isDragReject && <div>File is too large.</div>}
    </StyledDiv>
  )
}
