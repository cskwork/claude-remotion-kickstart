# CLAUDE.md

Instructions for using the mcp-veo3 MCP server to generate videos with Google Veo 3.

## Overview

This project uses [mcp-veo3](https://github.com/dayongd1/mcp-veo3) to generate videos via Google's Veo 3 model. Videos are generated from text prompts and saved to the configured output directory.

## MCP Tools Available

Check available tools with:
```bash
mcp-cli tools mcp-veo3
```

Common tools:
- `generate_video` - Generate video from text prompt
- `check_status` - Check generation status
- `list_videos` - List generated videos

## Usage

### Generate a Video

```bash
mcp-cli info mcp-veo3/generate_video  # Always check schema first
mcp-cli call mcp-veo3/generate_video '{"prompt": "A camera flying through clouds at sunset", "aspect_ratio": "16:9"}'
```

### Check Generation Status

```bash
mcp-cli info mcp-veo3/check_status
mcp-cli call mcp-veo3/check_status '{"operation_id": "..."}'
```

## Prompt Guidelines

For best results:
- Be descriptive and specific about camera movement, lighting, and scene
- Include style keywords: cinematic, documentary, aerial, slow-motion
- Specify aspect ratio: `16:9` (landscape) or `9:16` (portrait/vertical)

### Example Prompts

```
Cinematic aerial shot of a forest at golden hour, drone flying forward slowly
Close-up of coffee being poured into a white cup, steam rising, soft morning light
Time-lapse of clouds moving over a mountain range, dramatic lighting
```

## Output

Generated videos are saved to `./output/` directory.

## Integration with Remotion

Generated videos can be used in Remotion compositions:

```tsx
import { Video } from "remotion";

<Video src={staticFile("generated-video.mp4")} />
```

Or use the `VideoSlide` component:

```tsx
<VideoSlide filename="generated-video.mp4" />
```

## Environment

Requires `GEMINI_API_KEY` in `.env`. See `.env.example` for all options.
