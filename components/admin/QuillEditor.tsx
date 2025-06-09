"use client";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import "quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="min-h-[200px] flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export default function QuillEditor({ value, onChange, placeholder, readOnly }: QuillEditorProps) {
  const modules = useMemo(
    () => ({
      toolbar: readOnly
        ? false
        : [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "code-block"],
            ["link", "image"],
            ["clean"],
          ],
    }),
    [readOnly]
  );
  // Only render ReactQuill on client side to avoid findDOMNode error
  const isClient = typeof window !== "undefined";
  return (
    <div className="quill-editor">
      {isClient && (
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          modules={modules}
          readOnly={readOnly}
          style={{ minHeight: readOnly ? 0 : 200 }}
        />
      )}
      {!isClient && (
        <div className="min-h-[200px] flex items-center justify-center text-muted-foreground">
          Loading editor...
        </div>
      )}
    </div>
  );
}
