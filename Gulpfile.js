const gulp = require('gulp')
const fs = require('fs')
const Vinyl = require('vinyl')
const browserify = require('browserify')
const babelify = require('babelify')
const uglify = require('uglify-js')
const source = require('vinyl-source-stream')
const pkg = require('./package.json')

const dest = gulp.dest.bind(gulp)
const src = gulp.src.bind(gulp)
const task = gulp.task.bind(gulp)
const watch = gulp.watch.bind(gulp)

task('build', () =>
  browserify({
    debug: false
  })
  .add('./browser.js')
  .transform(babelify, {
    presets: ['latest']
  })
  .bundle()
  .pipe(source('vls.js'))
  .pipe(dest('dist'))
)

task('minify', ['build'], () => {
  const result = uglify.minify('dist/vls.js', {
  })

  const fl = fs.createWriteStream('dist/vls.min.js')
  fl.write('/*!\n')
  fl.write(' * VLS JavaScript Library v' + process.env.npm_package_version + ' (' + String(process.env.npm_package_gitHead).substring(0,6) + ')' + '\n')
  fl.write(' * https://github.com/jondotsoy/vls\n')
  fl.write(' *\n')
  fl.write(' * Released under the MIT license\n')
  fl.write(' * https://github.com/JonDotsoy/vls/raw/master/LICENSE\n')
  fl.write(' *\n')
  fl.write(' * Date: ' + (new Date).toJSON() + '\n')
  fl.write(' */\n')
  fl.write(result.code)
  fl.end()
})

task('default', ['build', 'minify'])
