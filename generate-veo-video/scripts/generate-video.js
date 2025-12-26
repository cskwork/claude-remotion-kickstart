#!/usr/bin/env node

/**
 * Veo 3.1 Video Generation Script
 * Usage: node scripts/generate-video.js --prompt "..." [--aspectRatio 16:9] [--duration 8] [--output output/video.mp4]
 */

import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";
import { parseArgs } from "node:util";
import path from "node:path";
import fs from "node:fs";

config();

// CLI 인자 파싱
const { values } = parseArgs({
  options: {
    prompt: { type: "string", short: "p" },
    aspectRatio: { type: "string", short: "a", default: "16:9" },
    duration: { type: "string", short: "d", default: "8" },
    output: { type: "string", short: "o", default: "output/video.mp4" },
    negativePrompt: { type: "string", short: "n" },
  },
});

if (!values.prompt) {
  console.error("Error: --prompt is required");
  console.log(
    'Usage: node scripts/generate-video.js --prompt "Your video description"'
  );
  console.log("Options:");
  console.log("  --prompt, -p       Video prompt (required)");
  console.log('  --aspectRatio, -a  Aspect ratio: "16:9" or "9:16" (default: "16:9")');
  console.log('  --duration, -d     Duration: "4", "6", or "8" seconds (default: "8")');
  console.log("  --output, -o       Output file path (default: output/video.mp4)");
  console.log("  --negativePrompt, -n  Elements to exclude from video");
  process.exit(1);
}

if (!process.env.GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY environment variable is not set");
  process.exit(1);
}

// 출력 디렉토리 생성
const outputDir = path.dirname(values.output);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateVideo() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const model = process.env.VEO_MODEL || "veo-3.1-generate-preview";

  console.log("Starting video generation...");
  console.log(`Model: ${model}`);
  console.log(`Prompt: ${values.prompt}`);
  console.log(`Aspect Ratio: ${values.aspectRatio}`);
  console.log(`Duration: ${values.duration}s`);
  console.log(`Output: ${values.output}`);

  // 설정 구성
  const generateConfig = {
    aspectRatio: values.aspectRatio,
    durationSeconds: parseInt(values.duration, 10),
  };

  if (values.negativePrompt) {
    generateConfig.negativePrompt = values.negativePrompt;
  }

  try {
    let operation = await ai.models.generateVideos({
      model: model,
      prompt: values.prompt,
      config: generateConfig,
    });

    console.log("Video generation started. Polling for completion...");

    // 완료까지 폴링 (10초 간격)
    let pollCount = 0;
    while (!operation.done) {
      pollCount++;
      console.log(`Waiting for video generation... (poll #${pollCount})`);
      await new Promise((resolve) => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({
        operation: operation,
      });
    }

    // 결과 확인
    if (
      !operation.response?.generatedVideos ||
      operation.response.generatedVideos.length === 0
    ) {
      console.error("Error: No video was generated");
      process.exit(1);
    }

    console.log("Video generation complete. Downloading...");

    // 비디오 다운로드
    await ai.files.download({
      file: operation.response.generatedVideos[0].video,
      downloadPath: values.output,
    });

    console.log(`Video saved to: ${values.output}`);
  } catch (error) {
    console.error("Error generating video:", error.message);
    if (error.response) {
      console.error("Response:", JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

generateVideo();
