// Slate Modules/Types
import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';

type CustomText = {
   text: string;
}

type CustomElement = {
   type: null | 'paragraph' | 'quote' | 'code'; 
   children: CustomText[];
}

declare module 'slate' {
   interface CustomTypes {
      Editor: BaseEditor & ReactEditor
      Element: CustomElement
      Text: CustomText
   }
}

export const initialValue: Descendant[] = [
   {
      type: 'paragraph',
      children: [
         { text: "You can type whatever you want here!" },
      ],
   },
   {
      type: 'quote',
      children: [
         { text: "If you're going to try, go all the way. Otherwise, don't even start..." },
      ],
   },
   {
      type: 'code',
      children: [
         { text: "console.log('Hello World!')" },
      ],
   }
]