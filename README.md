![Claude Remotion Kickstart](public/images/logo.png)

Create videos programmatically using Claude Code. Describe what you want, and Claude builds it with Remotion.

**[Watch the demo on YouTube](https://youtu.be/z7Bkf3Vc63U)**

> **Note:** This project is experimental. Expect bugs and documentation inconsistencies.

## Quick Start

```bash
# 1. Clone and install
git clone https://github.com/jhartquist/claude-remotion-kickstart.git
cd claude-remotion-kickstart
pnpm install

# 2. Tell Claude what video you want (see workflow below)

# 3. Render your video
pnpm exec remotion render <CompositionId>
```

## Video Generation Workflow

Work with Claude Code conversationally to create videos from prompts.

### Step 1: Describe Your Video

Tell Claude what you want to create. Be specific about:
- **Topic** - What the video is about
- **Duration** - How long (e.g., 60 seconds, 2 minutes)
- **Audience** - Who will watch it
- **Style** - Visual theme, colors, tone

**Example prompt:**
```
Create a 90-second explainer video about how async/await works in JavaScript.
Target audience: beginner developers.
Include a title slide, 3 code examples with explanations, and a summary.
Use a dark theme with syntax-highlighted code.
```

### Step 2: Create Composition

Claude will scaffold your video:
- Run `/new-composition my-video` to create the folder structure
- Generate `content.ts` with your text and structure
- Build segment components for each section

**What gets created:**
```
src/compositions/my-video/
├── Composition.tsx    # Main video component
├── config.ts          # Timing/duration settings
├── content.ts         # Your content
└── segments/          # Individual sections
```

### Step 3: Generate Assets (Optional)

Enhance your video with AI-generated assets:

| Command | Purpose |
|---------|---------|
| `/generate-image <prompt>` | Create images with Nano Banana Pro |
| `/generate-video <prompt>` | Generate video clips with Veo 3.1 |
| `/transcribe <file>` | Get word-level timestamps from audio |
| `/screenshot <url>` | Capture website screenshots |

**ElevenLabs MCP** is also available for voiceovers and sound effects.

**Example:**
```
Generate a background image: abstract dark gradient with subtle code patterns
```

### Step 4: Preview and Iterate

```bash
pnpm run dev
```

Open http://localhost:3000 to preview. Then tell Claude what to change:
- "Make the title bigger"
- "Add a fade transition between slides"
- "Change the code example to show error handling"
- "Speed up the intro section"

### Step 5: Render

```bash
pnpm exec remotion render <CompositionId>
```

Output saves to `out/<CompositionId>.mp4`.

**Render options:**
```bash
# Render at different quality
pnpm exec remotion render MyVideo --quality=80

# Render specific frames only
pnpm exec remotion render MyVideo --frame-range=0-60

# Render a still image
pnpm exec remotion still MyVideo
```

## Example Prompts

Copy and customize these prompts for different video types.

### Educational / Explainer

```
Create a 90-second explainer video about [topic].
Target audience: [beginners/intermediate/advanced].
Include: title slide, 3 key concepts with visuals, and a summary.
Style: clean, professional, dark theme.
```

### Code Tutorial

```
Create a code tutorial video explaining [concept/function/pattern].
Language: [JavaScript/Python/etc.]
Show the code with syntax highlighting.
Add animated line highlights to walk through key sections.
Duration: 2 minutes.
Include comments explaining each step.
```

### Product Demo

```
Create a product demo video for [product/feature name].
Include:
- Intro slide with product name and tagline
- 3 feature highlights with screenshots or animations
- Call-to-action slide at the end
Duration: 60 seconds.
Style: [modern/minimal/corporate].
```

### General Template

```
Create a [duration] video about [topic].
Audience: [who will watch]
Include: [specific sections or elements]
Style: [theme, colors, tone]
Assets: [any images, screenshots, or videos to include]
```

## Slash Commands

| Command | Description |
|---------|-------------|
| `/new-composition <name>` | Create a new video composition with boilerplate |
| `/generate-image <prompt>` | Generate an image using Nano Banana Pro |
| `/generate-video <prompt>` | Generate a video clip using Veo 3.1 |
| `/transcribe <file>` | Transcribe audio/video with timestamps |
| `/screenshot <url>` | Capture a full-page screenshot |

## Components

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `TitleSlide` | Full-screen title | `title`, `className` |
| `ContentSlide` | Header + body text | `header`, `content`, `className` |
| `CodeSlide` | Syntax-highlighted code | `code`, `language`, `highlightLines` |
| `DiagramSlide` | Mermaid/D2 diagrams | `type`, `diagram`, `theme` |
| `VideoSlide` | Embed video files | `filename`, `startTime` |
| `BRollVideo` | Video with zoom effects | `filename`, `zoomStart`, `zoomEnd` |
| `Screenshot` | Scrolling screenshot | `src`, `scrollSpeed` |
| `Logo` | Animated logo overlay | `src`, `position`, `size` |
| `Caption` | Subtitle overlay | `transcript`, `className` |
| `Music` | Background audio | `src`, `volume`, `fadeInSeconds` |
| `Code` | Code block (no slide) | `code`, `language`, `theme` |
| `Diagram` | Diagram (no slide) | `type`, `diagram` |
| `AsciiPlayer` | Terminal recordings | `castFile`, `playbackSpeed` |

All components default to dark theme (`bg-black text-white`). Override with `className`.

## Video Presets

| Preset | Resolution | Aspect |
|--------|------------|--------|
| `Landscape-720p` | 1280x720 | 16:9 |
| `Landscape-1080p` | 1920x1080 | 16:9 |
| `Square-1080p` | 1080x1080 | 1:1 |
| `Portrait-1080p` | 1080x1920 | 9:16 |

All presets render at 60fps.

## Prerequisites

### Required

- **Node.js 20+** - [Download](https://nodejs.org/)
- **pnpm** - Install: `npm install -g pnpm`
- **Claude Code** - [Install](https://docs.anthropic.com/en/docs/claude-code)
- **ffmpeg** - For video/audio processing
  - macOS: `brew install ffmpeg`
  - Ubuntu: `sudo apt install ffmpeg`
  - Windows: [Download](https://ffmpeg.org/download.html)

### Optional (AI Features)

Set these in your shell (not .env):

```bash
# Image/video generation
export REPLICATE_API_TOKEN=your_token

# Transcription
export DEEPGRAM_API_KEY=your_key

# Voiceovers (via MCP)
export ELEVENLABS_API_KEY=your_key
```

## Commands Reference

```bash
pnpm run dev                              # Start preview studio
pnpm exec remotion render <id>            # Render video
pnpm exec remotion still <id>             # Render still frame
pnpm run lint                             # Lint code
pnpm run upgrade                          # Upgrade Remotion
```

## Project Structure

```
src/
├── components/      # Reusable video components
├── compositions/    # Your video projects
├── utils/           # Helper functions
├── config.ts        # Timing utilities
├── presets.ts       # Video presets
└── Root.tsx         # Composition registry

public/              # Static assets (images, audio, video)
```

## Resources

- [Remotion Documentation](https://www.remotion.dev/docs/)
- [Remotion Discord](https://discord.gg/6VzzNDwUwV)
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code)

## License

MIT licensed. See [LICENSE](LICENSE).

**Note:** Remotion requires a license for companies with 3+ employees. See [Remotion License](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
