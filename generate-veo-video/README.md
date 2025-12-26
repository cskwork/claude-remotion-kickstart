# Generate Veo Video

MCP server for generating videos using Google Veo 3.

## Setup

### 1. Get API Key

Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```
GEMINI_API_KEY=your_actual_key_here
```

### 3. Run MCP Server

```bash
uvx mcp-veo3 --output-dir ./output
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY` | Yes | - | Google Gemini API key |
| `DEFAULT_OUTPUT_DIR` | No | `./output` | Output directory for videos |
| `DEFAULT_MODEL` | No | `veo-3.0-generate-preview` | Model to use |
| `DEFAULT_ASPECT_RATIO` | No | `16:9` | Video aspect ratio (`16:9` or `9:16`) |
| `PERSON_GENERATION` | No | `dont_allow` | Person generation setting |
| `POLL_INTERVAL` | No | `10` | Polling interval in seconds |
| `MAX_POLL_TIME` | No | `300` | Max wait time in seconds |

## Usage with Claude

Once configured, use the MCP tool to generate videos:

```
/generate-video A camera flying through clouds at sunset
```

## Reference

- [mcp-veo3 GitHub](https://github.com/dayongd1/mcp-veo3)
