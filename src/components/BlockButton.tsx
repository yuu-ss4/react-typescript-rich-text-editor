// React Modules/Types
import { FC, MouseEvent } from 'react';

// Icon Component
import Icon from 'react-icons-kit';

// Slate Imports
import { useSlate } from 'slate-react';

interface Props {
   type: string;
   icon: any;
   toggleBlock: (editor: any, type: string) => void;
}

// 1. Click on mark button
// 2. Check the type of the mark
// 3. 

const BlockButton:FC<Props> = ({type, icon, toggleBlock}) => {
   const editor = useSlate()

   return (
      <span
         className="toolbar-button"
         onMouseDown={(event: MouseEvent) => {
            event.preventDefault()
            toggleBlock(editor, type)
         }}
      >
         <Icon icon={icon} size='20px' color='red'/>
      </span>
   )
}

export default BlockButton