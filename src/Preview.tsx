import { marked } from 'marked';
import { useEffect, useState } from 'react';

interface PreviewProps {
  content: string;
}

export function Preview({ content }: PreviewProps) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    const renderMarkdown = async () => {
      try {
        const renderedHtml = await marked.parse(content);
        setHtml(renderedHtml);
      } catch (error) {
        console.error('Error parsing markdown:', error);
        setHtml('<p>Error rendering markdown</p>');
      }
    };

    renderMarkdown();
  }, [content]);

  return (
    <div className="h-full bg-white">
      <div className="h-full overflow-y-auto p-6">
        <div 
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
          style={{
            lineHeight: '1.6',
          }}
        />
      </div>
      <style>{`
        .prose h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1.5rem 0 1rem 0;
          color: #1f2937;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }
        .prose h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 1.25rem 0 0.75rem 0;
          color: #374151;
          border-bottom: 1px solid #f3f4f6;
          padding-bottom: 0.25rem;
        }
        .prose h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
          color: #4b5563;
        }
        .prose h4 {
          font-size: 1.125rem;
          font-weight: bold;
          margin: 0.875rem 0 0.5rem 0;
          color: #4b5563;
        }
        .prose h5 {
          font-size: 1rem;
          font-weight: bold;
          margin: 0.75rem 0 0.5rem 0;
          color: #4b5563;
        }
        .prose h6 {
          font-size: 0.875rem;
          font-weight: bold;
          margin: 0.75rem 0 0.5rem 0;
          color: #4b5563;
          text-transform: uppercase;
        }
        .prose p {
          margin: 0.75rem 0;
          color: #374151;
        }
        .prose strong {
          font-weight: 600;
          color: #1f2937;
        }
        .prose em {
          font-style: italic;
        }
        .prose code {
          background-color: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          color: #dc2626;
        }
        .prose pre {
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 1rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        .prose pre code {
          background-color: transparent;
          padding: 0;
          color: #374151;
          font-size: 0.875rem;
        }
        .prose a {
          color: #2563eb;
          text-decoration: underline;
        }
        .prose a:hover {
          color: #1d4ed8;
        }
        .prose ul {
          list-style-type: disc;
          margin: 0.75rem 0;
          padding-left: 1.5rem;
        }
        .prose ol {
          list-style-type: decimal;
          margin: 0.75rem 0;
          padding-left: 1.5rem;
        }
        .prose li {
          margin: 0.25rem 0;
          color: #374151;
        }
        .prose blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }
        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        .prose th,
        .prose td {
          border: 1px solid #e5e7eb;
          padding: 0.5rem;
          text-align: left;
        }
        .prose th {
          background-color: #f9fafb;
          font-weight: 600;
        }
        .prose hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 2rem 0;
        }
        .prose img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
}
