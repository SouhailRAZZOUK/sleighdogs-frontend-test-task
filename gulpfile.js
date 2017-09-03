var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    typescript = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    imagemin = require('gulp-imagemin'),
    merge = require('merge2');

var tsProject = typescript.createProject("./tsconfig.json");

gulp.task('ts', function () {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(tsProject());

  return merge([
    tsResult.dts.pipe(gulp.dest('dist/definitions/')),
    tsResult.js.pipe(gulp.dest('dist/')),
    tsResult.js.pipe(connect.reload())
  ]);
});

gulp.task('tslint', function () {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({
      formatter: 'stylish'
    }))
    .pipe(tslint.report({
      emitError: false
    }))
})

gulp.task('sass', function() {
  return gulp.src('src/assets/styles/app.scss')
    .pipe( sass().on('error', sass.logError) )
    .pipe( gulp.dest('dist/assets/styles/') )
    .pipe( connect.reload() );    
});

gulp.task('pug', function () {
  return gulp.src(['src/**/*.pug', '!src/includes/**/*',])
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('dist/'))
    .pipe( connect.reload() );
});

gulp.task('images', function () {
  return gulp.src(['src/**/*.jpeg', 'src/**/*gif', 'src/**/*.jpg', 'src/**/*.png', 'src/**/*.ico'])
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
    }))
    .pipe(gulp.dest('dist/'))
    .pipe( connect.reload() );
});

// gulp.task('clean', function () {
//   del(['dist/**/*', '!dist/', '!dist/bower_components', '!dist/bower_components/**/*'], { force: true }).then(paths => {
//     if (paths.length != 0) {
//       gutil.log('Files and folders that were deleted:\n', gutil.colors.orange(paths.join('\n')));
//     }
//   });
// });

gulp.task('watch', function () {

  gulp.watch('src/**/*.pug', ['pug']);

  gulp.watch(['src/**/*gif', 'src/**/*.jpg', 'src/**/*.png', 'src/**/*.ico'], ['images']);

  gulp.watch('src/**/*.scss', ['sass']);

  gulp.watch('src/**/*.ts', ['ts', 'tslint']);

});

gulp.task('connect', ['watch'], function () {
  connect.server({
    root: "dist/",
    port: 4000,
    livereload: true
  });
});

gulp.task('default', ['pug', 'sass', 'tslint', 'ts', 'images', 'connect', 'watch']);

gulp.task('build', ['pug', 'sass', 'tslint', 'ts', 'images']);