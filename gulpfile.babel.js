import gulp from 'gulp';

gulp.task('default', () => {
    console.log('hello');
});

gulp.watch('src/**/*', ['default']);
