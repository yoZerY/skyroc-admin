import { presetSoybeanAdmin } from '@sa/uno-config';
import { defineConfig, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss';

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.tsx($|\?)/]
    },
    filesystem: ['../../ui-kit/ui']
  },
  presets: [
    presetWind3({ dark: 'class', variablePrefix: '', important: '.root', preflight: 'on-demand' }),
    presetSoybeanAdmin()
  ],

  transformers: [transformerDirectives(), transformerVariantGroup()]
});
