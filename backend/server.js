const express = require('express');
const cors = require('cors');
const { exec, spawn } = require('child_process');
const { promisify } = require('util');
const { writeFile, unlink } = require('fs').promises;
const { join } = require('path');
const { tmpdir } = require('os');
const rateLimit = require('express-rate-limit');

const execAsync = promisify(exec);
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting - 10 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per window
  message: 'Too many requests, please try again later.',
});

app.use('/api/execute', limiter);

// Security: Allowed languages
const ALLOWED_LANGUAGES = ['python'];

// Security: Timeout for code execution (5 seconds)
const EXECUTION_TIMEOUT = 5000;

// Security: Validate code for dangerous patterns
function isCodeSafe(code) {
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

// Execute Python code
async function executePython(code) {
  try {
    // Validate code safety
    if (!isCodeSafe(code)) {
      throw new Error('Code contains potentially dangerous operations');
    }

    // Use stdin to pass code to Python (more reliable than temp files)
    let timeoutId;
    const output = await Promise.race([
      new Promise((resolve, reject) => {
        let stdout = '';
        let stderr = '';
        
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

    return {
      success: true,
      output: output.stdout || 'Code executed successfully (no output)',
      error: output.stderr || null,
    };
  } catch (error) {
    if (error.message.includes('timeout')) {
      throw new Error('Code execution timed out (5 seconds limit)');
    }
    throw error;
  }
}

// API Routes
app.post('/api/execute', async (req, res) => {
  try {
    const { language, code } = req.body;

    // Validate input
    if (!language || !code) {
      return res.status(400).json({
        error: 'Language and code are required',
      });
    }

    // Security: Only allow specific languages
    if (!ALLOWED_LANGUAGES.includes(language.toLowerCase())) {
      return res.status(400).json({
        error: `Language ${language} is not supported`,
      });
    }

    // Execute code based on language
    if (language.toLowerCase() === 'python') {
      try {
        const result = await executePython(code);
        return res.json(result);
      } catch (error) {
        return res.status(500).json({
          error: error.message || 'Code execution failed',
        });
      }
    }

    return res.status(400).json({
      error: 'Unsupported language',
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Internal server error',
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📝 API endpoint: http://localhost:${PORT}/api/execute`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});

