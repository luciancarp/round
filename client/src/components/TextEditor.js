import React from 'react'
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js'
import styled from 'styled-components'

import StyledButton from './common/StyledButton'

import { palette, spaces } from '../styles/styles'

import 'draft-js/dist/Draft.css'

const StyledEditorWrapper = styled.div`
  border-style: solid;
  border-width: 2px 2px 2px 2px;
  border-radius: 5px 5px 5px 5px;
  border-color: ${palette.text};
  background: ${palette.darkBackgroundColor};
  min-height: 12em;
  padding: ${spaces.medium}px;
  min-width: 300px;

  &:hover {
    border-color: ${palette.primaryColor};
  }

  -webkit-transition: border-color 0.2s; /* Safari */
  transition: border-color 0.2s;
  transition-timing-function: ease-out;
`

const blockTypes = [
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' }
]

const inlineStyles = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' }
]

class TextEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editorState: EditorState.createEmpty() }
    this.onChange = editorState => this.setState({ editorState })
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.sendContent !== this.props.sendContent &&
      this.props.sendContent === true
    ) {
      const rawState = JSON.stringify(
        convertToRaw(this.state.editorState.getCurrentContent())
      )
      this.props.sendContentFunction(rawState)
    }
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  _onStyleClick(e, inlineStyle) {
    e.preventDefault()
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    )
  }

  _onBlockTypeClick(e, blockType) {
    e.preventDefault()
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType))
  }

  render() {
    return (
      <div>
        {inlineStyles.map(style => (
          <StyledButton
            narrow
            type={'button'}
            onMouseDown={e => this._onStyleClick(e, style.style)}
          >
            {style.label}
          </StyledButton>
        ))}
        {blockTypes.map(block => (
          <StyledButton
            narrow
            type={'button'}
            onMouseDown={e => this._onBlockTypeClick(e, block.style)}
          >
            {block.label}
          </StyledButton>
        ))}

        <StyledEditorWrapper>
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder={'Share your story...'}
          />
        </StyledEditorWrapper>
      </div>
    )
  }
}

export default TextEditor
