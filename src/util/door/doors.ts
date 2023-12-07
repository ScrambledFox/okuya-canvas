import { useEditorState } from "@/state/editorState";
import { useDoorToolState } from "@/state/tools/doorToolState";
import { DragPoint } from "@/types/grid";
import { Door } from "@/types/inter";
import { v4 as uuidv4 } from "uuid";
import { Vector2d } from "../points/points";

// Create new door
export const createDoor = (
  start: Vector2d,
  end: Vector2d,
  wallIds: string[]
) => {
  const door: Door = {
    id: uuidv4(),
    start: start,
    end: end,
    type: "door",
    walls: wallIds,
  };

  useEditorState
    .getState()
    .setDoors([...useEditorState.getState().doors, door]);
};

export const tryCreateDoor = () => {
  const startPoint = useDoorToolState.getState().lineStart?.pointCoord;
  const endPoint = useDoorToolState.getState().lineEndTarget;

  if (startPoint == null || endPoint == null) return;

  if (!useDoorToolState.getState().getIsValidLineEndPoint(endPoint)) return;

  // Find the walls that this door is on

  createDoor(startPoint, endPoint, []);

  // Stop door placing
  useDoorToolState.getState().cancelLine();
};

export const removeDoor = (id: string) => {
  const newDoors = useEditorState
    .getState()
    .doors.filter((door) => door.id !== id);

  useEditorState.getState().setDoors(newDoors);
};

export const startDoorPlacement = (coord: DragPoint) => {
  useDoorToolState.getState().setLineStart(coord);
};

// A door can only be placed on a wall segment that is 2 tiles long.
export const getIsValidDoorPlacement = (start: Vector2d, end: Vector2d) => {
  if (start == null || end == null) return false;
  if (start === end) return false;

  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;

  // No diagonals
  if (deltaX !== 0 && deltaY !== 0) return false;

  // No walls longer or shorter than 2 tiles
  if (!(Math.abs(deltaX) === 2 || Math.abs(deltaY) === 2)) return false;

  // Check if door already exists at this location
  // const doors = useEditorState.getState().doors;
  // for (let i = 0; i < doors.length; i++) {
  //   const door = doors[i];
  //   if (door.start === start && door.end === end) return false;
  // }

  return true;
};
