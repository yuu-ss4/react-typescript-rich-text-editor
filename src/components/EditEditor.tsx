// React Icons Kit & Icons
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { code } from 'react-icons-kit/feather/code';
import { list } from 'react-icons-kit/feather/list';
import { underline } from 'react-icons-kit/feather/underline';
import { link2 } from 'react-icons-kit/feather/link2';
import { ic_title } from 'react-icons-kit/md/ic_title';
import { ic_format_quote } from 'react-icons-kit/md/ic_format_quote';
import { alignLeft } from 'react-icons-kit/feather/alignLeft';
import { alignCenter } from 'react-icons-kit/feather/alignCenter';
import { alignRight } from 'react-icons-kit/feather/alignRight';;
import { alignJustify } from 'react-icons-kit/feather/alignJustify'

// React Modules/Types
import { FC } from 'react';

// React Hooks
import { useState, useCallback, useMemo } from 'react';

// Slate Modules/Types
import { ReactEditor } from 'slate-react';

// Slate Imports
import { createEditor, Editor, Transforms } from 'slate';
import { Slate, Editable, withReact, DefaultElement } from 'slate-react';
import { withHistory } from 'slate-history';

// Component Imports
import Toolbar from './Toolbar';
import MarkButton from './MarkButton';
import BlockButton from './BlockButton';
import QuoteBlock from './blocks/QuoteBlock';
import CodeBlock from './blocks/CodeBlock';
import Leaf from './leaf/Leaf'

// Utils Import
import { initialValue } from '../utils/InitialValue';

const EditEditor:FC = () => {
   const editor = useMemo(() => withHistory(withReact(createEditor())), [])

   const isMarkActive = (editor: ReactEditor, type: string) => {
      const marks: any = Editor.marks(editor)
      return marks ? marks[type] === true : false
   }

   const isBlockActive = (editor: ReactEditor, type: string) => {
      const [match] = Editor.nodes(editor, {
         match: (n: any) => n.type === type
      })

      return !!match
   }

   const toggleMark = (editor: ReactEditor, type: string): void => {
      const isActive = isMarkActive(editor, type)
      if (isActive) {
         Editor.removeMark(editor, type)
      } else {
         Editor.addMark(editor, type, true)
      }
   }

   const toggleBlock = (editor: ReactEditor, type: string) => {
      const isActive: boolean = isBlockActive(editor, type)
      Transforms.setNodes(
         editor,
         { type: isActive ? null : type },
         { match: n => Editor.isBlock(editor, n) }
      )
   }

   const renderElement = useCallback((props: any): JSX.Element => {
      const { element, children, attributes } = props;

      switch (element.type) {
         case 'paragraph':
            return <p {...attributes}>{children}</p>
         case 'quote':
            return <QuoteBlock {...props} />
         case 'code':
            return <CodeBlock {...props} />
         default:
            return <DefaultElement {...props} />
      }
   }, [])

   const renderLeaf = useCallback((props: any): JSX.Element => {
      return <Leaf {...props} />
   }, [])

   return (
      <div className="editor-container">
         <Slate editor={editor} value={initialValue}>
            <div className="toolbar">
               <Toolbar>
                  <MarkButton type='bold' icon={bold} toggleMark={toggleMark} />
                  <MarkButton type='italic' icon={italic} toggleMark={toggleMark} />
                  <MarkButton type='underline' icon={underline} toggleMark={toggleMark} />
                  <BlockButton type='code' icon={code} toggleBlock={toggleBlock} />
                  <BlockButton type='quote' icon={ic_format_quote} toggleBlock={toggleBlock} />
               </Toolbar>
            </div>
            <Editable
               renderElement={renderElement}
               renderLeaf={renderLeaf}
               contentEditable={true} 
               className="textbox"
            />
         </Slate>
      </div>
   )
}

export default EditEditor;