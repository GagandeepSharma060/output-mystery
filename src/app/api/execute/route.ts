import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Security: Allowed languages
const ALLOWED_LANGUAGES = ['python'];

// Security: Timeout for code execution (5 seconds)
const EXECUTION_TIMEOUT = 5000;

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
        // Create a temporary Python file
        const pythonCode = code;
        
        // Execute with timeout
        const { stdout, stderr } = await Promise.race([
          execAsync(`python3 -c ${JSON.stringify(pythonCode)}`, {
            timeout: EXECUTION_TIMEOUT,
            maxBuffer: 1024 * 1024, // 1MB max output
          }),
          new Promise<{ stdout: string; stderr: string }>((_, reject) =>
            setTimeout(() => reject(new Error('Execution timeout')), EXECUTION_TIMEOUT)
          ),
        ]);

        return NextResponse.json({
          output: stdout || stderr || 'Code executed successfully (no output)',
          error: stderr || null,
        });
      } catch (error: any) {
        // Handle timeout or execution errors
        if (error.message.includes('timeout')) {
          return NextResponse.json(
            { error: 'Code execution timed out (5 seconds limit)' },
            { status: 408 }
          );
        }

        // Extract error message
        const errorMessage = error.stderr || error.message || 'Unknown error';
        return NextResponse.json(
          { error: errorMessage },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Unsupported language' },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

