import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { CONTENT } from "../content";

export const SolutionHallucinationSegment: React.FC = () => {
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
    <AbsoluteFill className="bg-gradient-to-br from-slate-900 via-red-900/30 to-slate-900 flex flex-col items-center justify-center px-20">
      {/* 상단 레이블 */}
      <div
        style={{ opacity: titleOpacity }}
        className="absolute top-16 left-16 bg-red-500/20 px-4 py-2 rounded-full border border-red-400/30"
      >
        <span className="text-red-300 text-lg font-medium">해결책 3</span>
      </div>

      {/* 타이틀 */}
      <h1
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
        className="text-5xl font-bold text-white mb-2"
      >
        {CONTENT.solutionHallucination.title}
      </h1>

      <p
        style={{ opacity: titleOpacity }}
        className="text-2xl text-red-300 mb-12"
      >
        {CONTENT.solutionHallucination.subtitle}
      </p>

      {/* 전략 카드들 - 2행 배치 */}
      <div className="grid grid-cols-3 gap-6 max-w-5xl">
        {CONTENT.solutionHallucination.strategies.map((strategy, index) => {
          const delay = 30 + index * 40;
          const cardOpacity = interpolate(frame, [delay, delay + 30], [0, 1], {
            extrapolateRight: "clamp",
          });
          const cardY = spring({
            frame: Math.max(0, frame - delay),
            fps,
            from: 40,
            to: 0,
            config: { damping: 12, mass: 0.8, stiffness: 100 },
          });

          // 그라데이션 색상
          const gradients = [
            "from-purple-500/20 to-purple-600/10",
            "from-cyan-500/20 to-cyan-600/10",
            "from-pink-500/20 to-pink-600/10",
            "from-emerald-500/20 to-emerald-600/10",
            "from-orange-500/20 to-orange-600/10",
          ];

          const borderColors = [
            "border-purple-400/30",
            "border-cyan-400/30",
            "border-pink-400/30",
            "border-emerald-400/30",
            "border-orange-400/30",
          ];

          const textColors = [
            "text-purple-300",
            "text-cyan-300",
            "text-pink-300",
            "text-emerald-300",
            "text-orange-300",
          ];

          return (
            <div
              key={index}
              style={{
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
              }}
              className={`bg-gradient-to-br ${gradients[index]} backdrop-blur-sm rounded-xl p-6 border ${borderColors[index]}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-2xl font-bold ${textColors[index]}`}>
                  {index + 1}
                </span>
                <h3 className={`text-xl font-bold ${textColors[index]}`}>
                  {strategy.title}
                </h3>
              </div>
              <p className="text-lg text-gray-300">{strategy.desc}</p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
