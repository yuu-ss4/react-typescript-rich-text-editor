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
import { ReactEditor  } from 'slate-react';

// Slate Imports
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

// Component Imports
import Toolbar from './Toolbar'
import MarkButton from './MarkButton'

type CustomText = {
   text: string;
   bold?: true;
   italic?: true;
   underline?: true;
}

type CustomElement = {
   type: 'paragraph'; 
   children: CustomText[];
}

declare module 'slate' {
   interface CustomTypes {
      Editor: BaseEditor & ReactEditor
      Element: CustomElement
      Text: CustomText
   }
}

const initialValue: Descendant[] = [
   {
      type: 'paragraph',
      children: [{ text: 'We need to go deeper.' }]
   }
]

const markMap = new Map([
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

const markEntries = Array.from(markMap)

const Editor:FC = () => {
   const [editor] = useState(() => withReact(createEditor()))

   const renderMarkIcon = (type: string, icon: any) => {
      return <MarkButton key={type} type={type} icon={icon}/>
   }

   return (
      <div className="editor-container">
         <Slate editor={editor} value={initialValue}>
            <div className="toolbar">
               <Toolbar>
                  {markEntries.map(entry => {
                     return renderMarkIcon(entry[0], entry[1])
                  })}
               </Toolbar>
            </div>
            <Editable className="textbox" />
         </Slate>
      </div>
   )
}

export default Editor;