'use client';

import { useState, useEffect } from 'react';
import Navigation from './Navigation';

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
    name: 'React Component',
    language: 'javascript',
    code: `import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setCount(count => count + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;`,
    description: 'A simple React counter component with useState and useEffect hooks.'
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
  background-color: #f0f0f0;
}

.grid-item {
  background-color: #4CAF50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
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

export default function IDE() {
  const [selectedTemplate, setSelectedTemplate] = useState<CodeTemplate>(codeTemplates[0]);
  const [code, setCode] = useState(selectedTemplate.code);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setCode(selectedTemplate.code);
    setOutput('');
  }, [selectedTemplate]);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running code...\n');
    
    // Simulate code execution
    setTimeout(() => {
      let result = '';
      
      if (selectedTemplate.language === 'javascript') {
        // Simple JavaScript execution simulation
        try {
          // This is a simplified version - in a real app, you'd use a proper JS runtime
          result = 'Code executed successfully!\n';
          result += 'Check the browser console for output.\n';
          result += 'Note: This is a demo. Full execution requires a proper runtime.';
        } catch (error) {
          result = `Error: ${error}`;
        }
      } else if (selectedTemplate.language === 'python') {
        result = 'Python code would be executed here.\n';
        result += 'In a real implementation, this would connect to a Python runtime.\n';
        result += 'Example output:\n';
        result += 'Squares: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\n';
        result += 'Evens: [2, 4, 6, 8, 10]\n';
        result += 'Even numbers > 5: [6, 8, 10]\n';
        result += 'Flattened: [1, 2, 3, 4, 5, 6, 7, 8, 9]\n';
        result += 'Word lengths: {\'hello\': 5, \'world\': 5, \'python\': 6}';
      } else if (selectedTemplate.language === 'css') {
        result = 'CSS styles applied!\n';
        result += 'The grid layout should now be visible in the preview area.\n';
        result += 'Check the browser developer tools to see the computed styles.';
      }
      
      setOutput(result);
      setIsRunning(false);
    }, 1500);
  };

  const clearOutput = () => {
    setOutput('');
  };

  const resetCode = () => {
    setCode(selectedTemplate.code);
    setOutput('');
  };

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

          {/* Code Editor and Output */}
          <div className="flex-1 flex">
            {/* Code Editor */}
            <div className="flex-1 flex flex-col">
              <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                <span className="text-sm text-gray-400">Code Editor</span>
              </div>
              <div className="flex-1 p-4">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full bg-gray-900 text-gray-100 p-4 rounded-lg border border-gray-700 font-mono text-sm resize-none focus:outline-none focus:border-cyan-500"
                  placeholder="Write your code here..."
                  spellCheck={false}
                />
              </div>
            </div>

            {/* Output Panel */}
            <div className="w-1/2 flex flex-col border-l border-gray-700">
              <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                <span className="text-sm text-gray-400">Output</span>
              </div>
              <div className="flex-1 p-4">
                <pre className="w-full h-full bg-gray-900 text-gray-100 p-4 rounded-lg border border-gray-700 font-mono text-sm overflow-auto whitespace-pre-wrap">
                  {output || 'Click "Run Code" to see the output here...'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
