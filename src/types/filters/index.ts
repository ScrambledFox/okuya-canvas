export enum FilterFlags {
  None = 0,
  All = Number.MAX_SAFE_INTEGER,
  Wall = 1 << 0,
  Door = 1 << 1,
  Window = 1 << 2,
  Flooded = 1 << 3,
}
