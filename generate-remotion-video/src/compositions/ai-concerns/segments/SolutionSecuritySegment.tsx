import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { CONTENT } from "../content";

export const SolutionSecuritySegment: React.FC = () => {
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

  // 경고 애니메이션
  const warningOpacity = interpolate(frame, [200, 230], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-gradient-to-br from-slate-900 via-yellow-900/50 to-slate-900 flex flex-col items-center justify-center px-20">
      {/* 상단 레이블 */}
      <div
        style={{ opacity: titleOpacity }}
        className="absolute top-16 left-16 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-400/30"
      >
        <span className="text-yellow-300 text-lg font-medium">해결책 2</span>
      </div>

      {/* 타이틀 */}
      <h1
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
        className="text-5xl font-bold text-white mb-2"
      >
        {CONTENT.solutionSecurity.title}
      </h1>

      <p
        style={{ opacity: titleOpacity }}
        className="text-2xl text-yellow-300 mb-12"
      >
        {CONTENT.solutionSecurity.subtitle}
      </p>

      {/* 포인트들 */}
      <div className="space-y-6 mb-12">
        {CONTENT.solutionSecurity.points.map((point, index) => {
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
              <div className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center">
                <span className="text-green-400 text-xl">V</span>
              </div>
              <p className="text-2xl text-gray-200">{point}</p>
            </div>
          );
        })}
      </div>

      {/* 경고 박스 */}
      <div
        style={{ opacity: warningOpacity }}
        className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-400/30 flex items-center gap-4"
      >
        <div className="text-4xl text-red-400">!</div>
        <div>
          <h3 className="text-xl font-bold text-red-300 mb-1">
            {CONTENT.solutionSecurity.warning.title}
          </h3>
          <p className="text-lg text-red-200">
            {CONTENT.solutionSecurity.warning.content}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
