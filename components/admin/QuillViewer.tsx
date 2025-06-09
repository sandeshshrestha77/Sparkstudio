"use client";
import React from "react";
import "react-quill/dist/quill.snow.css";

interface QuillViewerProps {
  value: string;
}

export default function QuillViewer({ value }: QuillViewerProps) {
  // Quill outputs safe HTML, but for extra safety in public-facing use, sanitize if needed
  return (
    <div className="quill-viewer prose max-w-none" dangerouslySetInnerHTML={{ __html: value || "<p><em>No content</em></p>" }} />
  );
}
