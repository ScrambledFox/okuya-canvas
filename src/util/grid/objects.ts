import { useEditorState } from "@/state/editorState";
import { useFurnitureState } from "@/state/furnitureState";

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
  } else if (object.type === "furniture") {
    const furniture = useFurnitureState.getState().furniture;
    const newFurniture = furniture.filter((f) => f.id !== id);
    useFurnitureState.getState().setFurniture(newFurniture);
  } else {
    console.error("Unknown object type: " + object.type);
  }
};
