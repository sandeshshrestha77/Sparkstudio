declare module 'react-quill-new' {
  import * as React from 'react';
  interface ReactQuillProps {
    theme?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    modules?: any;
    readOnly?: boolean;
    style?: React.CSSProperties;
    [key: string]: any;
  }
  const ReactQuill: React.FC<ReactQuillProps>;
  export default ReactQuill;
}
