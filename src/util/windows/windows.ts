import { useEditorState } from "@/state/editorState";
import { useWindowToolState } from "@/state/tools/windowToolState";
import { DragPoint } from "@/types/grid";
import { Vector2d } from "../points/points";
import { getCoordsInBetween, setHasCoord } from "../coords/coords";

export const startWindowConversionLine = (dragStart: DragPoint) => {
  useWindowToolState.getState().setLineStart(dragStart);
};

export const convertWindowsInRange = (
  startCoord: Vector2d,
  endCoord: Vector2d
) => {
  const walls = useEditorState.getState().walls;

  const coords = getCoordsInBetween(startCoord, endCoord);

  // Find wall segments that have their start and end point in the coords
  const wallSegments = walls
    .map((wall) => wall.segments)
    .flat()
    .filter(
      (segment) =>
        setHasCoord(coords, segment.start) && setHasCoord(coords, segment.end)
    );

  wallSegments.forEach((segment) => {
    segment.hasWindow = !segment.hasWindow;
  });

  useEditorState.getState().setWalls(walls);
};

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
