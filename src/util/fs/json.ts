import fs from "fs";
import { Door, Wall } from "@/types/inter";

export const saveWallsData = (walls: Wall[], filePath: string): void => {
  const data = JSON.stringify(walls);
  fs.writeFileSync(filePath, data);
}

export const loadWallsData = (filePath: string): Wall[] => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export const saveDoorsData = (doors: Door[], filePath: string): void => {
  const data = JSON.stringify(doors);
  fs.writeFileSync(filePath, data);
}

export const loadDoorsData = (filePath: string): Door[] => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}
