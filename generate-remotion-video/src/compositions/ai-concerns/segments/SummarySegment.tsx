import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { CONTENT } from "../content";

export const SummarySegment: React.FC = () => {
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

  // CTA 애니메이션
  const ctaOpacity = interpolate(frame, [300, 330], [0, 1], {
    extrapolateRight: "clamp",
  });

  const ctaScale = spring({
    frame: Math.max(0, frame - 300),
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 10, mass: 1, stiffness: 80 },
  });

  // 색상 배열
  const colors = [
    { dot: "bg-blue-400", text: "text-blue-200" },
    { dot: "bg-yellow-400", text: "text-yellow-200" },
    { dot: "bg-red-400", text: "text-red-200" },
  ];

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
        {CONTENT.summary.title}
      </h1>

      {/* 포인트들 */}
      <div className="space-y-6 mb-16">
        {CONTENT.summary.points.map((point, index) => {
          const delay = 30 + index * 50;
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
              <div className={`w-4 h-4 rounded-full ${colors[index].dot}`} />
              <p className={`text-2xl ${colors[index].text}`}>{point}</p>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
        }}
        className="bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl px-12 py-6"
      >
        <p className="text-3xl font-bold text-white">
          {CONTENT.summary.cta}
        </p>
      </div>
    </AbsoluteFill>
  );
};
