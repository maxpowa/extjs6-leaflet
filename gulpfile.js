var gulp = require('gulp');

var OUTPUT = './dist';


gulp.task('build', gulp.series(
    uglify
));

gulp.task('check', gulp.series(
    lint
));

gulp.task('docs', gulp.series(
    docs
));

gulp.task('clean', gulp.series(
    clean
));

gulp.task('deploy', gulp.series(
    'clean',
    'check',
    'build',
    'docs',
    deploy
));

var eslint = require('gulp-eslint');

function lint() {
    return gulp.src(['./ux/**/src/*.js'])
        .pipe(eslint())
        // Output to console
        .pipe(eslint.format());
}

function docs(cb) {
    require('child_process').exec('jsduck', function(error, stdout, stderr) {
        cb(error);
    });
}

var del = require('del');

function clean() {
    return del([OUTPUT]);
}

var gulp_uglify = require('gulp-uglify');

function uglify() {
    return gulp.src(['./ux/**/*.js'])
        .pipe(gulp_uglify())
        .pipe(gulp.dest(OUTPUT));
}

var gulp_gh_pages = require('gulp-gh-pages');

function deploy() {
    return gulp.src(['./dist/**/*', './demo/**/*'])
        .pipe(gulp_gh_pages({
            push: false
        }));
}
