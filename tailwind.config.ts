import type { Config } from 'tailwindcss'
import preset from './src/styles/preset'

// Local config for developing the demo site. Consumers use `koi-ui/preset`.
export default {
  presets: [preset],
  content: ['./demo/**/*.{ts,tsx,html}', './src/**/*.{ts,tsx}'],
} satisfies Config
