import { useEditorState } from "@/state/editorState";

export const handleDeleteObjectWithId = (id: string | null) => {
  if (id === null) return;

  const idDictionary = useEditorState.getState().idDictionary;
  const object = idDictionary[id];

  if (object === undefined) return;

  if (object.type === "wall") {
    const walls = useEditorState.getState().walls;
    const newWalls = walls.filter((wall) => wall.id !== id);
    useEditorState.getState().setWalls(newWalls);
  } else if (object.type === "door") {
    const doors = useEditorState.getState().doors;
    const newDoors = doors.filter((door) => door.id !== id);
    useEditorState.getState().setDoors(newDoors);
  } else {
    console.error("Unknown object type: " + object.type);
  }
};
