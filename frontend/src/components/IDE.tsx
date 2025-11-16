'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Navigation from './Navigation';

// Extend Window interface for Pyodide
declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<any>;
  }
}

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full text-gray-400">Loading editor...</div>
});

interface CodeTemplate {
  id: string;
  name: string;
  language: string;
  code: string;
  description: string;
}

const codeTemplates: CodeTemplate[] = [
  {
    id: '1',
    name: 'JavaScript Array Methods',
    language: 'javascript',
    code: `// Array Methods Practice
const numbers = [1, 2, 3, 4, 5];

// Map - Transform each element
const doubled = numbers.map(n => n * 2);
console.log('Doubled:', doubled);

// Filter - Keep only elements that pass test
const evens = numbers.filter(n => n % 2 === 0);
console.log('Evens:', evens);

// Reduce - Reduce array to single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log('Sum:', sum);

// Find - Find first element that passes test
const found = numbers.find(n => n > 3);
console.log('First > 3:', found);

// Some - Check if any element passes test
const hasEven = numbers.some(n => n % 2 === 0);
console.log('Has even:', hasEven);

// Every - Check if all elements pass test
const allPositive = numbers.every(n => n > 0);
console.log('All positive:', allPositive);`,
    description: 'Practice JavaScript array methods with this interactive example.'
  },
  {
    id: '2',
    name: 'HTML/CSS Example',
    language: 'html',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.1);
      padding: 30px;
      border-radius: 10px;
      backdrop-filter: blur(10px);
    }
    h1 {
      text-align: center;
      margin-bottom: 20px;
    }
    .card {
      background: rgba(255, 255, 255, 0.2);
      padding: 20px;
      margin: 10px 0;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hello from Output Mystery!</h1>
    <div class="card">
      <h2>Welcome to the IDE</h2>
      <p>This is a live HTML/CSS preview. Edit the code and see changes instantly!</p>
    </div>
  </div>
</body>
</html>`,
    description: 'Create beautiful HTML pages with CSS styling. See live preview as you code.'
  },
  {
    id: '3',
    name: 'Python List Comprehension',
    language: 'python',
    code: `# List Comprehensions Practice
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Basic list comprehension
squares = [x**2 for x in numbers]
print('Squares:', squares)

# With condition
evens = [x for x in numbers if x % 2 == 0]
print('Evens:', evens)

# Multiple conditions
filtered = [x for x in numbers if x > 5 and x % 2 == 0]
print('Even numbers > 5:', filtered)

# Nested list comprehension
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [item for row in matrix for item in row]
print('Flattened:', flattened)

# Dictionary comprehension
word_lengths = {word: len(word) for word in ['hello', 'world', 'python']}
print('Word lengths:', word_lengths)`,
    description: 'Master Python list comprehensions with these examples.'
  },
  {
    id: '4',
    name: 'CSS Grid Layout',
    language: 'css',
    code: `/* CSS Grid Practice */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
  padding: 20px;
  background-color: #1f2937;
}

.grid-item {
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
}

/* Grid area names */
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }

.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: 80px 1fr 60px;
  height: 100vh;
  gap: 10px;
}

/* Responsive grid */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}`,
    description: 'Learn CSS Grid with practical examples and responsive layouts.'
  }
];

// Map Monaco language to template language
const getMonacoLanguage = (lang: string): string => {
  const langMap: { [key: string]: string } = {
    'javascript': 'javascript',
    'python': 'python',
    'html': 'html',
    'css': 'css',
  };
  return langMap[lang] || 'javascript';
};

// Execute JavaScript code and capture console.log
const executeJavaScript = (code: string): Promise<string> => {
  return new Promise((resolve) => {
    const logs: string[] = [];
    const originalLog = console.log;
    
    // Override console.log to capture output
    console.log = (...args: unknown[]) => {
      const output = args.map(arg => {
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2);
          } catch {
            return String(arg);
          }
        }
        return String(arg);
      }).join(' ');
      logs.push(output);
      originalLog(...args);
    };

    try {
      // Create a safe execution context
      const wrappedCode = `
        (function() {
          ${code}
        })();
      `;
      
      // Execute with timeout
      const timeoutId = setTimeout(() => {
        console.log = originalLog;
        resolve('Error: Execution timeout (5 seconds)');
      }, 5000);

      // Use Function constructor for safer execution
      const func = new Function(wrappedCode);
      func();
      
      clearTimeout(timeoutId);
      console.log = originalLog;
      
      const output = logs.length > 0 ? logs.join('\n') : 'Code executed successfully (no output)';
      resolve(output);
    } catch (error: unknown) {
      console.log = originalLog;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      resolve(`Error: ${errorMessage}`);
    }
  });
};

// Execute Python code using Pyodide (browser-based)
const executePython = async (code: string): Promise<string> => {
  try {
    // Load Pyodide from CDN (works better with Next.js)
    // Check if Pyodide is already loaded
    if (typeof window === 'undefined') {
      return 'Error: Python execution is only available in the browser.';
    }

    // @ts-ignore - Pyodide is loaded from CDN
    if (!window.loadPyodide) {
      // Load Pyodide script if not already loaded
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Pyodide'));
        document.head.appendChild(script);
      });
    }

    // @ts-ignore - Pyodide is loaded from CDN
    const { loadPyodide } = window;
    
    // Load Pyodide (first time only, will be cached)
    const pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
    });

    // Set up stdout capture
    pyodide.runPython(`
