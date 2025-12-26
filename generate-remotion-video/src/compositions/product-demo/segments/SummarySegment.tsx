import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CONTENT } from "../content";

export const SummarySegment: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-gradient-to-br from-green-900 to-emerald-900 flex flex-col items-center justify-center px-24">
      <h2
        className="text-6xl font-bold text-white mb-12"
        style={{ opacity: headerOpacity }}
      >
        {CONTENT.summaryHeader}
      </h2>

      <div className="space-y-6">
        {CONTENT.summaryPoints.map((point, index) => {
          const pointOpacity = interpolate(
            frame,
            [20 + index * 15, 35 + index * 15],
            [0, 1],
            { extrapolateRight: "clamp" }
          );

          const slideIn = interpolate(
            frame,
            [20 + index * 15, 35 + index * 15],
            [-30, 0],
            { extrapolateRight: "clamp" }
          );

          return (
            <div
              key={index}
              className="flex items-center gap-6"
              style={{
                opacity: pointOpacity,
                transform: `translateX(${slideIn}px)`,
              }}
            >
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-white">
                  {index + 1}
                </span>
              </div>
              <p className="text-3xl text-gray-100">{point}</p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
