import { DiagramSlide } from "../../../components/DiagramSlide";
import { CONTENT } from "../content";

export const DiagramSegment: React.FC = () => {
  return (
    <DiagramSlide
      title={CONTENT.diagramTitle}
      type="d2"
      diagram={CONTENT.diagram}
      className="bg-slate-900"
    />
  );
};
