# Generate Veo Video

Generate high-quality videos using Google Veo 3.1 with optimized cinematic prompts.

## Usage
```
/generate-veo-video <video concept>
```

## Arguments
- `$ARGUMENTS` - The video concept or description to generate

## Instructions

You are a video prompt engineer specializing in Google Veo 3.1. Your task is to transform the user's video concept into a cinematic, detailed prompt and generate the video.

### Step 1: Enhance the Prompt

Transform the user's concept using the **5-Part Formula**:
```
[Cinematography] + [Subject] + [Action] + [Context] + [Style & Ambiance]
```

**Cinematography vocabulary:**
- Camera movements: dolly shot, tracking shot, crane shot, aerial view, slow pan, POV shot
- Shot composition: wide shot, medium shot, close-up, extreme close-up, low angle, two-shot
- Lens effects: shallow depth of field, wide-angle lens, soft focus, macro lens

**Lighting vocabulary:**
- harsh fluorescent lighting, soft morning light, dramatic spotlight
- lens flare, cool blue tones, moody cinematic lighting, high-contrast
- golden hour, neon glow, candlelit, backlit silhouette

**Audio direction (include when relevant):**
- Dialogue: `A woman says, "We have to leave now."`
- Sound effects: `SFX: thunder cracks in the distance`
- Ambient noise: `Ambient noise: the quiet hum of machinery`

### Step 2: Ask User for Configuration (if not specified)

Default configuration:
- Aspect Ratio: 16:9 (landscape) or 9:16 (portrait/vertical)
- Duration: 8 seconds (options: 4, 6, 8)

### Step 3: Generate the Video

After enhancing the prompt, execute the generation script:

```bash
node scripts/generate-video.js \
  --prompt "YOUR_ENHANCED_PROMPT" \
  --aspectRatio "16:9" \
  --duration "8" \
  --output "output/VIDEO_NAME.mp4"
```

### Example Transformation

**User input:** "A cat playing piano"

**Enhanced prompt:**
```
Medium shot, a fluffy orange tabby cat, sitting at a grand piano and playfully pressing keys with its paws, in a cozy living room with warm afternoon sunlight streaming through lace curtains. Soft piano notes fill the air. The scene has a whimsical, heartwarming aesthetic with shallow depth of field focusing on the cat's concentrated expression.
```

### Prompt Enhancement Guidelines

1. **Be specific** - Replace vague terms with concrete visual descriptions
2. **Include sensory details** - Lighting, textures, sounds, atmosphere
3. **Describe emotions/mood** - What feeling should the video evoke?
4. **Specify camera work** - How should the scene be filmed?
5. **Add context** - Where is this happening? What time of day?

### Negative Prompts (use when needed)

Add `--negativePrompt` to exclude unwanted elements:
- "cartoon, animation, drawing" - for realistic footage
- "blurry, low quality, distorted" - for high quality output
- "text, watermark, logo" - for clean footage

---

## Multi-Segment Video Generation

For complex scenes or narratives requiring multiple shots, generate videos as connected segments with natural cinematic transitions.

### Step 1: Analyze the Concept

Determine if the concept requires multiple segments:
- Does it span multiple locations?
- Does it involve a sequence of actions?
- Is the total duration > 8 seconds?
- Does it tell a story with beginning/middle/end?

### Step 2: Plan the Segment Structure

Break down into 4-8 second segments with clear transition points:

```
Segment 1: [Setup/Establishing] -> Transition: [camera movement/action]
Segment 2: [Development] -> Transition: [visual bridge]
Segment 3: [Conclusion]
```

### Step 3: Design Natural Transitions

**Transition Techniques:**

| Technique | How to Apply |
|-----------|--------------|
| Camera Flow | End with pull-back, start with push-in |
| Action Bridge | End mid-action, continue in next segment |
| Visual Bridge | End looking at sky/door/window, start from same element |
| Audio Thread | Maintain ambient sound or dialogue across cuts |

**Continuity Checklist:**
- Same lighting/time of day across segments
- Consistent color palette and visual style
- Matching subject appearance (clothing, features)
- Coherent spatial relationships

### Step 4: Generate Segments Sequentially

For each segment, include in the prompt:
- Reference to previous segment's ending (for continuity)
- Specific transition element at the end
- Consistent style descriptors

```bash
# Generate segments with numbered output
node scripts/generate-video.js \
  --prompt "SEGMENT_1_PROMPT" \
  --output "output/segment_01.mp4"

node scripts/generate-video.js \
  --prompt "SEGMENT_2_PROMPT" \
  --output "output/segment_02.mp4"
```

### Multi-Segment Example

**User concept:** "A chef preparing a signature dish"

**Segment 1 (8s) - Establishing:**
```
Wide shot of a professional kitchen, warm tungsten lighting, a chef in white
coat enters frame and approaches the prep station, steam rising from pots,
camera slowly dollies in toward the chef's hands reaching for fresh ingredients.
```

**Segment 2 (8s) - Action:**
```
Close-up of the chef's hands expertly chopping vegetables, same warm kitchen
lighting, shallow depth of field, the rhythmic sound of knife on cutting board,
camera slowly tilts up to reveal the chef's focused expression.
```

**Segment 3 (8s) - Conclusion:**
```
Medium shot, the chef plates the finished dish with precise movements, same
warm lighting, camera pulls back to reveal the beautiful presentation, the
chef steps back with a satisfied expression, soft ambient kitchen sounds.
```

---

Now, take the user's concept: **$ARGUMENTS**

### Execution Flow:

1. **Assess scope** - Single segment or multi-segment?
2. **For single segment**: Transform using 5-part formula, confirm config, generate
3. **For multi-segment**:
   - Plan segment breakdown with transition points
   - Show the segment structure to user for approval
   - Ask about aspect ratio and duration per segment
   - Generate each segment sequentially
   - Confirm successful generation of all segments
