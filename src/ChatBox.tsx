import { useState, useRef } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import { toast } from "sonner";

interface ChatBoxProps {
  documentId: Id<"documents"> | null;
  currentContent: string;
}

export function ChatBox({ documentId, currentContent }: ChatBoxProps) {
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastPrompt, setLastPrompt] = useState("");
  const [attachedPdf, setAttachedPdf] = useState<File | null>(null);
  const [pdfFileId, setPdfFileId] = useState<Id<"_storage"> | null>(null);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const chatWithDocument = useAction(api.chat.chatWithDocument);
  const updateDocument = useMutation(api.documents.update);
  const generatePdfUploadUrl = useMutation(api.documents.generatePdfUploadUrl);

  const handlePdfUpload = async (file: File) => {
    if (!file.type.includes('pdf')) {
      toast.error("Please select a PDF file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error("PDF file must be smaller than 10MB");
      return;
    }

    setIsUploadingPdf(true);
    try {
      // Generate upload URL
      const uploadUrl = await generatePdfUploadUrl();
      
      // Upload the file
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) {
        throw new Error("Upload failed");
      }

      const { storageId } = await result.json();
      setPdfFileId(storageId);
      setAttachedPdf(file);
      toast.success("PDF attached successfully");
    } catch (error) {
      toast.error("Failed to upload PDF");
      console.error("PDF upload error:", error);
    } finally {
      setIsUploadingPdf(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePdfUpload(file);
    }
  };

  const removePdfAttachment = () => {
    setAttachedPdf(null);
    setPdfFileId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleReplaceDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !documentId || isLoading) return;

    const prompt = inputMessage.trim();
    setLastPrompt(prompt);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await chatWithDocument({
        documentId,
        message: prompt,
        pdfFileId: pdfFileId || undefined,
      });

      // Replace the document content with the AI response
      await updateDocument({
        id: documentId,
        content: response,
      });

      toast.success("Document replaced with AI response");
    } catch (error) {
      toast.error("Failed to get AI response");
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppendToDocument = async () => {
    if (!inputMessage.trim() || !documentId || isLoading) return;

    const prompt = inputMessage.trim();
    setLastPrompt(prompt);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await chatWithDocument({
        documentId,
        message: prompt,
        pdfFileId: pdfFileId || undefined,
      });

      // Append the AI response to the current content
      const newContent = currentContent + "\n\n" + response;
      await updateDocument({
        id: documentId,
        content: newContent,
      });

      toast.success("AI response appended to document");
    } catch (error) {
      toast.error("Failed to get AI response");
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="p-3 border-b bg-white">
        <h4 className="font-semibold text-gray-900 text-sm mb-2">AI Assistant</h4>
        <p className="text-xs text-gray-500">Ask AI to modify your document</p>
      </div>

      {/* Status and Instructions */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="text-center text-gray-500 text-sm py-4">
          {documentId ? (
            <>
              <div className="mb-3">🤖</div>
              <p className="font-medium mb-2">AI Document Assistant</p>
              <div className="text-xs space-y-1 text-left bg-gray-50 p-3 rounded">
                <p><strong>Replace:</strong> AI will rewrite the entire document</p>
                <p><strong>Append:</strong> AI will add content to the end</p>
                <p><strong>PDF:</strong> Attach PDFs for additional context</p>
              </div>
              {lastPrompt && (
                <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-left">
                  <p className="font-medium text-blue-800">Last request:</p>
                  <p className="text-blue-600 mt-1">"{lastPrompt}"</p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mb-2">📄</div>
              <p>Select a document to use AI assistance</p>
            </>
          )}
        </div>
        
        {isLoading && (
          <div className="text-center">
            <div className="bg-white border shadow-sm p-3 rounded-lg text-sm inline-block">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                AI is processing your request...
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white space-y-2">
        {/* PDF Attachment */}
        {attachedPdf && (
          <div className="flex items-center justify-between p-2 bg-blue-50 rounded text-xs">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <span className="text-blue-800 font-medium">{attachedPdf.name}</span>
              <span className="text-blue-600">({Math.round(attachedPdf.size / 1024)}KB)</span>
            </div>
            <button
              onClick={removePdfAttachment}
              className="text-blue-600 hover:text-blue-800 p-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <form onSubmit={handleReplaceDocument} className="space-y-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={documentId ? "Tell AI what to do with your document..." : "Select a document first"}
            disabled={!documentId || isLoading}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary disabled:bg-gray-100 disabled:text-gray-500 resize-none"
          />
          
          {/* File input and action buttons */}
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={!documentId || isLoading || isUploadingPdf}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              {isUploadingPdf ? (
                <>
                  <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  PDF
                </>
              )}
            </button>
            <button
              type="submit"
              disabled={!inputMessage.trim() || !documentId || isLoading}
              className="flex-1 px-3 py-2 bg-primary text-white rounded text-sm hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={handleAppendToDocument}
              disabled={!inputMessage.trim() || !documentId || isLoading}
              className="flex-1 px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Append
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
