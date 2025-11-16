# Output Mystery Backend API

Backend server for executing Python code securely.

## Features

- ✅ Python code execution
- ✅ Security measures (code validation, timeouts)
- ✅ Rate limiting (10 requests/minute)
- ✅ Error handling
- ✅ CORS enabled

## Prerequisites

- Node.js 18+
- Python 3.x installed on your system

## Installation

```bash
cd backend
npm install
```

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### POST `/api/execute`

Execute code in supported languages.

**Request Body:**
```json
{
  "language": "python",
  "code": "print('Hello, World!')"
}
```

**Response:**
```json
{
  "success": true,
  "output": "Hello, World!\n",
  "error": null
}
```

### GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Security Features

1. **Code Validation**: Blocks dangerous operations (file I/O, system calls, etc.)
2. **Execution Timeout**: 5 seconds maximum execution time
3. **Rate Limiting**: 10 requests per minute per IP
4. **Output Limits**: 1MB maximum output size
5. **Language Whitelist**: Only allows approved languages

## Environment Variables

- `PORT`: Server port (default: 3001)

## Notes

- Python code is executed using `python3` command
- Make sure Python 3 is installed and accessible in PATH
- For production, consider using Docker containers for better isolation

