import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { CONTENT } from "../content";

export const ProblemsSegment: React.FC = () => {
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

  // 색상 매핑
  const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    red: {
      bg: "bg-red-500/10",
      border: "border-red-400/30",
      text: "text-red-300",
      icon: "text-red-400",
    },
    yellow: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-400/30",
      text: "text-yellow-300",
      icon: "text-yellow-400",
    },
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-400/30",
      text: "text-blue-300",
      icon: "text-blue-400",
    },
  };

  return (
    <AbsoluteFill className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center px-16">
      {/* 타이틀 */}
      <h1
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
        className="text-5xl font-bold text-white mb-16"
      >
        {CONTENT.problems.title}
      </h1>

      {/* 문제점 카드들 */}
      <div className="flex gap-8">
        {CONTENT.problems.items.map((item, index) => {
          const delay = 30 + index * 40;
          const cardOpacity = interpolate(frame, [delay, delay + 30], [0, 1], {
            extrapolateRight: "clamp",
          });
          const cardY = spring({
            frame: Math.max(0, frame - delay),
            fps,
            from: 50,
            to: 0,
            config: { damping: 12, mass: 0.8, stiffness: 100 },
          });

          const colors = colorMap[item.color];

          return (
            <div
              key={index}
              style={{
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
              }}
              className={`${colors.bg} backdrop-blur-sm rounded-2xl p-8 w-80 border ${colors.border}`}
            >
              <div className={`text-4xl font-bold mb-4 ${colors.icon}`}>
                {item.icon}
              </div>
              <h2 className={`text-2xl font-bold mb-3 ${colors.text}`}>
                {item.title}
              </h2>
              <p className="text-lg text-gray-300 whitespace-pre-line leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
