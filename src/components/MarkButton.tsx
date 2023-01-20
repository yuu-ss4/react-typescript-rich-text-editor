// React Modules/Types
import { FC, MouseEvent } from 'react';

// Icon Component
import Icon from 'react-icons-kit';


interface MarkProps {
   type: string;
   icon: any;
}

const MarkButton:FC<MarkProps> = ({type, icon}) => {
   // const onMarkClick = (e: MouseEvent, type: MarkProps)  => {
   //    e.preventDefault()
   // }

   return (
      <span
         className="toolbar-button"
         // onClick={(e: MouseEvent) => onMarkClick(e, type)}
      >
         <Icon icon={icon} size='20px' color='red'/>
      </span>
   )
   }

export default MarkButton