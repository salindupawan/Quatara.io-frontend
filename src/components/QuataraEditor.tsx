import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

// V3 Component Imports
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus'; 
// Extension Imports
import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import FloatingMenuExtension from '@tiptap/extension-floating-menu';

import { 
  Bold, List, Heading1
} from 'lucide-react';

const QuataraEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Explicitly check that heading levels are active
        heading: {
          levels: [1, 2, 3],
        },
      }),
      BubbleMenuExtension,
      FloatingMenuExtension,
      Placeholder.configure({
        placeholder: "Type '/' for commands or start writing...",
      }),
    ],
    content: `<h1>Quatara Editor</h1><p>Highlight text or go to an empty line.</p>`,
    editorProps: {
      attributes: {
        // The 'prose' class is essential for the styling to appear
        class: 'prose prose-slate max-w-none focus:outline-none min-h-[600px] p-16 bg-white shadow-sm rounded-2xl border border-slate-200',
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="relative w-full max-w-4xl mx-auto py-10 px-4">
      
      {/* --- FLOATING MENU --- */}
      <FloatingMenu 
        editor={editor} 
        tippyOptions={{ 
          duration: 100,
          zIndex: 9999, // Ensure it's not buried
        }}
        shouldShow={({ state }) => {
          const { selection } = state;
          const { $from, empty } = selection;
          // Show only on truly empty paragraphs
          return empty && $from.parent.type.name === 'paragraph' && $from.parent.content.size === 0;
        }}
        className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-lg shadow-lg pointer-events-auto"
      >
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            console.log("Applying H1...");
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={`p-2 hover:bg-slate-100 rounded-md transition-colors ${editor.isActive('heading', { level: 1 }) ? 'text-blue-500 bg-blue-50' : 'text-slate-600'}`}
        >
          <Heading1 size={18} />
        </button>

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 hover:bg-slate-100 rounded-md transition-colors ${editor.isActive('bulletList') ? 'text-blue-500 bg-blue-50' : 'text-slate-600'}`}
        >
          <List size={18} />
        </button>
      </FloatingMenu>

      {/* --- BUBBLE MENU --- */}
      <BubbleMenu 
        editor={editor} 
        tippyOptions={{ zIndex: 9999 }}
        className="flex items-center gap-1 bg-slate-900 text-white p-1.5 rounded-xl shadow-2xl border border-slate-700 pointer-events-auto"
      >
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 hover:bg-slate-700 rounded-md ${editor.isActive('bold') ? 'text-blue-400' : ''}`}
        >
          <Bold size={16} />
        </button>
        
        <div className="w-px h-4 bg-slate-700 mx-1" />
        
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            console.log("Applying H1 from Bubble...");
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={`p-2 hover:bg-slate-700 rounded-md ${editor.isActive('heading', { level: 1 }) ? 'text-blue-400' : ''}`}
        >
          <Heading1 size={16} />
        </button>
      </BubbleMenu>

      {/* --- EDITOR CANVAS --- */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
        <EditorContent editor={editor} />
      </div>

      {/* --- DEBUG LOG (Remove after testing) --- */}
      <div className="mt-4 text-[10px] text-slate-400">
        Active Node: {editor.getJSON().content?.[0]?.type || 'unknown'} : {editor.isActive('paragraph') && 'Paragraph'} {editor.isActive('heading', { level: 1 }) && 'Heading 1'} {editor.isActive('bulletList') && 'Bullet List'}
      </div>
    </div>
  );
};

export default QuataraEditor;