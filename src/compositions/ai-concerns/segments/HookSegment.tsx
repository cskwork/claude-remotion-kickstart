import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { CONTENT } from "../content";

export const HookSegment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 시나리오 애니메이션
  const scenarioOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scenarioY = spring({
    frame,
    fps,
    from: 30,
    to: 0,
    config: { damping: 12, mass: 0.8, stiffness: 100 },
  });

  // 요청 애니메이션 (1.5초 후 등장)
  const requestOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateRight: "clamp",
  });

  const requestY = spring({
    frame: Math.max(0, frame - 90),
    fps,
    from: 30,
    to: 0,
    config: { damping: 12, mass: 0.8, stiffness: 100 },
  });

  return (
    <AbsoluteFill className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center px-20">
      {/* 채팅 버블 스타일 */}
      <div
        style={{
          opacity: scenarioOpacity,
          transform: `translateY(${scenarioY}px)`,
        }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-3xl border border-white/20"
      >
        <p className="text-3xl text-white leading-relaxed whitespace-pre-line">
          {CONTENT.hook.scenario}
        </p>
      </div>

      {/* AI 요청 */}
      <div
        style={{
          opacity: requestOpacity,
          transform: `translateY(${requestY}px)`,
        }}
        className="bg-purple-500/20 backdrop-blur-sm rounded-2xl p-8 max-w-3xl border border-purple-400/30"
      >
        <p className="text-2xl text-purple-200 leading-relaxed whitespace-pre-line">
          {CONTENT.hook.request}
        </p>
      </div>

      {/* AI 아이콘 */}
      <div
        style={{ opacity: requestOpacity }}
        className="absolute bottom-16 right-16 text-6xl"
      >
        AI
      </div>
    </AbsoluteFill>
  );
};
