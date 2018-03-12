var gulp = require('gulp');
var order = require('gulp-order');
var concat = require('gulp-concat');
var es = require('event-stream');
var minifyCss = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var processhtml = require('gulp-processhtml');
var ghPages = require('gulp-gh-pages');

// Settings
var settings = {
    destFolder: 'dist',
    prefix: {
        destfile: 'sadl.min',
        mergefile: 'main.min'
    }
}

// Assets path map
var assets = {
    js: {
        paths: ['public/js/**/*.js'],
        order: [
            '**/util.js',
            '**/search.js',
            '**/bar.js',
            '**/main.js'
        ],
        vendor: ['public/bower_components/d3/d3.min.js']
    },

    css: {
        paths: ['public/css/**/*.css'],
        order: [],
        vendor: [
            'public/bower_components/bootstrap/dist/css/bootstrap.min.css',
            'public/bower_components/font-awesome/web-fonts-with-css/css/fontawesome.min.css'
        ]
    },

    image: {
        paths: 'public/images/**/*'
    },

    fonts:  'public/bower_components/bootstrap/fonts/*.*'
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del([settings.destFolder + '']);
});

// 开建管道，名字叫`js`
gulp.task('js', ['clean'], function() {
    // 合并、压缩、混淆，并拷贝js文件
    return es.merge(                   //这是个workflow插件，是Node.js模块，都是Node.js应用，当然也可以使用了
            gulp.src(assets.js.vendor) //管道1入口
            .pipe(gulp.dest(settings.destFolder + '/js/')), // 直接流到管道1出口，相当于简单拷贝

            gulp.src(assets.js.paths) //管道2入口
            .pipe(order(assets.js.order)) //过滤网1：排序
            .pipe(sourcemaps.init())  //过滤网2：建sourcemaps
            .pipe(uglify())   //这算是管道中的管道了，过滤网3：混淆处理
            .on('error', function (err) {
              console.log(err.toString());
              throw err;
            })
            .pipe(concat(settings.prefix.destfile + '.js')) //过滤网4：合并处理
            .pipe(sourcemaps.write()) //建maps结束，输出sourcemaps
            .pipe(gulp.dest(settings.destFolder + '/js')) //管道2出口
        )
        .pipe(concat(settings.prefix.mergefile + '.js'))  //汇总管道：对上述2个管道的输出再合并
        .pipe(gulp.dest(settings.destFolder + '/js/'))    //汇总管道出口
});

// Minify and copy all Stylesheets
gulp.task('css', ['clean'], function() {
    return es.merge(
            // Copy the vendors
            gulp.src(assets.css.vendor)
            .pipe(gulp.dest(settings.destFolder + '/css/')),

            // Concat mine
            gulp.src(assets.css.paths)
            .pipe(order(assets.css.order))
            .pipe(concat(settings.prefix.destfile + '.css'))
            .pipe(minifyCss())
            .pipe(gulp.dest(settings.destFolder + '/css/'))
        )
        .pipe(concat(settings.prefix.mergefile + '.css'))
        .pipe(gulp.dest(settings.destFolder + '/css/'))
});

// Copy all static images
gulp.task('images', ['clean'], function() {
    return gulp.src(assets.image.paths)
        // Pass in options to the task
        .pipe(imagemin({
            optimizationLevel: 5
        }))
        .pipe(gulp.dest(settings.destFolder + '/images'));
});

// Copy fonts
gulp.task('fonts', ['clean'], function() {
    return gulp.src(assets.fonts)
        .pipe(gulp.dest(settings.destFolder + '/fonts/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(assets.js.paths, ['js']);
    gulp.watch(assets.css.paths, ['css']);
    gulp.watch(assets.image.paths, ['images']);
});

//Html
gulp.task("html",  ['clean'], function() {
    gulp.src('./views/repo/repo.ejs')
        .pipe(processhtml())
        .pipe(gulp.dest(settings.destFolder))
})

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'js', 'css', 'images', 'fonts', 'html']);


//Deploy
gulp.task('deploy', ['default'], function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});