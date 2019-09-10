'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

sass.compiler = require('node-sass');

gulp.task('sass', () =>
    gulp.src('./sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(gulp.dest('./build'))
);

gulp.task('scripts', () =>
    gulp.src('./script/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./build'))
);

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.sass', gulp.series('sass'));
});

gulp.task('scripts:watch', function () {
    gulp.watch('./script/**/*.js', gulp.series('scripts'));
});

gulp.task('default', gulp.parallel('scripts:watch', 'sass:watch'));