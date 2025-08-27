// Utilitaires pour l'application BleauBlocks

export const getLevelColor = (level: string): string => {
  const levelNum = parseInt(level);
  if (levelNum <= 3) return "bg-green-500";
  if (levelNum <= 5) return "bg-yellow-500";
  if (levelNum <= 7) return "bg-orange-500";
  return "bg-red-500";
};

export const getLevelColorHex = (level: string): string => {
  const levelNum = parseInt(level);
  if (levelNum <= 3) return "#22c55e";
  if (levelNum <= 5) return "#eab308";
  if (levelNum <= 7) return "#f97316";
  return "#ef4444";
};
