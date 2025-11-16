// Quick test script for Python execution
const { spawn } = require('child_process');
const { writeFile, unlink } = require('fs').promises;
const { join } = require('path');
const { tmpdir } = require('os');

async function testPython() {
  const testCode = `# Test Python execution
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
print('Squares:', squares)
print('Test successful!')`;

  let tempFile = null;
  
  try {
    tempFile = join(tmpdir(), `test_python_${Date.now()}.py`);
    await writeFile(tempFile, testCode, 'utf8');
    
    // Verify file exists
    const { access } = require('fs').promises;
    await access(tempFile);
    console.log('✅ Temp file created:', tempFile);

    return new Promise((resolve, reject) => {
      let stdout = '';
      let stderr = '';
      
      const pythonProcess = spawn('python3', [tempFile]);

      pythonProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      pythonProcess.on('close', async (code) => {
        // Wait a bit before cleaning up
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (code === 0) {
          console.log('✅ Python execution test successful!');
          console.log('Output:', stdout);
          resolve(stdout);
        } else {
          console.error('❌ Python execution failed');
          console.error('Error:', stderr);
          reject(new Error(stderr));
        }
      });

      pythonProcess.on('error', (error) => {
        console.error('❌ Failed to start Python:', error.message);
        reject(error);
      });
    });
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    throw error;
  } finally {
    if (tempFile) {
      try {
        await unlink(tempFile);
      } catch (err) {
        // Ignore
      }
    }
  }
}

testPython().catch(console.error);

