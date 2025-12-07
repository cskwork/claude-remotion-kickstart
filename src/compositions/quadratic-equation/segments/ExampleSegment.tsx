import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CONTENT } from "../content";

// 격자 셀 컴포넌트
const GridCell: React.FC<{ index: number; delay: number }> = ({
  index,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 150 },
  });

  const colors = [
    "bg-emerald-400",
    "bg-teal-400",
    "bg-cyan-400",
    "bg-green-400",
  ];
  const row = Math.floor(index / 4);
  const col = index % 4;
  const colorIndex = (row + col) % 4;

  return (
    <div
      className={`${colors[colorIndex]} rounded-md`}
      style={{
        width: 52,
        height: 52,
        margin: 3,
        transform: `scale(${Math.max(0, scale)})`,
      }}
    />
  );
};

// 넓이 시각화 컴포넌트
const AreaVisualization: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gridStartFrame = 120;
  const cellDelay = 8;

  // 외곽선 그리기 애니메이션
  const borderOpacity = interpolate(frame, [60, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 변 라벨
  const labelOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 카운터 애니메이션 (16셀이 다 나온 후)
  const countStartFrame = gridStartFrame + 16 * cellDelay + 30;
  const countProgress = interpolate(
    frame,
    [countStartFrame, countStartFrame + 60],
    [0, 16],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  const count = Math.floor(countProgress);

  const countOpacity = interpolate(
    frame,
    [countStartFrame, countStartFrame + 20],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 답 공개 애니메이션
  const answerStartFrame = countStartFrame + 80;
  const answerScale = spring({
    frame: frame - answerStartFrame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 80 },
  });

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-start gap-16">
        {/* 정사각형 격자 */}
        <div className="relative">
          {/* 외곽선 */}
          <div
            className="border-4 border-white rounded-xl p-3"
            style={{
              opacity: borderOpacity,
              width: 240,
              height: 240,
            }}
          >
            {/* 격자 셀들 */}
            <div className="grid grid-cols-4">
              {Array.from({ length: 16 }).map((_, i) => (
                <GridCell key={i} index={i} delay={gridStartFrame + i * cellDelay} />
              ))}
            </div>
          </div>

          {/* 변 라벨 */}
          <span
            className="absolute -left-16 top-1/2 -translate-y-1/2 text-3xl font-bold text-yellow-300"
            style={{ opacity: labelOpacity }}
          >
            4m
          </span>
          <span
            className="absolute -top-12 left-1/2 -translate-x-1/2 text-3xl font-bold text-yellow-300"
            style={{ opacity: labelOpacity }}
          >
            4m
          </span>
        </div>

        {/* 오른쪽 정보 패널 */}
        <div className="flex flex-col justify-center h-60">
          {/* 문제 설명 */}
          <div
            className="text-2xl text-white/80 mb-6"
            style={{ opacity: labelOpacity }}
          >
            정사각형의 넓이가 16m^2
          </div>

          {/* 카운터 */}
          <div
            className="text-4xl text-white font-bold mb-4"
            style={{ opacity: countOpacity }}
          >
            넓이 = <span className="text-yellow-300">{count}</span> m^2
          </div>

          {/* 답 */}
          <div
            className="text-5xl font-bold text-emerald-300"
            style={{ transform: `scale(${Math.max(0, answerScale)})` }}
          >
            x = 4 !
          </div>
        </div>
      </div>
    </div>
  );
};

export const ExampleSegment: React.FC = () => {
  const frame = useCurrentFrame();

  // 헤더 페이드인
  const headerOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headerY = interpolate(frame, [0, 30], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-gradient-to-br from-orange-500 to-amber-400">
      <div className="flex flex-col items-center justify-center h-full px-20">
        {/* 헤더 */}
        <h2
          className="text-6xl font-bold text-white mb-12 drop-shadow-lg"
          style={{
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
          }}
        >
          {CONTENT.exampleHeader}
        </h2>

        {/* 넓이 시각화 */}
        <AreaVisualization />
      </div>
    </AbsoluteFill>
  );
};
