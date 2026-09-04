import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '1ff3j3n2',
    dataset: 'production',
  },
  deployment: {
    // Studio auto-updates: https://www.sanity.io/docs/studio/latest-version-of-sanity
    autoUpdates: true,
    // https://chrisrahme.sanity.studio
    appId: 'ssv8rgmg7nl6f84c6l6zbss3',
  },
  typegen: {
    enabled: true,
    // Every file in the website that can hold a GROQ query
    path: [
      '../website/sanity/**/*.ts',
      '../website/composables/**/*.ts',
      '../website/utils/**/*.ts',
      '../website/components/**/*.vue',
      '../website/pages/**/*.vue',
      '../website/layouts/**/*.vue',
      '../website/*.vue',
    ],
    schema: 'schema.json',
    generates: '../website/sanity.types.ts',
    overloadClientMethods: true,
  },
})
