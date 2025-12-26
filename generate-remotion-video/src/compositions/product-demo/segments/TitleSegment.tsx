import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CONTENT } from "../content";

export const TitleSegment: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-gradient-to-br from-blue-900 to-indigo-900 flex flex-col items-center justify-center">
      <h1
        className="text-8xl font-bold text-white mb-8"
        style={{ opacity: titleOpacity }}
      >
        {CONTENT.title}
      </h1>
      <p
        className="text-4xl text-blue-200"
        style={{ opacity: subtitleOpacity }}
      >
        {CONTENT.subtitle}
      </p>
    </AbsoluteFill>
  );
};
