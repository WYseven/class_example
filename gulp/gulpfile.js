/**
 * Created by wangyun on 17/2/12.
 */
var gulp = require("gulp");
var gls = require('gulp-live-server');
var livereload = require('gulp-livereload');

gulp.task('serve', function() {
    //1. serve with default settings
    var server = gls.new("./index.js"); //equals to gls.static('public', 3000);
    server.start();

    //use gulp.watch to trigger server actions(notify, start or stop)
    gulp.watch(["*.html"], function (file) {
        console.log(file)
        server.notify.apply(server, [file]);
    });
    gulp.watch('./index.js', function() {
        server.start.bind(server)()
    });
});
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('*.html', ['serve']);
});
gulp.task('default',['serve']);



