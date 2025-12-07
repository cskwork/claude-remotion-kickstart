import { Series, useVideoConfig } from "remotion";
import { TitleSegment } from "./segments/TitleSegment";
import { IntroSegment } from "./segments/IntroSegment";
import { FormulaSegment } from "./segments/FormulaSegment";
import { ExampleSegment } from "./segments/ExampleSegment";
import { SummarySegment } from "./segments/SummarySegment";
import { getDurationInFrames } from "../../config";
import {
  TITLE_DURATION_SECONDS,
  INTRO_DURATION_SECONDS,
  FORMULA_DURATION_SECONDS,
  EXAMPLE_DURATION_SECONDS,
  SUMMARY_DURATION_SECONDS,
} from "./config";
import { createComposition } from "../../utils/createComposition";

const QuadraticEquationComposition: React.FC = () => {
  const { fps } = useVideoConfig();
  const titleDuration = getDurationInFrames(TITLE_DURATION_SECONDS, fps);
  const introDuration = getDurationInFrames(INTRO_DURATION_SECONDS, fps);
  const formulaDuration = getDurationInFrames(FORMULA_DURATION_SECONDS, fps);
  const exampleDuration = getDurationInFrames(EXAMPLE_DURATION_SECONDS, fps);
  const summaryDuration = getDurationInFrames(SUMMARY_DURATION_SECONDS, fps);

  return (
    <Series>
      <Series.Sequence durationInFrames={titleDuration}>
        <TitleSegment />
      </Series.Sequence>
      <Series.Sequence durationInFrames={introDuration}>
        <IntroSegment />
      </Series.Sequence>
      <Series.Sequence durationInFrames={formulaDuration}>
        <FormulaSegment />
      </Series.Sequence>
      <Series.Sequence durationInFrames={exampleDuration}>
        <ExampleSegment />
      </Series.Sequence>
      <Series.Sequence durationInFrames={summaryDuration}>
        <SummarySegment />
      </Series.Sequence>
    </Series>
  );
};

const TOTAL_DURATION_SECONDS =
  TITLE_DURATION_SECONDS +
  INTRO_DURATION_SECONDS +
  FORMULA_DURATION_SECONDS +
  EXAMPLE_DURATION_SECONDS +
  SUMMARY_DURATION_SECONDS;

export const QuadraticEquation = createComposition({
  name: "QuadraticEquation",
  component: QuadraticEquationComposition,
  durationInSeconds: TOTAL_DURATION_SECONDS,
  preset: "Landscape-1080p",
});
