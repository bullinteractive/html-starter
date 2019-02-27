var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

// SVG Sprites
gulp.task('svg-sprite', function() {
  return gulp.src('./src/svg/*.svg')
    .pipe(plugins.svgSprite({
      mode: {
        symbol: {
          dest: '',
          prefix: '',
          sprite: 'spritemap'
        }
      }
    }))
    .pipe(gulp.dest('./dist/img'));
});

// CSS
gulp.task('postcss', function(){
  var processors = [

  ]
  return gulp.src('./src/css/**/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(plugins.postcss(processors))
    .pipe(plugins.sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/css'));
});

// JS - custom scripts
gulp.task('scripts', function() {
  return gulp.src('./src/js/scripts.js')
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.concat('scripts.js'))
      .pipe(plugins.minify())
    .pipe(plugins.sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/js'));
});

// JS - plugins
gulp.task('scripts-plugin', function() {
  return gulp.src('./src/js/plugins/*.js')
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.concat('plugins.js'))
      .pipe(plugins.minify())
    .pipe(plugins.sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/js'));
});

// JS - library files
// Copy these files from /src/js/lib to /js/lib to maintain full file
gulp.task('scripts-lib', function() {
  gulp.src('./src/js/lib/**/*')
    .pipe(gulp.dest('./dist/js/lib'));
});


// Default Tasks
gulp.task('default', ['scripts', 'scripts-lib', 'scripts-plugin', 'postcss', 'svg-sprite',]);

// Watch tasks
gulp.task('watch', function() {

  // Watch general .scss files
  gulp.watch('src/css/**/*.scss', ['postcss']);

  // Watch partials .js files
  gulp.watch('src/js/scripts.js', ['scripts']);

  // Watch plugin .js files
  gulp.watch('src/js/plugins/*.js', ['scripts-plugin']);

  // Watch for .js library files
  gulp.watch('src/js/lib/*.js', ['scripts-lib']);

  // SVG files for spritemap
  gulp.watch('src/svg/**/*.svg', ['svg-sprite']);
  
});
