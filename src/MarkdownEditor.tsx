import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import { DocumentList } from "./DocumentList";
import { Editor } from "./Editor";
import { Preview } from "./Preview";
import { ChatBox } from "./ChatBox";

export function MarkdownEditor() {
  const [selectedDocId, setSelectedDocId] = useState<Id<"documents"> | null>(null);
  const [viewMode, setViewMode] = useState<"edit" | "preview" | "split">("split");
  
  const documents = useQuery(api.documents.list) || [];
  const selectedDoc = useQuery(
    api.documents.get,
    selectedDocId ? { id: selectedDocId } : "skip"
  );

  // Auto-select first document if none selected
  useEffect(() => {
    if (!selectedDocId && documents.length > 0) {
      setSelectedDocId(documents[0]._id);
    }
  }, [documents, selectedDocId]);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-80 border-r bg-white flex flex-col">
        <div className="flex-1 min-h-0">
          <DocumentList
            documents={documents}
            selectedDocId={selectedDocId}
            onSelectDocument={setSelectedDocId}
          />
        </div>
        <div className="h-80 border-t">
          <ChatBox 
            documentId={selectedDocId} 
            currentContent={selectedDoc?.content || ""} 
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {selectedDoc ? (
          <>
            {/* Toolbar */}
            <div className="border-b bg-white px-4 py-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold truncate">{selectedDoc.title}</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("edit")}
                  className={`px-3 py-1 rounded text-sm ${
                    viewMode === "edit"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setViewMode("split")}
                  className={`px-3 py-1 rounded text-sm ${
                    viewMode === "split"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Split
                </button>
                <button
                  onClick={() => setViewMode("preview")}
                  className={`px-3 py-1 rounded text-sm ${
                    viewMode === "preview"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Preview
                </button>
              </div>
            </div>

            {/* Editor/Preview */}
            <div className="flex-1 flex">
              {(viewMode === "edit" || viewMode === "split") && (
                <div className={viewMode === "split" ? "w-1/2 border-r" : "w-full"}>
                  <Editor document={selectedDoc} />
                </div>
              )}
              {(viewMode === "preview" || viewMode === "split") && (
                <div className={viewMode === "split" ? "w-1/2" : "w-full"}>
                  <Preview content={selectedDoc.content} />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">No document selected</h3>
              <p>Create a new document or select one from the sidebar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
