import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import { toast } from "sonner";

interface Document {
  _id: Id<"documents">;
  title: string;
  content: string;
  lastModified: number;
}

interface EditorProps {
  document: Document;
}

export function Editor({ document }: EditorProps) {
  const [content, setContent] = useState(document.content);
  const [title, setTitle] = useState(document.title);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const updateDocument = useMutation(api.documents.update);

  // Update local state when document changes
  useEffect(() => {
    setContent(document.content);
    setTitle(document.title);
    setHasUnsavedChanges(false);
  }, [document._id, document.content, document.title]);

  // Manual save functionality
  const saveDocument = async () => {
    if (isSaving || !hasUnsavedChanges) return;
    
    setIsSaving(true);
    try {
      await updateDocument({
        id: document._id,
        title: title,
        content: content,
      });
      setHasUnsavedChanges(false);
      toast.success("Document saved");
    } catch (error) {
      toast.error("Failed to save document");
    } finally {
      setIsSaving(false);
    }
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setHasUnsavedChanges(true);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    setHasUnsavedChanges(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle Ctrl+S for saving
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      saveDocument();
      return;
    }

    // Handle Tab for indentation
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = content.substring(0, start) + "  " + content.substring(end);
      setContent(newContent);
      handleContentChange(newContent);
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Handle Ctrl+S globally for the title input as well
  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      saveDocument();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Title editor */}
      <div className="border-b p-4 flex-shrink-0">
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          onKeyDown={handleTitleKeyDown}
          className="w-full text-xl font-semibold bg-transparent border-none outline-none focus:ring-0"
          placeholder="Document title"
        />
        <div className="flex items-center justify-between mt-2">
          <div className="text-sm text-gray-500">
            Last modified: {new Date(document.lastModified).toLocaleString()}
          </div>
          <div className="flex items-center gap-3">
            {hasUnsavedChanges && !isSaving && (
              <div className="text-sm text-amber-600 flex items-center gap-1">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                Unsaved • Ctrl+S to save
              </div>
            )}
            {isSaving && (
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </div>
            )}
            <button
              onClick={saveDocument}
              disabled={!hasUnsavedChanges || isSaving}
              className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Content editor */}
      <div className="flex-1 flex flex-col min-h-0">
        <textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 w-full resize-none border-none outline-none font-mono text-sm leading-relaxed p-4 min-h-0"
          placeholder="Start writing your markdown here..."
          spellCheck={false}
        />
      </div>
    </div>
  );
}
