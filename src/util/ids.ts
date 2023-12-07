import { useEditorState } from "@/state/editorState";

export const updateIdDictionary = () => {
  const walls = useEditorState.getState().walls;
  const doors = useEditorState.getState().doors;

  const idDictionary: { [key: string]: any } = {};

  walls.forEach((wall) => {
    idDictionary[wall.id] = wall;
  });

  doors.forEach((door) => {
    idDictionary[door.id] = door;
  });

  useEditorState.getState().setDictionary(idDictionary);
};
