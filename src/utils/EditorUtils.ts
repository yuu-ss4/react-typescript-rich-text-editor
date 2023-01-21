import { Editor } from 'slate';

// Slate Modules/Types
import { ReactEditor } from 'slate-react';

export function getActiveStyles(editor: ReactEditor) {
   return new Set(Object.keys(Editor.marks(editor) ?? {}))
}

export function toggleStyle(editor: ReactEditor, style: string) {
   const activeStyles = getActiveStyles(editor);
   console.log(activeStyles)
   if (activeStyles.has(style)) {
      Editor.removeMark(editor, style);
   } else {
      Editor.addMark(editor, style, true)
   }
}
