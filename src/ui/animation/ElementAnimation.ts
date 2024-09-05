export type ElementAnimation = {
  id: string;
  from: number | string;
  to: number | string;
  delay: number;
  frames: number;
  cssProperty: Extract<keyof CSSStyleDeclaration, string>;
  startFrame?: number;
  state?: undefined | "started" | "ended";
  /**  @see npm 'easing-utils' package */
  easing: (alpha: number) => number;
  onEnd?: () => void | Promise<void>;
};
