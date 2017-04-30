import gulp from 'gulp';
import run from 'gulp-run-command';

gulp.task('default', () => {
    console.log('hello');
});

gulp.task('build', run('npm run build'));

gulp.watch('src/**/*', ['build']);
