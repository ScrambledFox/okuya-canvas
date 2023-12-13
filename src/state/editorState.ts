import { Door, Wall } from "@/types/inter";
import { GridPoint, GridTile } from "@/types/tiles";
import { create } from "zustand";
import { processAllObjects, useProcessingState } from "./processingState";
import { updateIdDictionary } from "@/util/ids";
import { handleDeleteObjectWithId } from "@/util/grid/objects";
import { Furniture } from "@/types/furniture";
import { Vector2d } from "@/util/points/points";

export type EditorState = {
  gridSize: Vector2d;
  tileSize: number;

  zoomLevel: number;

  idDictionary: { [key: string]: any };
  setDictionary: (newDictionary: { [key: string]: any }) => void;
  updateIdDictionary: () => void;

  tiles: GridTile[][];
  setTiles: (newTiles: GridTile[][]) => void;
  resetTiles: () => void;

  points: GridPoint[][];
  setPoints: (newPoints: GridPoint[][]) => void;
  resetPoints: () => void;

  walls: Wall[];
  setWalls: (newWalls: Wall[]) => void;
  resetWalls: () => void;

  wallPoints: GridPoint[];
  setWallPoints: (newWallPoints: GridPoint[]) => void;
  resetWallPoints: () => void;
  addWallPoint: (newWallPoint: GridPoint) => void;

  doors: Door[];
  setDoors: (newDoors: Door[]) => void;
  resetDoors: () => void;

  deleteObjectWithId: (id: string | null) => void;

  addTileFlag: (tile: GridTile, flag: number) => void;
  addTileFurniture: (tile: GridTile, furniture: Furniture) => void;
};

export const useEditorState = create<EditorState>((set, get) => ({
  gridSize: new Vector2d(30, 30),
  tileSize: 25,

  zoomLevel: 1,

  // Dictionary for storing objects by id
  idDictionary: {},
  setDictionary: (newDictionary) => {
    set({ idDictionary: newDictionary });
  },
  updateIdDictionary: () => updateIdDictionary(),

  // Tiles
  tiles: [],
  setTiles: (newTiles) => {
    set({ tiles: newTiles });
  },
  resetTiles: () => set({ tiles: [] }),

  addTileFlag(tile, flag) {
    const newTiles = get().tiles;
    newTiles[tile.pos.y][tile.pos.x].flags |= flag;
    set({ tiles: newTiles });
  },

  addTileFurniture(tile, furniture) {
    const newTiles = get().tiles;
    newTiles[tile.pos.y][tile.pos.x].containingFurniture.push(furniture);
    set({ tiles: newTiles });
  },

  // Points
  points: [],
  setPoints: (newPoints) => {
    set({ points: newPoints });
  },
  resetPoints: () => set({ points: [] }),

  // Walls
  walls: [],
  setWalls: (newWalls) => {
    set({ walls: newWalls });
    processAllObjects();
  },
  resetWalls: () => set({ walls: [] }),

  // WallPoints - Used for drawing doors
  wallPoints: [],
  setWallPoints: (newWallPoints) => {
    set({ wallPoints: newWallPoints });
  },
  resetWallPoints: () => set({ wallPoints: [] }),
  addWallPoint: (newWallPoint) => {
    set({ wallPoints: [...get().wallPoints, newWallPoint] });
  },

  // Doors
  doors: [],
  setDoors: (newDoors) => {
    set({ doors: newDoors });
    processAllObjects();
  },
  resetDoors: () => set({ doors: [] }),

  // Delete object with id
  deleteObjectWithId: (id) => {
    handleDeleteObjectWithId(id);
  },
}));
