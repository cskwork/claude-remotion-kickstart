import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CodeSlide } from "../../../components/CodeSlide";
import { CONTENT } from "../content";

export const CodeOverviewSegment: React.FC = () => {
  const frame = useCurrentFrame();

  const labelOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-black">
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 z-10 bg-green-600 px-8 py-3 rounded-full"
        style={{ opacity: labelOpacity }}
      >
        <span className="text-2xl font-bold text-white">
          전체 코드 미리보기
        </span>
      </div>
      <CodeSlide code={CONTENT.pythonCode} language="python" />
    </AbsoluteFill>
  );
};
