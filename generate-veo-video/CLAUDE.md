# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a CLI tool for generating videos using Google Veo 3.1 via the Gemini API. It takes text prompts and generates AI videos with configurable aspect ratios and durations.

## Commands

```bash
# Install dependencies
npm install

# Generate a video
npm run generate -- --prompt "Your prompt" --aspectRatio "16:9" --duration "8" --output "output/video.mp4"

# Direct script execution
node scripts/generate-video.js --prompt "..." [options]
```

### CLI Options

| Option | Short | Default | Description |
|--------|-------|---------|-------------|
| `--prompt` | `-p` | (required) | Video description prompt |
| `--aspectRatio` | `-a` | `16:9` | `16:9` (landscape) or `9:16` (portrait) |
| `--duration` | `-d` | `8` | Video length: `4`, `6`, or `8` seconds |
| `--output` | `-o` | `output/video.mp4` | Output file path |
| `--negativePrompt` | `-n` | - | Elements to exclude from video |

## Environment Configuration

Required: `GEMINI_API_KEY` - Google Gemini API key with Veo access
Optional: `VEO_MODEL` - Model ID (default: `veo-3.1-generate-preview`)

## Architecture

```
generate-veo-video/
├── scripts/
│   └── generate-video.js    # Main video generation script
├── output/                  # Generated videos directory
└── .claude/commands/        # Claude Code skill definitions
```

The generation flow:
1. Parse CLI arguments and validate required prompt
2. Initialize GoogleGenAI client with API key
3. Call `ai.models.generateVideos()` with prompt and config
4. Poll `ai.operations.getVideosOperation()` every 10 seconds until completion
5. Download video via `ai.files.download()` to output path

## Skill Usage

Use `/generate-veo-video <concept>` to invoke the prompt enhancement workflow which:
1. Transforms user concepts into cinematic prompts using the 5-Part Formula: `[Cinematography] + [Subject] + [Action] + [Context] + [Style & Ambiance]`
2. Asks for aspect ratio/duration preferences
3. Executes the generation script

## Prompt Engineering

When enhancing prompts for Veo 3.1, include:
- **Cinematography**: Camera movements (dolly, tracking, crane, POV), shot types (wide, medium, close-up), lens effects
- **Lighting**: Time of day, light quality, color temperature, contrast
- **Audio direction**: Dialogue quotes, sound effects (`SFX:`), ambient noise
- **Negative prompts**: Use for excluding unwanted elements (e.g., "cartoon, blurry, watermark")

## Multi-Segment Video Generation

When generating videos with multiple segments, follow these guidelines for natural cinematic transitions:

### Workflow
1. Break the concept into logical scenes/segments (each 4-8 seconds)
2. Plan the narrative arc across all segments
3. Design transition points between segments
4. Generate each segment sequentially with transition-aware prompts
5. Output files as `output/segment_01.mp4`, `output/segment_02.mp4`, etc.

### Natural Transition Techniques

**Visual Continuity** - Maintain consistent elements across segments:
- Same lighting conditions (time of day, color temperature)
- Matching color palette and visual style
- Consistent subject appearance/clothing

**Transitional Camera Movements** - End/begin scenes with motion that flows:
- End with camera pulling back, start next with push-in
- End with pan right, start next continuing the pan
- Use dolly movements that suggest continuation

**Scene Bridging Elements**:
- Segment A ends: "...camera slowly tilts up toward the sky"
- Segment B begins: "Camera tilts down from the sky to reveal..."
- Use common elements: doorways, windows, reflections, shadows

**Audio Continuity**:
- Maintain ambient sound across cuts
- Use dialogue that spans segments
- Music/sound effects that bridge scenes

### Example Multi-Segment Prompts

**Segment 1 (Setup):**
```
Wide establishing shot, a lone figure walks toward an old lighthouse at golden hour,
waves crashing against rocks, warm amber light, camera slowly dollies forward,
ending with the figure reaching the lighthouse door.
```

**Segment 2 (Continuation):**
```
The figure's hand pushes open the weathered wooden door, camera follows from behind
into the dim interior, dust particles visible in shafts of golden light streaming
through small windows, maintaining the warm color palette from exterior.
```

### Transition Prompt Patterns

| Transition Type | Segment A Ending | Segment B Beginning |
|-----------------|------------------|---------------------|
| Location change | "...walks through doorway" | "Emerges into new space..." |
| Time passage | "...sun begins to set" | "Night has fallen..." |
| POV shift | "...looks toward the window" | "Through the window, we see..." |
| Action bridge | "...reaches for the object" | "Hand grasps the object..." |

### Merging Segments with FFmpeg

After generating multiple segments, merge them with crossfade transitions:

```bash
ffmpeg -i segment1.mp4 -i segment2.mp4 -i segment3.mp4 \
  -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.5:offset=7.5[v01]; \
                   [v01][2:v]xfade=transition=fade:duration=0.5:offset=15[outv]; \
                   [0:a][1:a]acrossfade=d=0.5:c1=tri:c2=tri[a01]; \
                   [a01][2:a]acrossfade=d=0.5:c1=tri:c2=tri[outa]" \
  -map "[outv]" -map "[outa]" \
  -c:v libx264 -pix_fmt yuv420p -crf 18 -preset fast \
  -c:a aac -b:a 192k \
  final_video.mp4 -y
```

**Critical encoding settings:**
- `-pix_fmt yuv420p` - Required for player compatibility (NOT yuv444p which causes "unsupported encoding" errors)
- `-c:a aac -b:a 192k` - Include audio stream (omitting `-map "[outa]"` drops audio)
- `xfade` for video transitions, `acrossfade` for audio transitions
- Offset calculation: For 8s segments with 0.5s crossfade: offset1=7.5, offset2=15

## Known Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| API error: "durationSeconds needs to be a number" | CLI passes string | Use `parseInt(values.duration, 10)` in generate-video.js |
| "Unsupported encoding" in player | FFmpeg uses yuv444p by default | Add `-pix_fmt yuv420p` to FFmpeg command |
| No audio in merged video | Only video stream mapped | Add audio crossfade filter and `-map "[outa]"` |
