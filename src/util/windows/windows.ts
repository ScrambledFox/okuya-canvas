import { useEditorState } from "@/state/editorState";

export const toggleWindowState = (segmentId: string) => {
  const walls = useEditorState.getState().walls;

  // Find the wall segment
  const wallSegment = walls
    .map((wall) => wall.segments)
    .flat()
    .find((segment) => segment.id === segmentId);

  if (wallSegment === undefined) return;

  wallSegment.hasWindow = !wallSegment.hasWindow;

  useEditorState.getState().setWalls(walls);
};
