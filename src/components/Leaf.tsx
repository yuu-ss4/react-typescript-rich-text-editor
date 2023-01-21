const Leaf = ({ attributes, children, leaf }: any) => {
   let el = <>{children}</>

   if (leaf.bold) {
      el = <strong>{el}</strong>
   }

   if (leaf.italic) {
      el = <em>{el}</em>
   }

   if (leaf.underline) {
      el = <u>{el}</u>
   }

   if (leaf.code) {
      el = <code>{el}</code>
   }
   
   return <span {...attributes}>{el}</span>
}

export default Leaf;