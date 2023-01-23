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
   toggleMark: (editor: any, type: string) => void;
}

const MarkButton:FC<Props> = ({type, icon, toggleMark}) => {
   const editor = useSlate()

   return (
      <span
         className="toolbar-button"
         onMouseDown={(event: MouseEvent) => {
            event.preventDefault()
            toggleMark(editor, type)
         }}
      >
         <Icon icon={icon} size='20px' color='red'/>
      </span>
   )
}

export default MarkButton