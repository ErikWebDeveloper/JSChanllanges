// src/components/UserEditor.tsx
import { useRef } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";

interface UserEditorProps {
  defaultCode: string;
  onRunTests: (code: string) => void;
  btnState: boolean;
}

export default function EditorPanel({
  defaultCode,
  onRunTests,
  btnState,
}: UserEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleRunTests = () => {
    if (editorRef.current) {
      onRunTests(editorRef.current.getValue());
    }
  };

  return (
    <div
      style={{
        flex: 1,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "auto",
          position: "relative",
        }}
        className="border rounded mb-3 py-3"
      >
        <Editor
          defaultLanguage="javascript"
          defaultValue={defaultCode}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
          }}
        />
      </div>
      <button
        onClick={handleRunTests}
        className="btn btn-warning w-100"
        disabled={btnState}
      >
        <i className="bi bi-play-fill me-2"></i>
        {btnState ? "Ejecutando Tests ...." : "Ejecutar Tests"}
      </button>
    </div>
  );
}
