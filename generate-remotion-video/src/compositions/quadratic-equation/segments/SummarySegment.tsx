import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CONTENT } from "../content";

// 요약 포인트 컴포넌트
const SummaryPoint: React.FC<{
  text: string;
  delay: number;
  icon: string;
}> = ({ text, delay, icon }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideX = interpolate(frame, [delay, delay + 25], [-80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const checkScale = spring({
    frame: frame - delay - 15,
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 120 },
  });

  return (
    <div
      className="flex items-center gap-5 mb-6"
      style={{
        transform: `translateX(${slideX}px)`,
        opacity,
      }}
    >
      <span
        className="text-4xl"
        style={{ transform: `scale(${Math.max(0, checkScale)})` }}
      >
        {icon}
      </span>
      <span className="text-3xl text-white leading-relaxed">{text}</span>
    </div>
  );
};

export const SummarySegment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 헤더 애니메이션
  const headerScale = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  const headerOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 마무리 메시지
  const closingOpacity = interpolate(frame, [180, 220], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const closingScale = spring({
    frame: frame - 180,
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 15, stiffness: 80 },
  });

  return (
    <AbsoluteFill className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500">
      <div className="flex flex-col items-center justify-center h-full px-24">
        {/* 헤더 */}
        <h2
          className="text-7xl font-bold text-white mb-12 drop-shadow-lg"
          style={{
            opacity: headerOpacity,
            transform: `scale(${headerScale})`,
          }}
        >
          {CONTENT.summaryHeader}
        </h2>

        {/* 요약 포인트들 */}
        <div className="flex flex-col items-start">
          <SummaryPoint
            text="이차방정식은 x^2(x의 제곱)이 있는 방정식이에요"
            delay={40}
            icon="1"
          />
          <SummaryPoint
            text="x를 두 번 곱하면 x^2가 돼요"
            delay={70}
            icon="2"
          />
          <SummaryPoint
            text="넓이나 거리를 구할 때 많이 사용해요"
            delay={100}
            icon="3"
          />
        </div>

        {/* 마무리 메시지 */}
        <div
          className="mt-12 text-4xl font-bold text-yellow-300 text-center"
          style={{
            opacity: closingOpacity,
            transform: `scale(${Math.max(0, closingScale)})`,
          }}
        >
          이제 이차방정식이 뭔지 알겠죠?
        </div>
      </div>
    </AbsoluteFill>
  );
};
