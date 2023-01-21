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
import { useState, useCallback } from 'react';

// Slate Modules/Types
import { BaseEditor, Descendant } from 'slate';
import { ReactEditor, RenderElementProps } from 'slate-react';

// Slate Imports
import { createEditor, Editor, Transforms } from 'slate';
import { Slate, Editable, withReact, DefaultElement } from 'slate-react';

// Component Imports
import Toolbar from './Toolbar';
import FormatButton from './FormatButton';

import Leaf from './Leaf'

// Miscellaneous/Utils Imports
import isHotKey from 'is-hotkey';
import { getActiveStyles, toggleStyle } from '../utils/EditorUtils';

type CustomText = {
   text: string;
   bold?: boolean;
   italic?: boolean;
   underline?: boolean;
}

type CustomElement = {
   type: 'paragraph' | 'code' | 'quote'; 
   children: CustomText[];
}

const initialValue = [
   {
      type: 'paragraph',
      children: [
         { text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea modi suscipit molestiae odio sunt nihil dolore cum explicabo. Quam, accusantium!' },
      ]
   }
]

const FORMAT_TYPES = new Map([
   ['bold', bold],
   ['italic', italic],
   ['underline', underline],
   ['code', code],
   ['quote', ic_format_quote],
   ['list', list],
   ['align_left', alignLeft],
   ['align_center', alignCenter],
   ['align_right', alignRight],
   ['align_justify', alignJustify],
   ['link2', link2]
]);

export const FORMAT = Array.from(FORMAT_TYPES)

const EditEditor:FC = () => {
   const [editor] = useState(() => withReact(createEditor()))

   const isMarkActive = (editor: ReactEditor, type: string) => {
      const marks: any = Editor.marks(editor)
      return marks ? marks[type] === true : false
   }

   const toggleFormat = (editor: ReactEditor, type: string): void => {
      const isActive = isMarkActive(editor, type)
      if (isActive) {
         Editor.removeMark(editor, type)
      } else {
         Editor.addMark(editor, type, true)
      }
   }

   const renderElement = useCallback((props: any): JSX.Element => {
      const { element, children, attributes } = props;
      switch (element.type) {
         case 'paragraph':
            return <p {...attributes}>{children}</p>
         case 'quote':
            console.log('here')
            return <q {...attributes}>{children}</q>
         default:
            return <DefaultElement {...props} />
      }
   }, [])

   const renderLeaf = useCallback((props: any): JSX.Element => {
      return <Leaf {...props} />
   }, [])

   const renderIcon = (type: string, icon: any) => {
      return <FormatButton 
               key={type}
               type={type}
               icon={icon}
               toggleFormat={toggleFormat}
            />
   }

   return (
      <div className="editor-container">
         <Slate editor={editor} value={initialValue}>
            <div className="toolbar">
               <Toolbar>
                  {FORMAT.map(entry => {
                     return renderIcon(entry[0], entry[1])
                  })}
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