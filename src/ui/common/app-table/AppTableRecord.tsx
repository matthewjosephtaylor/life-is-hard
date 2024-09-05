export type AppTableRecord<
  V,
  K extends string | number | symbol = string | number | symbol
> = Record<K, V>;
