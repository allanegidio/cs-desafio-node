var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var gulpMocha = require('gulp-mocha');
var paths = {
    js: '*.js'
};


gulp.task('default', ['jshint'],  function() {
  console.log('Servidor Ativo Gulp');
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 8000
    },
    ignore: ['./node_modules/**']
  })
  .on('restart', function(){
    console.log('Restarting server');
  });
});

gulp.task('jshint', function() {
  return gulp.src(paths.js)
              .pipe(jshint())
              .pipe(jshint.reporter(stylish));
});

gulp.task('test', function(){
    return gulp.src('tests/*.js', {read: false})
               .pipe(gulpMocha({reporter: 'nyan'}))
});
