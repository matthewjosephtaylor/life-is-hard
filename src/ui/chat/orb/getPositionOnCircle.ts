
export const getPositionOnCircle = ({
  cx = 0, cy = 0, radius = 1, index, totalItems, startAngle = 0, direction = 1,
}: {
  direction?: number;
  cx?: number;
  cy?: number;
  radius?: number;
  index: number;
  totalItems: number;
  startAngle?: number;
}) => {
  const angle = direction * (startAngle + ((2 * Math.PI) / totalItems) * index); // Angle in radians
  const x = cx + radius * Math.cos(angle);
  const y = cy + radius * Math.sin(angle);
  return { x, y } as const;
};
