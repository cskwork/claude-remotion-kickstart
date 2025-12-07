import { CodeSlide } from "../../../components/CodeSlide";
import { CONTENT } from "../content";

export const CodeSegment: React.FC = () => {
  return (
    <CodeSlide
      title="Greeting Function"
      code={CONTENT.pythonCode}
      language="python"
      animatedHighlights={[{ timeInSeconds: 2, lines: "3-5" }]}
    />
  );
};
