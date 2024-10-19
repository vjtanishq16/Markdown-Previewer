import React, { useState } from 'react';
import { marked } from 'marked';

const Markdown = () => {
  const [markdownText, setMarkdownText] = useState('');
  const convertMarkdownToHTML = () => {
    return { __html: marked(markdownText) };
  };
  const clearMarkdown = () => {
    setMarkdownText('');
  };
  const downloadAsHTML = () => {
    const downloadLink = document.createElement('a');
    const htmlContent = marked(markdownText);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'markdown.html';
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="markdown-previewer bg-gray-900 text-white min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Markdown Previewer</h1>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 mb-6 md:mb-0 pr-4">
            <textarea
              className="bg-gray-800 text-white border-2 border-gray-700 rounded-lg p-4 w-full h-64 resize-none"value={markdownText}onChange={(event) => setMarkdownText(event.target.value)}placeholder="Type your Markdown here..."
            />
            <div className="mt-4 flex space-x-4">
              <button className="bg-red-700 hover:bg-red-500 text-white py-2 px-4 rounded-lg transition duration-300"onClick={clearMarkdown}
              >
                Clear Text
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300" onClick={downloadAsHTML}
              >
                Download as HTML
              </button>
            </div>
          </div>
          <div className="md:w-1/3 pl-4">
            <h2 className="text-2xl font-bold mb-4">Live Preview</h2>
            <div
              className="bg-gray-800 text-white border-2 border-gray-700 rounded-lg p-4 w-full h-64" dangerouslySetInnerHTML={convertMarkdownToHTML()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Markdown;
