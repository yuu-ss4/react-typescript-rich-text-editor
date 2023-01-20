// React Modules/Types
import { FC } from 'react';

type Props = {
   children: JSX.Element | JSX.Element[]
}

const Toolbar:FC<Props> = (props) => {
   return <div>{props.children}</div>;
}

export default Toolbar;