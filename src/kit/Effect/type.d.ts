interface Effect {
  title?: string;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
}

type RenderType = 'font' | 'image';

interface EffectItemProps extends Effect {
  renderType: RenderType;
}

export { Effect, EffectItemProps, RenderType };
