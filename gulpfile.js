var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({
      overridePattern: true,
      pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*', 'postcss-*', 'postcss.*', '@*/postcss{-,.}*']
    });

// SVG Sprites
gulp.task('svg-sprite', function() {
  return gulp.src('./src/svg/*.svg')
    .pipe(plugins.svgSprite({
      mode: {
        symbol: {
          render: {
            css: false, // CSS output option for icon sizing
            scss: false // SCSS output option for icon sizing
          },
          dest: '',
          prefix: '',
          sprite: 'spritemap'
        }
      }
    }))
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('icons', () => {
  gulp.src('./src/svg/*svg')
    .pipe(plugins.image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true,
      concurrent: 10,
      quiet: true // defaults to false
    }))
    .pipe(gulp.dest('./dist/img/icons'));
});

gulp.task('images', () => {
  gulp.src('./src/img/*')
    .pipe(plugins.image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      concurrent: 10,
      quiet: true // defaults to false
    }))
    .pipe(gulp.dest('./dist/img/images'));
});

// CSS
gulp.task('postcss', function(){
  console.log(plugins);
  var processors = [
    plugins.postcssPresetEnv({ 
      stage: 0,
      browsers: ['last 2 versions', 'safari 6', 'ie 9', 'ios 7', 'android 4']
    }),
    plugins.postcssPxtorem({
      rootValue: 16,
      unitPrecision: 5,
      propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    }),
    plugins.postcssSvg({
      dirs: ['./src/svg'],
      svgo: { plugins: [{ cleanupAttrs: true }] } 
    })
  ]
  return gulp.src('./src/css/**/*.scss')
      .pipe(plugins.plumber({ errorHandler: function(err) {
        var lineNumber = (err.lineNumber) ? 'LINE ' + err.lineNumber + ' -- ' : '';
        plugins.notify.onError({
            title: "Gulp error in " + err.plugin,
            message: lineNumber + 'See console.',
        })(err);
        // Inspect the error object
      console.log(err.message.toString());

      // Easy error reporting
      //console.log(error.toString());

      // Pretty error reporting
      // var report = '';
      // var chalk = plugins.chalk;

      // report += chalk('TASK:') + ' [' + err.plugin + ']\n';
      // report += chalk('PROB:') + ' ' + err.message + '\n';
      // if (err.lineNumber) { report += chalk('LINE:') + ' ' + err.lineNumber + '\n'; }
      // if (err.fileName)   { report += chalk('FILE:') + ' ' + err.fileName + '\n'; }
      // console.error(report);
      
      this.emit('end');
    }}))
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
  gulp.watch('src/svg/**/*.svg', ['svg-sprite', 'icons']);

  // SVG files for spritemap
  gulp.watch('src/img/*', ['images']);
  
});
