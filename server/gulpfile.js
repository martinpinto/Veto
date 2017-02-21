var gulp = require('gulp');

gulp.task('copyfiles', function() {
    gulp.src('./src/**/*.{ttf,woff,eof,svg,ejs,toml,db}')
    .pipe(gulp.dest('./build'));
});

gulp.task('default', ['copyfiles']);