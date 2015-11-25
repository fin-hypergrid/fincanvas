'use strict';

var gulp        = require('gulp'),
    $$          = require('gulp-load-plugins')(),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    exec        = require('child_process').exec,
    path        = require('path');

var srcDir   = './js/',
    testDir  = './test/',
    jsDir    = srcDir + 'js/',
    jsFiles  = '**/*.js',
    buildDir = './build/';

//  //  //  //  //  //  //  //  //  //  //  //

gulp.task('lint', lint);
gulp.task('test', test);
gulp.task('doc', doc);
gulp.task('beautify', beautify);
gulp.task('browserify', function(callback) {
    browserify();
    browserifyMin();
    callback();
});
gulp.task('browserSyncLaunchServer', browserSyncLaunchServer);

gulp.task('build', function(callback) {
    clearBashScreen();
    runSequence(
        'lint',
        //'test',
        'doc',
        //'beautify',
        'browserify',
        callback
    );
});

gulp.task('watch', function () {
    gulp.watch(['index.*', srcDir + '**', testDir + '**'], ['build']);
    gulp.watch([buildDir + '**'])
        .on('change', function(event) {
            browserSync.reload();
        });
});

gulp.task('default', ['build', 'watch'], browserSyncLaunchServer);

//  //  //  //  //  //  //  //  //  //  //  //

function lint() {
    return gulp.src(['index.js', jsDir + jsFiles])
        .pipe($$.excludeGitignore())
        .pipe($$.eslint())
        .pipe($$.eslint.format())
        .pipe($$.eslint.failAfterError());
}

function test(cb) {
    return gulp.src(testDir + 'index.js')
        .pipe($$.mocha({reporter: 'spec'}));
}

function beautify() {
    return gulp.src(['index.js', jsDir + jsFiles])
        .pipe($$.beautify()) //apparent bug: presence of a .jsbeautifyrc file seems to force all options to their defaults (except space_after_anon_function which is forced to true) so I deleted the file. Any needed options can be included here.
        .pipe(gulp.dest(jsDir));
}

function browserify() {
    return gulp.src(buildDir + 'root.js')
        .pipe($$.browserify({
            //insertGlobals : true,
            debug : true
        }))
        //.pipe($$.sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here:

        .on('error', $$.util.log)

        .pipe($$.rename('fincanvas.js'))
        .pipe(gulp.dest(buildDir)) // outputs to ./build/fincanvas.js for githup.io publish
}

function browserifyMin() {
    return gulp.src(buildDir + 'root.js')
        .pipe($$.browserify())
        .pipe($$.uglify())
        .pipe($$.rename('fincanvas.min.js'))
        .pipe(gulp.dest(buildDir)); // outputs to ./build/fincanvas.min.js for githup.io publish
}

function doc(cb) {
    exec(path.resolve('jsdoc.sh'), function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
}

function browserSyncLaunchServer() {
    browserSync.init({
        server: {
            // Serve up our build folder
            baseDir: buildDir,
            index: "demo.html"
        },
        port: 5008
    });
}

function clearBashScreen() {
    var ESC = '\x1B';
    console.log(ESC + 'c'); // (VT-100 escape sequence)
}
