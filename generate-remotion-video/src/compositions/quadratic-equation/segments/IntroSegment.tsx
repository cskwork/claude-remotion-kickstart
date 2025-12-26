import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CONTENT } from "../content";

// ? + 3 = 5 에서 ?가 2로 변하는 애니메이션
const EquationDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 방정식 등장
  const equationOpacity = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ? 깜빡임 효과
  const questionBlink =
    frame < 180 ? (Math.sin(frame / 8) > 0 ? 1 : 0.6) : 0;

  // ? -> 2 변환
  const showAnswer = frame > 180;
  const answerScale = spring({
    frame: frame - 180,
    fps,
    from: 2,
    to: 1,
    config: { damping: 10, stiffness: 100 },
  });

  const answerOpacity = interpolate(frame, [180, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 정답 강조 효과
  const glowIntensity = showAnswer
    ? interpolate(frame, [180, 220, 260], [0, 1, 0.3], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <div
      className="flex items-center justify-center gap-4 mt-8"
      style={{ opacity: equationOpacity }}
    >
      {/* ? 또는 2 */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* 물음표 */}
        <span
          className="text-6xl font-bold text-yellow-300 absolute"
          style={{ opacity: showAnswer ? 0 : questionBlink }}
        >
          ?
        </span>
        {/* 정답 2 */}
        <span
          className="text-6xl font-bold text-emerald-300 absolute"
          style={{
            opacity: answerOpacity,
            transform: `scale(${showAnswer ? answerScale : 0})`,
            textShadow: `0 0 ${glowIntensity * 30}px rgba(16, 185, 129, 0.8)`,
          }}
        >
          2
        </span>
      </div>

      <span className="text-5xl font-bold text-white">+</span>
      <span className="text-5xl font-bold text-pink-300">3</span>
      <span className="text-5xl font-bold text-white">=</span>
      <span className="text-5xl font-bold text-pink-300">5</span>
    </div>
  );
};

export const IntroSegment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 헤더 스프링 애니메이션
  const headerScale = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 15, stiffness: 100 },
  });

  const headerOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 설명 텍스트 페이드인
  const textOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textX = interpolate(frame, [30, 60], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-gradient-to-br from-emerald-500 to-teal-400">
      <div className="flex flex-col items-center justify-center h-full px-24">
        {/* 헤더 */}
        <h2
          className="text-7xl font-bold text-white mb-6 drop-shadow-lg"
          style={{
            opacity: headerOpacity,
            transform: `scale(${headerScale})`,
          }}
        >
          {CONTENT.introHeader}
        </h2>

        {/* 설명 텍스트 */}
        <p
          className="text-3xl text-white/90 text-center max-w-4xl leading-relaxed mb-8"
          style={{
            opacity: textOpacity,
            transform: `translateX(${textX}px)`,
          }}
        >
          방정식은 '모르는 숫자를 찾는 퀴즈'예요!
        </p>

        {/* 방정식 데모 */}
        <EquationDemo />

        {/* 추가 설명 */}
        <p
          className="text-2xl text-yellow-200 mt-10"
          style={{
            opacity: interpolate(frame, [220, 260], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          이렇게 모르는 숫자(x)를 찾는 것이 방정식이에요!
        </p>
      </div>
    </AbsoluteFill>
  );
};
