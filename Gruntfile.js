module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc:true
      },
      build: {
        files: {
          src: [
            '<%= pkg.directories.js_src %>/**/*.js',
            '!<%= pkg.directories.js_src %>/vendor/*.js'
          ]
        }
      }
    },

    uglify: {
      options: {
        mangle: '<%= !pkg.config.develop %>',
        beautify: '<%= pkg.config.develop %>',
        sourceMap: '<%= pkg.config.develop %>',
        maxLineLen: 9000
      },
      build: {
        files: {
          '<%= pkg.directories.js %>/scripts.js': [
            '<%= pkg.directories.js_src %>/vendor/*.js', // disable this line by prepending '!' - in case of errors
            '<%= pkg.directories.js_src %>/modules/*.js',
            '<%= pkg.directories.js_src %>/main.js'
          ]
        }
      }
    },

    sass: {
      options: {
        style: 'compact',
        sourcemap: '<%= pkg.config.develop ? \'auto\' : \'none\' %>'
      },
      build: {
        files: [{
          expand: true,
          cwd: '<%= pkg.directories.sass %>',
          src: ['*.scss'],
          dest: '<%= pkg.directories.css %>',
          ext: '.css'
        }]
      }
    },

    postcss: {
      options: {
        map: '<%= pkg.config.develop %>'
      },
      build: {
        options: {
          processors: [
            require('autoprefixer')({browsers: ['last 2 versions', '> 0.5%', 'ie 8-11']})
          ]
        },
        src: '<%= pkg.directories.css %>/*.css'
      },
      rtl: {
        options: {
          processors: [
            require('rtlcss')()
          ]
        },
        src: '<%= pkg.directories.css %>/styles.css',
        dest: '<%= pkg.directories.css %>/rtl.css'
      }
    },

    appcache: {
      options: {
        preferOnline: true,
        basePath: '<%= pkg.directories.htdocs %>/'
      },
      all: {
        dest: '<%= pkg.directories.template %>/manifest.appcache',
        cache: {
          patterns: [
            '<%= pkg.directories.template %>/*',
            '!<%= pkg.directories.template %>/*.html',
            '<%= pkg.directories.css %>/*',
            '<%= pkg.directories.template %>/fonts/**/*',
            '<%= pkg.directories.images %>/*',
            '<%= pkg.directories.js %>/**/*'
          ]
        },
        network: '*'
      }
    },
    replace: {
      oldie: {
        src: ['<%= pkg.directories.css %>/*.css'],
        dest: '<%= pkg.directories.css %>/oldie/',
        replacements: [
          {from: /(\n)\s*\n/g, to: '$1'},
          {from: /\/\*#.+?\*\//g, to: ''},
          {from: /@media[^\{]+tty[^\{]+\{ (.+ \}) \}(\s*)/g, to: '$1$2'},
          {from: /(@media[^\{]+device-pixel-ratio[^\{]+\{ [\s\S]+? \} \}\s*)/g, to: ''},
          {from: /(@media screen) [^\{]+ \(max-width: \d+px\)( \{ [\s\S]+? \} \}\s*)/g, to: ''},
          {from: /(@media screen) and \(.+?\)( \{ [\s\S]+? \} \}\s*)/g, to: '$1$2'},
          {from: /(transition|border-[\S]*radius):.+?;\s*/g, to: ''},
          {from: /opacity: 0;\s*/g, to: 'visibility: hidden; '},
          {from: /opacity: 1;\s*/g, to: 'visibility: visible; '},
          {from: /rgba(\(.+?),\s?[\d\.]+(\))/g, to: 'rgb$1$2'},
          {from: /\s\S+\s?\{\s+\}/g, to: ''},
          {from: /([\d\.]+)vw/g,  to: function (matchedWord, index, fullText, regexMatches) {
            return Math.round(parseFloat(regexMatches[0]) * 10.24) + 'px'; // matches 1024px
          }},
          {from: /([\d\.]+)vh/g,  to: function (matchedWord, index, fullText, regexMatches) {
            return Math.round(parseFloat(regexMatches[0]) * 7.68) + 'px'; // matches 768 px
          }},
          {from: /([\d\.]+)rem/g, to: function (matchedWord, index, fullText, regexMatches) {
            return Math.round(parseFloat(regexMatches[0]) * 12) + 'px'; // matches $fontsize-default
          }}
        ]
      },
      notty: {
        src: ['<%= replace.oldie.src %>'],
        overwrite: true,
        replacements: [
          {from: /(\n)\s*\n/g, to: '$1'},
          {from: /(@media[^\{]+tty[^\{]+\{ [\s\S]+? \} \}\s*)/g, to: ''}
        ]
      }
    },

    /*image_resize: {
      options: {overwrite: true, upscale: true, crop: true, gravity: 'Center', quality: 0.7},
      fav32: {
        options: {width: 32},
        files:   {'<%= pkg.directories.template %>/favicon.ico':'<%= pkg.directories.images %>/logo.png'}
      },
      fav96: {
        options: {width: 96},
        files:   {'<%= pkg.directories.template %>/favicon-96x96.png':'<%= pkg.directories.images %>/logo.png'}
      },
      fav152: {
        options: {width: 152},
        files:   {'<%= pkg.directories.template %>/apple-touch-icon-precomposed.png':'<%= pkg.directories.images %>/logo.png'}
      },
      fav196: {
        options: {width: 196},
        files:   {'<%= pkg.directories.template %>/favicon-196x196.png':'<%= pkg.directories.images %>/logo.png'}
      },
      tile128: {
        options: {width: 128},
        files:   {'<%= pkg.directories.images %>/tile-128x128.png':'<%= pkg.directories.images %>/logo.png'}
      },
      tile270: {
        options: {width: 270},
        files:   {'<%= pkg.directories.images %>/tile-270x270.png':'<%= pkg.directories.images %>/logo.png'}
      },
      tilewide: {
        options: {width: 558, height:270},
        files:   {'<%= pkg.directories.images %>/tile-558x270.png':'<%= pkg.directories.images %>/logo.png'}
      },
      tile558: {
        options: {width: 558},
        files:   {'<%= pkg.directories.images %>/tile-558x558.png':'<%= pkg.directories.images %>/logo.png'}
      },
      article_images: {
        options: {width: 640, height: 360, crop: true, gravity: 'Center'},
        src:  '<%= pkg.directories.images %>/originals/*.jpg',
        dest: '<%= pkg.directories.images %>/articles-640/'
      },
      article_images2: {
        options: {width: 1280, height: 720, crop: true, gravity: 'Center'},
        src:  '<%= pkg.directories.images %>/originals/*.jpg',
        dest: '<%= pkg.directories.images %>/articles-1280/'
      }
    },*/

    shell: {
      deploy_live:     { command: 'npm run deploy-live'},
      vagrant_up:      { command: 'npm run vagrant-up'},
      vagrant_suspend: { command: 'npm run vagrant-suspend'},
      options: {
        execOptions: {
          maxBuffer: Infinity
        }
      }
    },

    watch: {
      options: {livereload: true},
      grunt: {
        options: {livereload: false},
        files: ['Gruntfile.js','package.json']
      },
      sass: {
        files: ['<%= pkg.directories.sass %>/**/*.scss'],
        tasks: ['build-css']
      },
      js: {
        files: ['<%= jshint.build.files.src %>'],
        tasks: ['build-js']
      },
      /*logo: {
        files: ['<%= pkg.directories.images %>/logo.png'],
        tasks: ['build-icons']
      },
      article_images: {
        files: ['<%= image_resize.article_images.src %>'],
        tasks: ['build-article-images']
      },*/
      livereload: {
        files: ['<%= pkg.directories.template %>*.html','<%= pkg.directories.images %>/*']
      }
    }
  });

  // Load the plugins
  require('load-grunt-tasks')(grunt);

  // Default task(s).
  grunt.registerTask('build-css',   ['sass','postcss','replace:oldie','replace:notty', 'appcache']);
  grunt.registerTask('build-js',    ['jshint','uglify', 'appcache']);
  //grunt.registerTask('build-icons', ['image_resize:fav32','image_resize:fav96','image_resize:fav152','image_resize:fav196','image_resize:tile128','image_resize:tile270','image_resize:tilewide','image_resize:tile558', 'appcache']);
  //grunt.registerTask('build-article-images', ['image_resize:article_images','image_resize:article_images2']);
  grunt.registerTask('default',     ['build-js','build-css']); // ,'build-icons'
  grunt.registerTask('deploy-live', ['shell:deploy_live']);
  grunt.registerTask('vagrant-up',  ['shell:vagrant_up']);
  grunt.registerTask('vagrant-suspend', ['shell:vagrant_suspend']);
};
