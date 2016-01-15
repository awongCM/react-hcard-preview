var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var del = require('del');

var path = {
  HTML: 'src/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  SASS: 'src/styles/**/*.scss',
  ASSETS: 'src/assets/**/*.*',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: 'src/js/app.js'
};

var serverConfig = {
  browserPort: 5000,
  baseURL: "./dist"
}

gulp.task('copyAssets', function(){
  gulp.src(path.ASSETS)
    .pipe(gulp.dest(path.DEST + '/assets'));
});

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['replaceHTMLdev']);
  gulp.watch(path.SASS, ['sass']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .on('error', handleErrors)
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));


});

//For testing purposes Only
gulp.task('bundlejs', function () {
  var bundler  = browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  });
  bundler.bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('sass', function(){
  var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 1%', 'ie 8'],
  };

  var sassOptions = {
    includePaths:[
      /* Oprions */
    ]
  };

  gulp.src(path.SASS)
    .pipe(sass(sassOptions))
    .on('error', handleErrors)
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(path.DEST + '/css'))
    .pipe(browserSync.reload({stream: true}));
    console.log('SASS:Changed');
});

gulp.task('serve', function () {
  browserSync.init({
    server: serverConfig.baseURL,
    port: serverConfig.browserPort
  });
});

//This is Non-blocking Thread though....
gulp.task('clean', function () {
  //not a good way to do it
  return del([serverConfig.baseURL]);
})

gulp.task('replaceHTMLprod', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('replaceHTMLdev', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'src/' + path.OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('prod', ['clean', 'replaceHTMLprod', 'sass', 'copyAssets', 'build']);

gulp.task('dev', ['clean', 'replaceHTMLdev', 'sass', 'copyAssets', 'serve', 'watch']);

function handleErrors(status) {
  console.log(status.toString());
}