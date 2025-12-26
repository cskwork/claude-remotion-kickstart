import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { CONTENT } from "../content";

export const WhyUseSegment: React.FC = () => {
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

  // 펀치라인 애니메이션 (5초 후)
  const punchlineOpacity = interpolate(frame, [300, 330], [0, 1], {
    extrapolateRight: "clamp",
  });

  const punchlineScale = spring({
    frame: Math.max(0, frame - 300),
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 10, mass: 1, stiffness: 80 },
  });

  return (
    <AbsoluteFill className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center px-20">
      {/* 타이틀 */}
      <h1
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
        className="text-5xl font-bold text-white mb-12"
      >
        {CONTENT.whyUse.title}
      </h1>

      {/* 포인트들 */}
      <div className="space-y-4 mb-16">
        {CONTENT.whyUse.points.map((point, index) => {
          const delay = 40 + index * 50;
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
              <div className="w-3 h-3 rounded-full bg-cyan-400" />
              <p className="text-2xl text-gray-200">{point}</p>
            </div>
          );
        })}
      </div>

      {/* 펀치라인 */}
      <div
        style={{
          opacity: punchlineOpacity,
          transform: `scale(${punchlineScale})`,
        }}
        className="bg-gradient-to-r from-purple-500/30 to-cyan-500/30 backdrop-blur-sm rounded-2xl p-10 border border-purple-400/30"
      >
        <p className="text-3xl font-bold text-white text-center whitespace-pre-line leading-relaxed">
          {CONTENT.whyUse.punchline}
        </p>
      </div>
    </AbsoluteFill>
  );
};
