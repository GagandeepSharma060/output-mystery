import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';

// Security: Allowed languages
const ALLOWED_LANGUAGES = ['python'];

// Security: Timeout for code execution (5 seconds)
const EXECUTION_TIMEOUT = 5000;

// Security: Validate code for dangerous patterns
function isCodeSafe(code: string): boolean {
  const dangerousPatterns = [
    /import\s+os/,
    /import\s+subprocess/,
    /import\s+sys/,
    /__import__/,
    /eval\(/,
    /exec\(/,
    /open\(/,
    /file\(/,
    /input\(/,
    /raw_input\(/,
    /compile\(/,
    /__builtins__/,
  ];

  return !dangerousPatterns.some(pattern => pattern.test(code));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { language, code } = body;

    // Validate input
    if (!language || !code) {
      return NextResponse.json(
        { error: 'Language and code are required' },
        { status: 400 }
      );
    }

    // Security: Only allow specific languages
    if (!ALLOWED_LANGUAGES.includes(language.toLowerCase())) {
      return NextResponse.json(
        { error: `Language ${language} is not supported` },
        { status: 400 }
      );
    }

    // Security: Basic code validation (prevent dangerous operations)
    const dangerousPatterns = [
      /import\s+os/,
      /import\s+subprocess/,
      /__import__/,
      /eval\(/,
      /exec\(/,
      /open\(/,
      /file\(/,
      /input\(/,
      /raw_input\(/,
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(code)) {
        return NextResponse.json(
          { error: 'Code contains potentially dangerous operations' },
          { status: 400 }
        );
      }
    }

    // Execute Python code
    if (language.toLowerCase() === 'python') {
      try {
        // Validate code safety
        if (!isCodeSafe(code)) {
          return NextResponse.json(
            { error: 'Code contains potentially dangerous operations' },
            { status: 400 }
          );
        }

        // Execute Python using spawn (better for multiline code)
        const output = await Promise.race([
          new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
            let stdout = '';
            let stderr = '';
            // eslint-disable-next-line prefer-const
            let timeoutId: NodeJS.Timeout;

            const pythonProcess = spawn('python3', ['-u', '-c', code]);

            pythonProcess.stdout.on('data', (data) => {
              stdout += data.toString();
            });

            pythonProcess.stderr.on('data', (data) => {
              stderr += data.toString();
            });

            pythonProcess.on('close', (code) => {
              if (timeoutId) clearTimeout(timeoutId);
              if (code === 0) {
                resolve({ stdout, stderr });
              } else {
                reject(new Error(stderr || `Process exited with code ${code}`));
              }
            });

            pythonProcess.on('error', (error) => {
              if (timeoutId) clearTimeout(timeoutId);
              reject(new Error(`Failed to start Python: ${error.message}`));
            });

            // Set timeout
            timeoutId = setTimeout(() => {
              pythonProcess.kill();
              reject(new Error('Execution timeout'));
            }, EXECUTION_TIMEOUT);
          }),
        ]);

        return NextResponse.json({
          success: true,
          output: output.stdout || 'Code executed successfully (no output)',
          error: output.stderr || null,
        });
      } catch (error: unknown) {
        // Handle timeout or execution errors
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        if (errorMessage.includes('timeout')) {
          return NextResponse.json(
            { error: 'Code execution timed out (5 seconds limit)' },
            { status: 408 }
          );
        }

        // Check if Python is not available (Vercel limitation)
        if (errorMessage.includes('Failed to start Python') || errorMessage.includes('ENOENT')) {
          return NextResponse.json(
            { 
              error: 'Python execution is not available on this platform. Using Pyodide (browser-based Python) instead.',
              suggestion: 'Python will run in the browser using Pyodide.'
            },
            { status: 503 }
          );
        }

        return NextResponse.json(
          { error: errorMessage || 'Unknown error' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Unsupported language' },
      { status: 400 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

