// React Modules/Types
import { FC, MouseEvent } from 'react';

// React Hooks
import {  } from 'react';

// Icon Component
import Icon from 'react-icons-kit';

// Slate Modules/Types
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

// Slate Imports
import { Editor, } from 'slate';
import { useSlate } from 'slate-react';

// Misc/Utils Imports
import { getActiveStyles, toggleStyle } from '../utils/EditorUtils';
import { } from './EditEditor'

interface Props {
   type: string;
   icon: any;
   toggleFormat: (editor: any, type: string) => void;
}

// 1. Click on mark button
// 2. Check the type of the mark
// 3. 

const FormatButton:FC<Props> = ({type, icon, toggleFormat}) => {
   const editor = useSlate()

   return (
      <span
         className="toolbar-button"
         onMouseDown={(event: MouseEvent) => {
            event.preventDefault()
            toggleFormat(editor, type)
         }}
      >
         <Icon icon={icon} size='20px' color='red'/>
      </span>
   )
}

export default FormatButton