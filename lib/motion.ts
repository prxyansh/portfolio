import { cubicBezier } from 'framer-motion';

export const motionTokens = {
  durations: {
    xs: 0.2,
    sm: 0.35,
    base: 0.8,
    lg: 1.1,
    xl: 1.6,
  },
  easings: {
    luxe: cubicBezier(0.16, 1, 0.3, 1),
    fluid: cubicBezier(0.25, 1, 0.5, 1),
    snap: cubicBezier(0.34, 1.56, 0.64, 1),
  },
  springs: {
    gentle: { stiffness: 220, damping: 18, mass: 0.5 },
    float: { stiffness: 80, damping: 14, mass: 0.8 },
    magnetic: { stiffness: 320, damping: 24, mass: 0.6 },
  },
};
