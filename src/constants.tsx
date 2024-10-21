import { config, SpringConfig } from '@react-spring/web'

export const springConfig1: SpringConfig = {
  ...config.stiff,
  mass: 1,
  bounce: 0,
  velocity: 0,
}
