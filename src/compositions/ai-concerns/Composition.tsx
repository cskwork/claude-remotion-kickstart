import { Series, useVideoConfig } from "remotion";
import { HookSegment } from "./segments/HookSegment";
import { ProblemsSegment } from "./segments/ProblemsSegment";
import { WhyUseSegment } from "./segments/WhyUseSegment";
import { SolutionDifficultySegment } from "./segments/SolutionDifficultySegment";
import { SolutionSecuritySegment } from "./segments/SolutionSecuritySegment";
import { SolutionHallucinationSegment } from "./segments/SolutionHallucinationSegment";
import { SummarySegment } from "./segments/SummarySegment";
import { getDurationInFrames } from "../../config";
import {
  HOOK_DURATION_SECONDS,
  PROBLEMS_DURATION_SECONDS,
  WHY_USE_DURATION_SECONDS,
  SOLUTION_DIFFICULTY_SECONDS,
  SOLUTION_SECURITY_SECONDS,
  SOLUTION_HALLUCINATION_SECONDS,
  SUMMARY_DURATION_SECONDS,
  TOTAL_DURATION_SECONDS,
} from "./config";
import { createComposition } from "../../utils/createComposition";

const AiConcernsComposition: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Series>
      {/* 1. Hook - 흥미 유발 */}
      <Series.Sequence
        durationInFrames={getDurationInFrames(HOOK_DURATION_SECONDS, fps)}
      >
        <HookSegment />
      </Series.Sequence>

      {/* 2. 문제점 제시 */}
      <Series.Sequence
        durationInFrames={getDurationInFrames(PROBLEMS_DURATION_SECONDS, fps)}
      >
        <ProblemsSegment />
      </Series.Sequence>

      {/* 3. 왜 써야 하는가 */}
      <Series.Sequence
        durationInFrames={getDurationInFrames(WHY_USE_DURATION_SECONDS, fps)}
      >
        <WhyUseSegment />
      </Series.Sequence>

      {/* 4. 해결책 - 난이도 */}
      <Series.Sequence
        durationInFrames={getDurationInFrames(SOLUTION_DIFFICULTY_SECONDS, fps)}
      >
        <SolutionDifficultySegment />
      </Series.Sequence>

      {/* 5. 해결책 - 보안 */}
      <Series.Sequence
        durationInFrames={getDurationInFrames(SOLUTION_SECURITY_SECONDS, fps)}
      >
        <SolutionSecuritySegment />
      </Series.Sequence>

      {/* 6. 해결책 - 할루시네이션 */}
      <Series.Sequence
        durationInFrames={getDurationInFrames(SOLUTION_HALLUCINATION_SECONDS, fps)}
      >
        <SolutionHallucinationSegment />
      </Series.Sequence>

      {/* 7. 정리 */}
      <Series.Sequence
        durationInFrames={getDurationInFrames(SUMMARY_DURATION_SECONDS, fps)}
      >
        <SummarySegment />
      </Series.Sequence>
    </Series>
  );
};

export const AiConcerns = createComposition({
  name: "AiConcerns",
  component: AiConcernsComposition,
  durationInSeconds: TOTAL_DURATION_SECONDS,
  preset: "Landscape-1080p",
});
