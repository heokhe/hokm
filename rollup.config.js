import purgeCss from '@fullhuman/postcss-purgecss';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import tailwind from 'tailwindcss';
import buble from 'rollup-plugin-buble';
import visualize from 'rollup-plugin-visualizer';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js'
  },
  plugins: [
    svelte({
      dev: !production,
      emitCss: true
    }),
    postcss({
      plugins: [
        postcssImport,
        tailwind('tailwind.config.js'),
        production && purgeCss({
          content: ['./src/**/*.svelte', './public/index.html'],
          defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
        }),
        production && autoprefixer
      ].filter(Boolean),
      extract: 'public/bundle.css',
      minimize: production
    }),
    resolve({ browser: true }),
    commonjs(),
    !production && livereload('public'),
    production && buble({
      transforms: {
        asyncAwait: false
      }
    }),
    production && terser(),
    production && visualize()
  ],
  watch: {
    clearScreen: false
  }
};
