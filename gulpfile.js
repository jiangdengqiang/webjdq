var gulp = require('gulp');
var compass = require('gulp-compass');
var uglify = require('gulp-uglify');//用于压缩js
/*var rename = require('gulp-rename');//重命名*/
var minifyCSS = require('gulp-minify-css');//用于压缩css
var nunjucks = require('gulp-nunjucks-render');
var rev = require('gulp-rev'); //md5

//scss文件生成css
gulp.task('compass', function() {
    gulp.src('./html/sass/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'html/css',
            sass: 'html/sass'
        }))
        .pipe(gulp.dest('./html/css'));
});

//nunjucks板块生成html
gulp.task('nunjucks', function() {
        // Gets .html and .nunjucks files in pages
    gulp.src('./pages/**/*.+(html|nunjucks)')
        // Renders template with nunjucks
        .pipe(nunjucks({
            path: ['./templates']
        }))
        // output files in app folder
        .pipe(gulp.dest('./html'))
});

//压缩js
gulp.task('script', function() {
    // 1. 找到文件
    gulp.src('./html/js/*.js')
        // 2. 压缩文件
        .pipe(uglify())
        // 3. 另存压缩后的文件
        .pipe(gulp.dest('./html/js/min/'))
})
//压缩css
gulp.task('css', function () {
    // 1. 找到文件
    gulp.src('./html/js/*.css')
        // 2. 压缩文件
        .pipe(minifyCSS())
        // 3. 另存为压缩文件
        .pipe(gulp.dest('./html/css/'))
})

//监听动态
gulp.task('watch', function() {
    gulp.watch('./html/sass/*.scss', ['compass']);
});
/*gulp.task('rev', function () {
    // by default, gulp would pick `assets/css` as the base,
    // so we need to set it explicitly:
    return gulp.src(['./html/css/!*.scss', './html/js/!*.js'], {base: 'html'})
        .pipe(gulp.dest('./html/css'))  // copy original assets to build dir
        .pipe(rev())
        .pipe(gulp.dest('./html/js'))  // write rev'd assets to build dir
        .pipe(rev.manifest())
        .pipe(gulp.dest('./html/js')); // write manifest to build dir
});*/

gulp.task('default', ['compass, nunjucks, watch, rev']);