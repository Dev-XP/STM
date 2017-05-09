import gulp from 'gulp';
import run from 'gulp-run-command';

gulp.task('default', ['build', 'test']);

gulp.task('build', run('npm run build'));
gulp.task('test', run('npm run test'));

gulp.watch('src/**/*', ['build','test']);
gulp.watch('test/**/*', ['test']);
