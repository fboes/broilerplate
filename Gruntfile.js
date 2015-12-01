module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		develop: false,
		dirs: {
			htdocs:   '<%= pkg.directories.lib %>/',
			source:   'src/',
			template: '<%= dirs.htdocs %>',
			images:   '<%= dirs.htdocs %>images/',
			build:  'build/'
		},

		jshint: {
			options: { // see https://github.com/jshint/jshint/blob/master/examples/.jshintrc
				browser: true,
				jquery: true,
				strict: true,
				curly: true
			},
			build: {
				files: {
					src: [
						'<%= dirs.source %>js-src/**/*.js',
						'!<%= dirs.source %>js-src/vendor/*.js'
					]
				}
			}
		},

		uglify: {
			options: {
				// mangle: false,
				// beautify: true,
				// compress: false,
				maxLineLen: 9000,
				sourceMap: '<%= develop %>'
			},
			build: {
				files: {
					'<%= dirs.template %>js/scripts.js': [
						'<%= dirs.source %>js-src/vendor/*.js', // disable this line by prepending '!' - in case of errors
						'<%= dirs.source %>js-src/modules/*.js',
						'<%= dirs.source %>js-src/main.js'
					]
				}
			}
		},

		sass: {
			options: {
				style: 'compact',
				sourcemap: 'none' // 'auto', depending on '<%= develop %>'
			},
			build: {
				files: [{
					expand: true,
					cwd: '<%= dirs.source %>sass',
					src: ['*.scss'],
					dest: '<%= dirs.template %>css',
					ext: '.css'
				}]
			}
		},

		postcss: {
			options: {
				map: '<%= develop %>'
			},
			build: {
				options: {
					processors: [
						require('autoprefixer')({browsers: ['last 2 versions', '> 5%', 'ie 8', 'ie 9']})
					]
				},
				src: '<%= dirs.template %>css/*.css'
			},
			rtl: {
				options: {
					processors: [
						require('rtlcss')()
					]
				},
				src: '<%= dirs.template %>css/styles.css',
				dest: '<%= dirs.template %>css/rtl.css'
			}
		},

		/*compass: {
			build: {
				options: {
					basePath: '<%= dirs.template %>',
					config: '<%= dirs.template %>config.rb'
				}
			}
		},*/

		kss : {
			build: {
				files: {
					'<%= pkg.directories.doc %>/styleguide': '<%= dirs.source %>sass/'
				}
			}
		},

		appcache: {
			options: {
				preferOnline: true,
				basePath: '<%= dirs.htdocs %>'
			},
			all: {
				dest: '<%= dirs.template %>/manifest.appcache',
				cache: {
					patterns: [
						'<%= dirs.template %>/*',
						'!<%= dirs.template %>/*.html',
						'<%= dirs.template %>/css/*',
						'<%= dirs.template %>/fonts/**/*',
						'<%= dirs.template %>/images/*',
						'<%= dirs.template %>/js/**/*'
					]
				},
				network: '*'
			}
		},
		replace: {
			oldie: {
				src: ['<%= dirs.template %>css/*.css'],
				dest: '<%= dirs.template %>css/oldie/',
				replacements: [
					{from: /\/\*#.+?\*\//g, to: ''},
					{from: /@media[^\{]+tty[^\{]+\{ (.+ \}) \}(\s*)/g, to: '$1$2'},
					{from: /(@media[^\{]+device-pixel-ratio[^\{]+\{ [\s\S]+? \} \}\s*)/g, to: ''},
					{from: /(@media screen) [^\{]+ \(max-width: \d+px\)( \{ [\s\S]+? \} \}\s*)/g, to: ''},
					{from: /(@media screen) and \(.+?\)( \{ [\s\S]+? \} \}\s*)/g, to: '$1$2'},
					{from: /-(moz|webkit)-[^\{]+?:.+?;\s*/g, to: ''},
					{from: /(transition|border-[\S]*radius):.+?;\s*/g, to: ''},
					{from: /opacity: 0;\s*/g, to: 'visibility: hidden; '},
					{from: /opacity: 1;\s*/g, to: 'visibility: visible; '},
					{from: /(rgba\(.+?),\s?[\d\.]+(\))/g, to: '$1$2'},
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
					{from: /(@media[^\{]+tty[^\{]+\{ [\s\S]+? \} \}\s*)/g, to: ''}
				]
			}
		},

		image_resize: {
			options: {overwrite: true, upscale: true, crop: true, gravity: 'Center', quality: 0.7},
			fav32: {
				options: {width: 32},
				files:   {'<%= dirs.template %>favicon.ico':'<%= dirs.images %>logo.png'}
			},
			fav96: {
				options: {width: 96},
				files:   {'<%= dirs.template %>favicon-96x96.png':'<%= dirs.images %>logo.png'}
			},
			fav152: {
				options: {width: 152},
				files:   {'<%= dirs.template %>apple-touch-icon-precomposed.png':'<%= dirs.images %>logo.png'}
			},
			fav196: {
				options: {width: 196},
				files:   {'<%= dirs.template %>favicon-196x196.png':'<%= dirs.images %>logo.png'}
			},
			tile128: {
				options: {width: 128},
				files:   {'<%= dirs.images %>tile-128x128.png':'<%= dirs.images %>logo.png'}
			},
			tile270: {
				options: {width: 270},
				files:   {'<%= dirs.images %>tile-270x270.png':'<%= dirs.images %>logo.png'}
			},
			tilewide: {
				options: {width: 558, height:270},
				files:   {'<%= dirs.images %>tile-558x270.png':'<%= dirs.images %>logo.png'}
			},
			tile558: {
				options: {width: 558},
				files:   {'<%= dirs.images %>tile-558x558.png':'<%= dirs.images %>logo.png'}
			},
			article_images: {
				options: {width: 640, height: 360, crop: true, gravity: 'Center'},
				src:  '<%= dirs.images %>originals/*.jpg',
				dest: '<%= dirs.images %>articles-640/'
			},
			article_images2: {
				options: {width: 1280, height: 720, crop: true, gravity: 'Center'},
				src:  '<%= dirs.images %>originals/*.jpg',
				dest: '<%= dirs.images %>articles-1280/'
			}
		},

		shell: {
			deploy_live:  { command: '<%= dirs.build %>deploy.sh live'}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js']
			},
			sass: {
				options: {livereload: true},
				files: ['<%= dirs.source %>sass/**/*.scss'],
				tasks: ['build-css']
			},
			js: {
				options: {livereload: true},
				files: ['<%= jshint.build.files.src %>'],
				tasks: ['build-js']
			},
			logo: {
				files: ['<%= dirs.images %>logo.png'],
				tasks: ['build-icons']
			},
			article_images: {
				files: ['<%= image_resize.article_images.src %>'],
				tasks: ['build-article-images']
			},
			livereload: {
				options: {livereload: true},
				files: ['<%= dirs.template %>*.html','<%= dirs.template %>images/*']
			}
		}
	});

	// Load the plugins
	require('jit-grunt')(grunt, {
		replace: 'grunt-text-replace',
		postcss: 'grunt-postcss'
	});

	// Default task(s).
	grunt.registerTask('build-css',   ['sass','postcss','replace:oldie','replace:notty', 'appcache']);
	grunt.registerTask('build-js',    ['jshint','uglify', 'appcache']);
	grunt.registerTask('build-icons', ['image_resize:fav32','image_resize:fav96','image_resize:fav152','image_resize:fav196','image_resize:tile128','image_resize:tile270','image_resize:tilewide','image_resize:tile558', 'appcache']);
	grunt.registerTask('build-article-images', ['image_resize:article_images','image_resize:article_images2']);
	grunt.registerTask('default',     ['build-js','build-css','build-icons']);
	grunt.registerTask('deploy-live', ['shell:deploy_live']);
};
