import { useState } from "react";
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

interface DocumentListProps {
  documents: Document[];
  selectedDocId: Id<"documents"> | null;
  onSelectDocument: (id: Id<"documents">) => void;
}

export function DocumentList({ documents, selectedDocId, onSelectDocument }: DocumentListProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState("");
  
  const createDocument = useMutation(api.documents.create);
  const deleteDocument = useMutation(api.documents.remove);

  const handleCreateDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim()) return;

    try {
      const docId = await createDocument({ title: newDocTitle.trim() });
      onSelectDocument(docId);
      setNewDocTitle("");
      setIsCreating(false);
      toast.success("Document created");
    } catch (error) {
      toast.error("Failed to create document");
    }
  };

  const handleDeleteDocument = async (docId: Id<"documents">, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this document?")) return;

    try {
      await deleteDocument({ id: docId });
      if (selectedDocId === docId) {
        const remainingDocs = documents.filter(doc => doc._id !== docId);
        if (remainingDocs.length > 0) {
          onSelectDocument(remainingDocs[0]._id);
        }
      }
      toast.success("Document deleted");
    } catch (error) {
      toast.error("Failed to delete document");
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Documents</h3>
          <button
            onClick={() => setIsCreating(true)}
            className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary-hover transition-colors"
          >
            New
          </button>
        </div>

        {/* Create form */}
        {isCreating && (
          <form onSubmit={handleCreateDocument} className="space-y-2">
            <input
              type="text"
              value={newDocTitle}
              onChange={(e) => setNewDocTitle(e.target.value)}
              placeholder="Document title"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary-hover transition-colors"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setNewDocTitle("");
                }}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Document list */}
      <div className="flex-1 overflow-y-auto">
        {documents.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p>No documents yet</p>
            <p className="text-sm">Create your first document to get started</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {documents.map((doc) => (
              <div
                key={doc._id}
                onClick={() => onSelectDocument(doc._id)}
                className={`p-3 rounded cursor-pointer transition-colors group ${
                  selectedDocId === doc._id
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{doc.title}</h4>
                    <p className={`text-sm mt-1 ${
                      selectedDocId === doc._id ? "text-white/80" : "text-gray-500"
                    }`}>
                      {formatDate(doc.lastModified)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDeleteDocument(doc._id, e)}
                    className={`ml-2 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
                      selectedDocId === doc._id
                        ? "hover:bg-white/20 text-white"
                        : "hover:bg-red-100 text-red-600"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
