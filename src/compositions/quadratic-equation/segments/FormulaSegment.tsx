import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CONTENT } from "../content";

// x^2 시각화: x * x = x^2 정사각형
const SquareVisualization: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const squareSize = 180;

  // 첫 번째 x 박스 등장
  const x1Scale = spring({
    frame: frame - 60,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // 곱하기 기호
  const multOpacity = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 두 번째 x 박스 등장
  const x2Scale = spring({
    frame: frame - 110,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });

  // 등호
  const equalsOpacity = interpolate(frame, [140, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 결과 정사각형
  const resultScale = spring({
    frame: frame - 170,
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, mass: 0.8 },
  });

  // 정사각형 채우기 애니메이션
  const fillProgress = interpolate(frame, [220, 300], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // x^2 라벨 등장
  const labelOpacity = interpolate(frame, [280, 320], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      {/* 첫 번째 x 박스 */}
      <div
        className="w-24 h-24 border-4 border-pink-300 rounded-xl flex items-center justify-center bg-pink-500/20"
        style={{ transform: `scale(${Math.max(0, x1Scale)})` }}
      >
        <span className="text-5xl font-bold text-white">x</span>
      </div>

      {/* 곱하기 기호 */}
      <span
        className="text-5xl text-yellow-300 font-bold"
        style={{ opacity: multOpacity }}
      >
        x
      </span>

      {/* 두 번째 x 박스 */}
      <div
        className="w-24 h-24 border-4 border-pink-300 rounded-xl flex items-center justify-center bg-pink-500/20"
        style={{ transform: `scale(${Math.max(0, x2Scale)})` }}
      >
        <span className="text-5xl font-bold text-white">x</span>
      </div>

      {/* 등호 */}
      <span
        className="text-5xl text-white font-bold"
        style={{ opacity: equalsOpacity }}
      >
        =
      </span>

      {/* 결과 정사각형 (x^2) */}
      <div
        className="relative border-4 border-yellow-400 rounded-xl overflow-hidden"
        style={{
          width: squareSize,
          height: squareSize,
          transform: `scale(${Math.max(0, resultScale)})`,
        }}
      >
        {/* 채우기 애니메이션 */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400"
          style={{
            clipPath: `polygon(0 0, ${fillProgress}% 0, ${fillProgress}% ${fillProgress}%, 0 ${fillProgress}%)`,
          }}
        />

        {/* 변 라벨 */}
        <span
          className="absolute -left-10 top-1/2 -translate-y-1/2 text-2xl font-bold text-pink-300"
          style={{ opacity: labelOpacity }}
        >
          x
        </span>
        <span
          className="absolute top-[-35px] left-1/2 -translate-x-1/2 text-2xl font-bold text-pink-300"
          style={{ opacity: labelOpacity }}
        >
          x
        </span>

        {/* 중앙 라벨 */}
        <span
          className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white drop-shadow-lg"
          style={{ opacity: labelOpacity }}
        >
          x^2
        </span>
      </div>
    </div>
  );
};

export const FormulaSegment: React.FC = () => {
  const frame = useCurrentFrame();

  // 헤더 페이드인
  const headerOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 설명 텍스트 페이드인
  const textOpacity = interpolate(frame, [300, 340], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textY = interpolate(frame, [300, 340], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-gradient-to-br from-violet-600 to-indigo-500">
      <div className="flex flex-col items-center justify-center h-full px-20">
        {/* 헤더 */}
        <h2
          className="text-6xl font-bold text-white mb-8"
          style={{ opacity: headerOpacity }}
        >
          {CONTENT.formulaHeader}
        </h2>

        {/* x^2 시각화 */}
        <SquareVisualization />

        {/* 설명 텍스트 */}
        <p
          className="text-3xl text-yellow-200 mt-12 text-center max-w-4xl leading-relaxed"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          'x x x'는 x를 두 번 곱한다는 뜻이에요!
        </p>
      </div>
    </AbsoluteFill>
  );
};
