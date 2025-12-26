import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CONTENT } from "../content";

export const ConceptSegment: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const bodyOpacity = interpolate(frame, [15, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-slate-900 flex flex-col items-center justify-center px-24">
      <div className="bg-slate-800 rounded-2xl p-16 max-w-4xl shadow-2xl">
        <h2
          className="text-6xl font-bold text-yellow-400 mb-10 text-center"
          style={{ opacity: headerOpacity }}
        >
          {CONTENT.conceptHeader}
        </h2>
        <p
          className="text-3xl text-gray-200 leading-relaxed text-center whitespace-pre-line"
          style={{ opacity: bodyOpacity }}
        >
          {CONTENT.conceptBody}
        </p>
      </div>
    </AbsoluteFill>
  );
};
