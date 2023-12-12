import { useEditorState } from "@/state/editorState";
import { useFurnitureState } from "@/state/furnitureState";

export const updateIdDictionary = () => {
  const walls = useEditorState.getState().walls;
  const doors = useEditorState.getState().doors;
  const furniture = useFurnitureState.getState().furniture;

  const idDictionary: { [key: string]: any } = {};

  walls.forEach((wall) => {
    idDictionary[wall.id] = wall;
  });

  doors.forEach((door) => {
    idDictionary[door.id] = door;
  });

  furniture.forEach((f) => {
    idDictionary[f.id] = f;
  });

  useEditorState.getState().setDictionary(idDictionary);
};
