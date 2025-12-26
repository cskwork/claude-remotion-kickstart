import { Series, useVideoConfig } from "remotion";
import { TitleSegment } from "./segments/TitleSegment";
import { ConceptSegment } from "./segments/ConceptSegment";
import { CodeOverviewSegment } from "./segments/CodeOverviewSegment";
import {
  Line1Segment,
  Line2Segment,
  Line3to5Segment,
  UsageSegment,
} from "./segments/LineExplanationSegment";
import { DiagramSegment } from "./segments/DiagramSegment";
import { SummarySegment } from "./segments/SummarySegment";
import { getDurationInFrames } from "../../config";
import {
  TITLE_DURATION_SECONDS,
  CONCEPT_DURATION_SECONDS,
  CODE_OVERVIEW_DURATION_SECONDS,
  LINE1_DURATION_SECONDS,
  LINE2_DURATION_SECONDS,
  LINE3TO5_DURATION_SECONDS,
  USAGE_DURATION_SECONDS,
  DIAGRAM_DURATION_SECONDS,
  SUMMARY_DURATION_SECONDS,
  TOTAL_DURATION_SECONDS,
} from "./config";
import { createComposition } from "../../utils/createComposition";

const ProductDemoComposition: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Series>
      {/* 1. 타이틀 */}
      <Series.Sequence
        durationInFrames={getDurationInFrames(TITLE_DURATION_SECONDS, fps)}
      >
        <TitleSegment />
      </Series.Sequence>

      {/* 2. 개념 설명 */}
      <Series.Sequence
        durationInFrames={getDurationInFrames(CONCEPT_DURATION_SECONDS, fps)}
      >
        <ConceptSegment />
      </Series.Sequence>

      {/* 3. 전체 코드 미리보기 */}
      <Series.Sequence
        durationInFrames={getDurationInFrames(
          CODE_OVERVIEW_DURATION_SECONDS,
          fps
        )}
      >
        <CodeOverviewSegment />
      </Series.Sequence>

      {/* 4. 라인별 설명 */}
      <Series.Sequence
        durationInFrames={getDurationInFrames(LINE1_DURATION_SECONDS, fps)}
      >
        <Line1Segment />
      </Series.Sequence>

      <Series.Sequence
        durationInFrames={getDurationInFrames(LINE2_DURATION_SECONDS, fps)}
      >
        <Line2Segment />
      </Series.Sequence>

      <Series.Sequence
        durationInFrames={getDurationInFrames(LINE3TO5_DURATION_SECONDS, fps)}
      >
        <Line3to5Segment />
      </Series.Sequence>

      <Series.Sequence
        durationInFrames={getDurationInFrames(USAGE_DURATION_SECONDS, fps)}
      >
        <UsageSegment />
      </Series.Sequence>

      {/* 5. 다이어그램 */}
      <Series.Sequence
        durationInFrames={getDurationInFrames(DIAGRAM_DURATION_SECONDS, fps)}
      >
        <DiagramSegment />
      </Series.Sequence>

      {/* 6. 정리 */}
      <Series.Sequence
        durationInFrames={getDurationInFrames(SUMMARY_DURATION_SECONDS, fps)}
      >
        <SummarySegment />
      </Series.Sequence>
    </Series>
  );
};

export const ProductDemo = createComposition({
  name: "ProductDemo",
  component: ProductDemoComposition,
  durationInSeconds: TOTAL_DURATION_SECONDS,
  preset: "Landscape-1080p",
});
