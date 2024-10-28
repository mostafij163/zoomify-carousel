import { config, SpringConfig } from '@react-spring/web'

export const springConfig1: SpringConfig = {
  ...config.stiff,
  mass: 1,
  bounce: 0,
  velocity: 0,
}

export const resolutions = [600, 1200, 1800, 2400, 3000, 3600, 4200]