import sys
from io import StringIO
_stdout_buffer = StringIO()
sys.stdout = _stdout_buffer
`);

    // Execute user code
    try {
      pyodide.runPython(code);
      // Get captured output
      const output = pyodide.runPython('_stdout_buffer.getvalue()');
      return output || 'Code executed successfully (no output)';
    } catch (error: unknown) {
      // Python syntax/runtime errors
      const errorMessage = error instanceof Error ? error.message : String(error);
      // Try to get any partial output
      try {
        const partialOutput = pyodide.runPython('_stdout_buffer.getvalue()');
        if (partialOutput) {
          return `${partialOutput}\n\nError: ${errorMessage}`;
        }
      } catch {
        // Ignore errors getting partial output
      }
      return `Error: ${errorMessage}`;
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return `Error loading Pyodide: ${errorMessage}. Please refresh the page and try again.`;
  }
};

export default function IDE() {
  const [selectedTemplate, setSelectedTemplate] = useState<CodeTemplate>(codeTemplates[0]);
  const [code, setCode] = useState(selectedTemplate.code);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setCode(selectedTemplate.code);
    setOutput('');
    setShowPreview(false);
  }, [selectedTemplate]);

  // Update preview for HTML/CSS
  useEffect(() => {
    if ((selectedTemplate.language === 'html' || selectedTemplate.language === 'css') && showPreview && previewRef.current) {
      updatePreview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, showPreview, selectedTemplate.language]);

  const updatePreview = () => {
    if (!previewRef.current) return;
    
    const iframe = previewRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    
    if (iframeDoc) {
      if (selectedTemplate.language === 'html') {
        iframeDoc.open();
        iframeDoc.write(code);
        iframeDoc.close();
      } else if (selectedTemplate.language === 'css') {
        // For CSS, create a basic HTML structure
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <style>${code}</style>
          </head>
          <body>
            <div class="grid-container">
              <div class="grid-item">1</div>
              <div class="grid-item">2</div>
              <div class="grid-item">3</div>
              <div class="grid-item">4</div>
              <div class="grid-item">5</div>
              <div class="grid-item">6</div>
              <div class="grid-item">7</div>
              <div class="grid-item">8</div>
              <div class="grid-item">9</div>
            </div>
          </body>
          </html>
        `);
        iframeDoc.close();
      }
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running code...\n');
    
    try {
      let result = '';
      
      if (selectedTemplate.language === 'javascript') {
        result = await executeJavaScript(code);
      } else if (selectedTemplate.language === 'python') {
        result = await executePython(code);
      } else if (selectedTemplate.language === 'html' || selectedTemplate.language === 'css') {
        setShowPreview(true);
        result = 'Preview updated! Check the preview panel on the right.';
        updatePreview();
      } else {
        result = 'Language not supported for execution.';
      }
      
      setOutput(result);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setOutput(`Error: ${errorMessage}`);
    } finally {
      setIsRunning(false);
    }
  };

  const clearOutput = () => {
    setOutput('');
    setShowPreview(false);
  };

  const resetCode = () => {
    setCode(selectedTemplate.code);
    setOutput('');
    setShowPreview(false);
  };

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
    // Auto-update preview for HTML/CSS
    if ((selectedTemplate.language === 'html' || selectedTemplate.language === 'css') && showPreview) {
      setTimeout(updatePreview, 300); // Debounce
    }
  };

  const needsPreview = selectedTemplate.language === 'html' || selectedTemplate.language === 'css';

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <div className="flex h-screen pt-16">
        {/* Sidebar */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Code Templates</h2>
            <div className="space-y-2">
              {codeTemplates.map(template => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedTemplate.id === template.id
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-medium">{template.name}</div>
                  <div className="text-sm opacity-75">{template.language}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-4 flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {selectedTemplate.description}
            </p>
          </div>
        </div>

        {/* Main IDE Area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-white">Interactive IDE</h1>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                {selectedTemplate.language}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetCode}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={clearOutput}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Clear Output
              </button>
              {needsPreview && (
                <button
                  onClick={() => {
                    setShowPreview(!showPreview);
                    if (!showPreview) updatePreview();
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    showPreview
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
              )}
              <button
                onClick={runCode}
                disabled={isRunning}
                className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isRunning ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Running...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z" />
                    </svg>
                    Run Code
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Code Editor and Output/Preview */}
          <div className="flex-1 flex">
            {/* Code Editor */}
            <div className="flex-1 flex flex-col">
              <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                <span className="text-sm text-gray-400">Code Editor</span>
              </div>
              <div className="flex-1">
                <MonacoEditor
                  height="100%"
                  language={getMonacoLanguage(selectedTemplate.language)}
                  value={code}
                  onChange={handleEditorChange}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: 'on',
                    formatOnPaste: true,
                    formatOnType: true,
                  }}
                />
              </div>
            </div>

            {/* Output/Preview Panel */}
            <div className="w-1/2 flex flex-col border-l border-gray-700">
              {needsPreview && showPreview ? (
                <>
                  <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                    <span className="text-sm text-gray-400">Live Preview</span>
                  </div>
                  <div className="flex-1 bg-white">
                    <iframe
                      ref={previewRef}
                      className="w-full h-full border-0"
                      sandbox="allow-same-origin allow-scripts"
                      title="Code Preview"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                    <span className="text-sm text-gray-400">Output</span>
                  </div>
                  <div className="flex-1 p-4">
                    <pre className="w-full h-full bg-gray-900 text-gray-100 p-4 rounded-lg border border-gray-700 font-mono text-sm overflow-auto whitespace-pre-wrap">
                      {output || 'Click "Run Code" to see the output here...'}
                    </pre>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
