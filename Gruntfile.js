module.exports = function (grunt) {
  grunt.initConfig({
    browserify: {
      options: {
        transform: [["babelify", { "stage": 0 }]],
        browserifyOptions: {
          debug: true
        },
        watch: true
      },
      debug: {
        files: {
          'js/main.js': ['src/main.js']
        }
      }
    },
    less: {
      dist: {
        options: {
          paths: ['src/less'],
        },
        files: {
          'css/main.css': 'src/less/main.less'
        }
      }
    },
    clean: {
      css: ['css/main.css'],
      js: ['js/main.js']
    },
    watch: {
      css: {
        files: [
          'src/**/*.less'
        ],
        tasks: ['build']
      },
      js: {
        files: [
          'src/main.js',
          'src/**/*.js',
          'src/templates/*.ejs'
        ],
        tasks: ['build']
      }
    },
    /* Checks for outdated npm dependencies before release. */
    outdated: {
      release: {
        development: false
      }
    }
  });


  // Loading dependencies
  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    if (key !== 'grunt' && key.indexOf('grunt') === 0) { grunt.loadNpmTasks(key); }
  }

  grunt.registerTask('css',           ['clean:css','less:dist']);

  grunt.registerTask('js',            ['clean:js','browserify:debug']);
  grunt.registerTask('build',         ['css', 'js']);

  grunt.registerTask('dev',           ['build', 'watch']);
};