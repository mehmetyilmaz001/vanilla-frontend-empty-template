module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cacheBust: {
            taskName: {
                options: {
                    assets: ['css/**', 'js/**']
                },
                src: ['default.html', 'kim-kimdir.html']
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'css/style-min.css': [
                        'node_modules/bootstrap/dist/css/bootstrap.css',
                        'node_modules/animate.css/animate.css',
                        'node_modules/select2/dist/css/select2.css',
                        'node_modules/select2-bootstrap-theme/dist/select2-bootstrap.css',
                        'css/css/style.css'
                    ]
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'js/js-min.js': [
                        'node_modules/jquery/dist/jquery.min.js',
                        'node_modules/bootstrap/dist/js/bootstrap.js',
                        'node_modules/lodash/lodash.js',
                        'js/fontawesome-all.js',
                        'js/jquery.nicescroll.js',
                        'js/jQuery.paginate.js',
                        'node_modules/select2/dist/js/select2.js',
                        'node_modules/select2/dist/js/i18n/tr.js',
                        'js/js.js'
                    ]
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/css/style.css': 'css/sass/style.scss'
                }
            }
        },
        watch: {
            sass: {
                files: ['css/sass/**/*.scss'],
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: [
                    'css/sass/style.scss'
                ],
                tasks: ['cssmin'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['js/js.js'],
                tasks: ['uglify'],
                options: {
                    livereload: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-cache-bust');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['sass', 'uglify', 'cssmin', 'watch']);
};
