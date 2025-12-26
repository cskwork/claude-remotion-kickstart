import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { CONTENT } from "../content";

export const SolutionDifficultySegment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 타이틀 애니메이션
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleScale = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 12, mass: 0.8, stiffness: 100 },
  });

  return (
    <AbsoluteFill className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col items-center justify-center px-20">
      {/* 상단 레이블 */}
      <div
        style={{ opacity: titleOpacity }}
        className="absolute top-16 left-16 bg-blue-500/20 px-4 py-2 rounded-full border border-blue-400/30"
      >
        <span className="text-blue-300 text-lg font-medium">해결책 1</span>
      </div>

      {/* 타이틀 */}
      <h1
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
        className="text-5xl font-bold text-white mb-2"
      >
        {CONTENT.solutionDifficulty.title}
      </h1>

      <p
        style={{ opacity: titleOpacity }}
        className="text-2xl text-blue-300 mb-12"
      >
        {CONTENT.solutionDifficulty.subtitle}
      </p>

      {/* 포인트들 */}
      <div className="space-y-6 mb-12">
        {CONTENT.solutionDifficulty.points.map((point, index) => {
          const delay = 30 + index * 40;
          const pointOpacity = interpolate(frame, [delay, delay + 30], [0, 1], {
            extrapolateRight: "clamp",
          });
          const pointX = spring({
            frame: Math.max(0, frame - delay),
            fps,
            from: -30,
            to: 0,
            config: { damping: 12, mass: 0.8, stiffness: 100 },
          });

          return (
            <div
              key={index}
              style={{
                opacity: pointOpacity,
                transform: `translateX(${pointX}px)`,
              }}
              className="flex items-center gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center border border-blue-400/50">
                <span className="text-blue-300 font-bold">{index + 1}</span>
              </div>
              <p className="text-2xl text-gray-200">{point}</p>
            </div>
          );
        })}
      </div>

      {/* MCP 예시 */}
      <div className="flex gap-4">
        {CONTENT.solutionDifficulty.mcpExamples.map((example, index) => {
          const delay = 120 + index * 30;
          const chipOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateRight: "clamp",
          });
          const chipScale = spring({
            frame: Math.max(0, frame - delay),
            fps,
            from: 0.5,
            to: 1,
            config: { damping: 10, mass: 0.5, stiffness: 150 },
          });

          return (
            <div
              key={index}
              style={{
                opacity: chipOpacity,
                transform: `scale(${chipScale})`,
              }}
              className="bg-blue-500/20 px-6 py-3 rounded-xl border border-blue-400/30"
            >
              <span className="text-xl text-blue-200 font-medium">{example}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
