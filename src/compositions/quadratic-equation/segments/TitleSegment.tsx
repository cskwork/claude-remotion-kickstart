import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CONTENT } from "../content";

// 배경에 떠다니는 장식용 사각형
const FloatingSquare: React.FC<{
  delay: number;
  size: number;
  x: number;
  y: number;
}> = ({ delay, size, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  });

  const rotation = interpolate(frame, [0, 600], [0, 360]);
  const floatY = Math.sin((frame + delay) / 30) * 15;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + floatY,
        width: size,
        height: size,
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: 12,
        transform: `scale(${Math.max(0, scale)}) rotate(${rotation}deg)`,
      }}
    />
  );
};

export const TitleSegment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 타이틀 스프링 애니메이션
  const titleScale = spring({
    frame,
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 12, mass: 0.8, stiffness: 100 },
  });

  const titleOpacity = spring({ frame, fps, config: { damping: 200 } });

  // 서브타이틀 지연 페이드 + 슬라이드
  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [30, 60], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* 떠다니는 장식 사각형들 */}
      <FloatingSquare delay={0} size={80} x={100} y={150} />
      <FloatingSquare delay={10} size={50} x={1700} y={200} />
      <FloatingSquare delay={20} size={100} x={150} y={750} />
      <FloatingSquare delay={15} size={60} x={1650} y={700} />
      <FloatingSquare delay={25} size={70} x={900} y={100} />
      <FloatingSquare delay={30} size={45} x={1400} y={850} />

      <div className="flex flex-col items-center justify-center h-full">
        <h1
          className="text-8xl font-bold text-white drop-shadow-lg"
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
          }}
        >
          {CONTENT.title}
        </h1>
        <p
          className="text-4xl text-yellow-200 mt-8"
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          {CONTENT.subtitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};
