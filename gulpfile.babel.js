import gulp from 'gulp';
import run from 'gulp-shell';
import seq from 'gulp-sequence';

gulp.task('default', seq('build', 'test'));

gulp.task('build', () => {
    return gulp
        .src('test/*.js')
        .pipe(run(['npm run build']));
});
gulp.task('test', () => {
    return gulp
        .src('test/*.js')
        .pipe(run(['cross-env NODE_ENV=test babel-node <%= file.path %>']));
});

gulp.watch('src/**/*', seq('build', 'test'));
gulp.watch('test/**/*', ['test']);
