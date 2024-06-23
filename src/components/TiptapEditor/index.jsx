import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FiBold, FiItalic, FiUnderline } from "react-icons/fi";
import Underline from "@tiptap/extension-underline";
import { GoListOrdered } from "react-icons/go";
import { MdFormatListBulleted } from "react-icons/md";
import Document from "@tiptap/extension-document"; // Import Document extension
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
const extensions = [
    Document, // Add Document extension
    Paragraph, // Add Paragraph extension
    Text, // Add Text extension
    Underline.configure({ types: [TextStyle.name, ListItem.name] }),
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
    Placeholder.configure({
        placeholder: "Enter your text here",
        emptyEditorClass:
            "cursor-text before:content-[attr(data-placeholder)] before:absolute before:text-mauve-11 before:opacity-50 before-pointer-events-none",
    }),
];

export default function TiptapEditor({ content, setContent }) {
    const editor = useEditor({
        extensions,
        editorProps: {
            attributes: {
                class: "outline-none overflow-y-auto min-h-20 max-h-40 px-4",
            },
        },
        content: content || "",
    });

    useEffect(() => {
        if (editor) {
            editor.on("update", () => {
                setContent(editor.getHTML());
            });
        }
        return () => {
            if (editor) {
                editor.off("update");
            }
        };
    }, [editor, content]);

    useEffect(() => {
        if (editor) {
            // const content = form.getFieldValue(name);
            if (content && content !== editor.getHTML()) {
                editor.commands.setContent(content);
            }
        }
    }, [editor, content]);

    return (
        <div className="flex flex-col gap-2 border border-gray-300 rounded-sm">
            <div className="flex gap-1 border-b p-1">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor?.can().chain().focus().toggleBold().run()}
                    className={
                        "p-1.5 rounded-sm " +
                        (editor?.isActive("bold") ? "bg-slate-200" : "")
                    }
                >
                    <FiBold className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor?.can().chain().focus().toggleItalic().run()
                    }
                    className={
                        "p-1.5 rounded-sm " +
                        (editor?.isActive("italic") ? "bg-slate-200" : "")
                    }
                >
                    <FiItalic />
                </button>
                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                    disabled={
                        !editor?.can().chain().focus().toggleUnderline().run()
                    }
                    className={
                        "p-1.5 rounded-sm " +
                        (editor?.isActive("underline") ? "bg-slate-200" : "")
                    }
                >
                    <FiUnderline />
                </button>
                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={
                        "p-1.5 rounded-sm " +
                        (editor?.isActive("bulletList") ? "bg-slate-200" : "")
                    }
                >
                    <MdFormatListBulleted />
                </button>
                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={
                        "p-1.5 rounded-sm " +
                        (editor?.isActive("orderedList") ? "bg-slate-200" : "")
                    }
                >
                    <GoListOrdered />
                </button>
            </div>
            <EditorContent
                editor={editor}
                className="outline-none text-sm font-normal"
            />
        </div>
    );
}
