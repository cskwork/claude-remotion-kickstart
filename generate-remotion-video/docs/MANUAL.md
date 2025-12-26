# Claude Remotion Kickstart - Manual

## Quick Commands

```bash
pnpm run dev              # Start preview at localhost:3000
pnpm exec remotion render MyVideo  # Render video to out/
pnpm run lint             # Lint code
```

## Workflow

1. **Create composition**: `/new-composition my-video`
2. **Edit content**: `src/compositions/my-video/content.ts`
3. **Adjust timing**: `src/compositions/my-video/config.ts`
4. **Preview**: `pnpm run dev` -> http://localhost:3000
5. **Render**: `pnpm exec remotion render MyVideo`

## Video Presets

| Preset | Resolution | Ratio |
|--------|------------|-------|
| Landscape-720p | 1280x720 | 16:9 |
| Landscape-1080p | 1920x1080 | 16:9 |
| Square-1080p | 1080x1080 | 1:1 |
| Portrait-1080p | 1080x1920 | 9:16 |

## Core Components

- **TitleSlide** - Full-screen title with optional subtitle
- **ContentSlide** - Header with body text
- **CodeSlide** - Syntax-highlighted code
- **DiagramSlide** - Mermaid/D2 diagrams
- **VideoSlide** - Embed video files
- **Music** - Background audio with fade

## Timing

```tsx
import { secondsToFrames } from "../../config";

<Sequence from={secondsToFrames(5.2)} durationInFrames={secondsToFrames(2.7)}>
  <Logo src="logo.svg" />
</Sequence>
```

## Transitions

```tsx
import { TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { linearTiming } from "@remotion/transitions";

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={180}>
    <TitleSlide title="Hello" />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: 30 })}
  />
  <TransitionSeries.Sequence durationInFrames={300}>
    <ContentSlide header="Welcome" content="..." />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

## Slash Commands

| Command | Description |
|---------|-------------|
| `/new-composition <name>` | Create new composition |
| `/generate-image <prompt>` | Generate image (Replicate) |
| `/generate-video <prompt>` | Generate video (Veo 3.1) |
| `/transcribe <file>` | Transcribe audio (Deepgram) |
| `/screenshot <url>` | Full-page screenshot |

## Styling

Default: black background, white text. Override with Tailwind:

```tsx
<TitleSlide title="Hello" className="bg-blue-900 text-yellow-300" />
```

## Assets

Place static files in `public/` and reference with `staticFile()`:

```tsx
import { staticFile } from "remotion";
<Img src={staticFile("images/logo.png")} />
```

## Sample Prompts for Claude Code

### Create a New Video
```
/new-composition product-demo
```

### Basic Slideshow
```
Create a 30-second video with 3 slides:
1. Title "Welcome to My Product" 
2. Content slide with 3 bullet points about features
3. Closing slide with call to action
Use fade transitions between slides.
```

### Code Tutorial
```
Make a code tutorial video showing a Python function.
Start with a title slide, then show the code with syntax highlighting.
Highlight lines 3-5 after 2 seconds. End with a summary slide.
```

### Product Demo with B-Roll
```
Create a product demo:
- Title slide with gradient background
- 3 feature slides with icons
- Background music with fade in/out
- Logo overlay in bottom right corner
Duration: 45 seconds total
```

### Diagram Explanation
```
Create a video explaining system architecture:
1. Title: "How Our API Works"
2. Mermaid flowchart showing client -> API -> database
3. Content slide explaining each component
Use blue/purple theme throughout.
```

### Quick Social Media Clip
```
Make a 15-second vertical video (Portrait-1080p) for Instagram:
- Bold title with emoji-style animation
- 2 quick text reveals
- Strong call to action at end
```
