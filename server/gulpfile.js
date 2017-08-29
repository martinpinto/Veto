var gulp = require('gulp');
const ts = require('gulp-typescript');

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
    const tsResult = tsProject.src()
    .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist'));
});  

gulp.task('copyfiles', function() {
    gulp.src('./src/**/*.{ttf,woff,eof,svg,ejs,toml,db}')
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['scripts', 'copyfiles']);