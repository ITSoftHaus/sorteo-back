import { task, dest, watch, src } from 'gulp';
import { createProject } from 'gulp-typescript';

const JSON_FILES = ['src/app/*.json', 'src/app/**/*.json'];
const tsProject = createProject('tsconfig.json');

task('scripts', () => {
  const tsResult = tsProject.src().pipe(tsProject());
  return tsResult.js.pipe(dest('dist'));
});

task('watch', ['scripts'], () => {
  watch('src/app/**/*.ts', ['scripts']);
});

task('assets', () => src(JSON_FILES).pipe(dest('dist')));

task('default', ['watch', 'assets']);
