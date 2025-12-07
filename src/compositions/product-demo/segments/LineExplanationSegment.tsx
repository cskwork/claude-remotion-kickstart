import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CodeSlide } from "../../../components/CodeSlide";
import { CONTENT } from "../content";

interface LineExplanationProps {
  header: string;
  body: string;
  highlightLines: string;
  stepNumber: number;
}

export const LineExplanationSegment: React.FC<LineExplanationProps> = ({
  header,
  body,
  highlightLines,
  stepNumber,
}) => {
  const frame = useCurrentFrame();

  const explanationOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  const slideIn = interpolate(frame, [0, 20], [-50, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-slate-900 flex">
      {/* 코드 영역 (좌측 60%) */}
      <div className="w-[60%] h-full">
        <CodeSlide
          code={CONTENT.pythonCode}
          language="python"
          highlightLines={highlightLines}
        />
      </div>

      {/* 설명 영역 (우측 40%) */}
      <div
        className="w-[40%] h-full flex flex-col justify-center px-10 bg-slate-800"
        style={{
          opacity: explanationOpacity,
          transform: `translateX(${slideIn}px)`,
        }}
      >
        {/* 단계 표시 */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{stepNumber}</span>
          </div>
          <div className="h-1 flex-1 bg-blue-500/30 rounded" />
        </div>

        <h3 className="text-4xl font-bold text-yellow-400 mb-6">{header}</h3>
        <p className="text-2xl text-gray-200 leading-relaxed whitespace-pre-line">
          {body}
        </p>
      </div>
    </AbsoluteFill>
  );
};

// 개별 세그먼트 컴포넌트들
export const Line1Segment: React.FC = () => (
  <LineExplanationSegment
    header={CONTENT.line1.header}
    body={CONTENT.line1.body}
    highlightLines={CONTENT.line1.highlight}
    stepNumber={1}
  />
);

export const Line2Segment: React.FC = () => (
  <LineExplanationSegment
    header={CONTENT.line2.header}
    body={CONTENT.line2.body}
    highlightLines={CONTENT.line2.highlight}
    stepNumber={2}
  />
);

export const Line3to5Segment: React.FC = () => (
  <LineExplanationSegment
    header={CONTENT.line3to5.header}
    body={CONTENT.line3to5.body}
    highlightLines={CONTENT.line3to5.highlight}
    stepNumber={3}
  />
);

export const UsageSegment: React.FC = () => (
  <LineExplanationSegment
    header={CONTENT.usage.header}
    body={CONTENT.usage.body}
    highlightLines={CONTENT.usage.highlight}
    stepNumber={4}
  />
);
