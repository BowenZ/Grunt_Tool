module.exports = function(grunt) {
    var config = grunt.file.readJSON('config.json');
    var bannerContent = '/*! ' + config.banner + '' + (config.date ? ' <%= grunt.template.today("yyyy-mm-dd") %> ' : '') + '*/\n';
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['js/*.js'],
                dest: 'js/concat.js'
            }
        },
        uglify: {
            option: {
                banner: bannerContent,
            },
            target: {
                expand: true,
                cwd: 'js/',
                src: ['*.js'],
                dest: 'js/',
                ext: '.min.js'
            }
        },
        jshint: {
            files: ['js/*.js'],
            options: {
                //这里是覆盖JSHint默认配置的选项
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'css/',
                src: ['*.css'],
                dest: 'css/',
                ext: '.min.css'
            },
            combine: {
                files: {
                    'css/out.min.css': ['css/*.css']
                }
            }
        },
        autoprefixer: {
            build: {
                expand: true,
                cwd: 'css/',
                src: ['*.css'],
                dest: 'css/',
                ext: '.pre.css'
            }
        },
        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true,
                },
                src: ['html/*.html']
            }
        }
    });

    // 从node_modules目录加载模块文件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-htmlhint');

    // 被执行的任务列表。
    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('uglifyjs', ['uglify']);
    grunt.registerTask('testjs', ['jshint']);
    grunt.registerTask('combjs', ['concat']);
    grunt.registerTask('mincss', ['cssmin:minify']);
    grunt.registerTask('combcss', ['cssmin:combine']);
    grunt.registerTask('prefixercss', ['autoprefixer']);
    grunt.registerTask('testhtml', ['htmlhint']);
};