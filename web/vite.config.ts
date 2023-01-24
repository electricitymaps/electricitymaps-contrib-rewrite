/// <reference types="vitest" />
import eslintPlugin from '@nabla/vite-plugin-eslint';
import sentryVitePlugin from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';
import { defineConfig } from 'vite';
// import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

const manualChunkMap = {
  // These dependencies are disabled for now, as we had problems were Radix would crash the app because it did not have React available
  //   '@sentry': 'sentry',
  //   '@radix-ui': 'radix',
  //   'country-flag-icons': 'flags',
  //   recharts: 'recharts',
  'world.json': 'world',
  'zones.json': 'config',
  'exchanges.json': 'config',
  'excludedAggregatedExchanges.json': 'config',
};

export default defineConfig(({ mode }) => ({
  optimizeDeps: {
    disabled: false,
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  build: {
    sourcemap: true,
    commonjsOptions: {
      include: [],
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          for (const [searchString, value] of Object.entries(manualChunkMap)) {
            if (id.includes(searchString)) {
              return value;
            }
          }
        },
      },
    },
  },
  test: {
    css: false,
    include: ['src/**/*.test.{ts,tsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/testing/setupTests.ts',
    clearMocks: true,
    coverage: {
      provider: 'istanbul',
      enabled: false,
      '100': true,
      reporter: ['text', 'lcov'],
      reportsDirectory: 'coverage',
    },
  },
  plugins: [
    tsconfigPaths(),
    react({
      babel: {
        plugins: [jotaiDebugLabel, jotaiReactRefresh],
      },
    }),
    ...(mode !== 'test'
      ? [
          eslintPlugin(),
          // Temporarily disabled to ensure we can more easily rollback
          // VitePWA({
          //   registerType: 'autoUpdate',
          //   workbox: {
          //     maximumFileSizeToCacheInBytes: 3_500_000,
          //   },
          //   includeAssets: [
          //     'icons/*.{svg,png}',
          //     'robots.txt',
          //     // Consider if we should also add subdirectories below
          //     'images/*.{svg,png}',
          //     'fonts/*.woff2',
          //   ],
          //   manifest: {
          //     theme_color: '#000000',
          //     icons: [
          //       {
          //         src: '/icons/android-chrome-192x192.png',
          //         sizes: '192x192',
          //         type: 'image/png',
          //         purpose: 'any maskable',
          //       },
          //       {
          //         src: '/icons/android-chrome-512x512.png',
          //         sizes: '512x512',
          //         type: 'image/png',
          //       },
          //     ],
          //   },
          // }),
          // Used to upload sourcemaps to Sentry
          process.env.SENTRY_AUTH_TOKEN &&
            sentryVitePlugin({
              org: 'electricitymaps',
              project: 'app-web',

              // Specify the directory containing build artifacts
              include: './dist',

              // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
              // and needs the `project:releases` and `org:read` scopes
              authToken: process.env.SENTRY_AUTH_TOKEN,

              // Optionally uncomment the line below to override automatic release name detection
              release: process.env.npm_package_version,
            }),
        ]
      : []),
  ],
}));
