module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dirs: {
			htdocs:   'htdocs/',
			template: '<%= dirs.htdocs %>',
			images:   '<%= dirs.htdocs %>images/',
			docs:     'docs/',
			setup:    'setup/'
		},

		jshint: {
			build: {
				files: {
					src: [
						'<%= dirs.template %>js/*.js',
						'!<%= dirs.template %>js/*.min.js'
					]
				},
				options: { // see https://github.com/jshint/jshint/blob/master/examples/.jshintrc
					browser: true,
					jquery: true,
					strict: true,
					curly: true
				}
			}
		},

		uglify: {
			build: {
				 options: {
					// mangle: false,
					// beautify: true,
					// compress: false,
					maxLineLen: 9000,
					sourceMap: true
				},
				files: {
					'<%= dirs.template %>js/main.min.js': [
						'<%= dirs.template %>js/main.js', // add your vendors here
						'!<%= dirs.template %>js/main.min.js'
					]
				}
			}
		},

		sass: {
			build: {
				options: {
					style: 'compact'
				},
				files: [{
					expand: true,
					cwd: '<%= dirs.template %>sass',
					src: ['*.scss'],
					dest: '<%= dirs.template %>css',
					ext: '.css'
				}]
			}
		},

		postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer-core')({browsers: ['last 1 version']})
				]
			},
			build: {
				src: '<%= dirs.template %>css/*.css',
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
					'<%= dirs.docs %>styleguide': '<%= dirs.template %>sass/'
				}
			}
		},

		replace: {
			rtl: {
				src: ['<%= dirs.template %>css/styles.css'],
				dest: '<%= dirs.template %>css/rtl.css',
				replacements: [
					{from: /(\W)left(\W)/g, to: '$1xrite$2'},
					{from: /(\W)right(\W)/g, to: '$1left$2'},
					{from: /(\W)xrite(\W)/g, to: '$1right$2'},
					{from: /:\s?(\d[a-z0-9\.]*) (\d[a-z0-9\.]*) (\d[a-z0-9\.]*) (\d[a-z0-9\.]*);/g, to: ':$1 $4 $3 $2;'},
					{from: /(\W)rtl(\W)/g, to: '$1ltr$2'},
					{from: /((body|html) \{ )/g, to: '$1direction: rtl; '}
				]
			},
			oldie: {
				src: ['<%= dirs.template %>css/*.css'],
				dest: '<%= dirs.template %>css/oldie/',
				replacements: [
					{from: /\/\*#.+?\*\//g, to: ''},
					{from: /@media[^\{]+tty[^\{]+\{ (.+ \}) \}(\s*)/g, to: '$1$2'},
					{from: /(@media[^\{]+device-pixel-ratio[^\{]+\{ [\s\S]+? \} \}\s*)/g, to: ''},
					{from: /(@media screen) [^\{]+ \(max-width: \d+px\)( \{ [\s\S]+? \} \}\s*)/g, to: ''},
					{from: /(@media screen) and \(.+?\)( \{ [\s\S]+? \} \}\s*)/g, to: '$1$2'},
					{from: /-moz-[^\{]+?:.+?;\s*/g, to: ''},
					{from: /-webkit-[^\{]+?:.+?;\s*/g, to: ''},
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
				src: ['<%= dirs.template %>css/*.css'],
				overwrite: true,
				replacements: [
					{from: /(@media[^\{]+tty[^\{]+\{ [\s\S]+? \} \}\s*)/g, to: ''}
				]
			},
			htmlrtl: {
				src: ['<%= dirs.template %>index.html'],
				dest: '<%= dirs.template %>rtl.html',
				replacements: [
					{from: / lang="de"/g, to: ' lang="ar" dir="rtl"'},
					{from: /styles\.css/g, to: 'rtl.css'}
				]
			},
			variables: {
				src: ['<%= dirs.template %>*.html', '<%= dirs.template %>*.xml'],
				overwrite: true,
				replacements: [
					{from: /\{\{ BASE_URL \}\}/g, to: '<?php echo(htmlspecialchars(\'http://\'.$_SERVER[\'HTTP_HOST\']));?>'},
					{from: /\{\{ SITENAME \}\}/g, to: '<?php echo(htmlspecialchars($sitename));?>'},
					{from: /\{\{ PAGE_RELATIVE_URL \}\}/g, to: '<?php echo(htmlspecialchars($_SERVER[\'SCRIPT_URL\']));?>'},
					{from: /\{\{ PAGE_TITLE \}\}/g, to: '<?php echo(htmlspecialchars($title));?>'},
					{from: /\{\{ PAGE_DESCRIPTION \}\}/g, to: '<?php echo(htmlspecialchars($description));?>'},
					{from: /\{\{ THEME_COLOR \}\}/g, to: '#aa00ff'}
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
				options: {width: 1280, height: 720, crop: true, gravity: 'Center'},
				src:  '<%= dirs.images %>originals/*.jpg',
				dest: '<%= dirs.images %>articles/'
			},
			article_images2: {
				options: {width: 2560, height: 1440, crop: true, gravity: 'Center'},
				src:  '<%= dirs.images %>originals/*.jpg',
				dest: '<%= dirs.images %>articles@2x/'
			}
		},

		shell: {
			deploy:  { command: '<%= dirs.setup %>deploy.sh'}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js']
			},
			sass: {
				options: {livereload: true},
				files: ['<%= dirs.template %>sass/**/*.scss'],
				tasks: ['build-sass']
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
	grunt.registerTask('build-sass',  ['sass','postcss','replace:rtl','replace:oldie','replace:notty']);
	grunt.registerTask('build-js',    ['jshint','uglify']);
	grunt.registerTask('build-icons', ['image_resize:fav32','image_resize:fav96','image_resize:fav152','image_resize:fav196','image_resize:tile128','image_resize:tile270','image_resize:tilewide','image_resize:tile558']);
	grunt.registerTask('build-article-images', ['image_resize:article_images','image_resize:article_images2']);
	grunt.registerTask('default',     ['build-js','build-sass','build-icons']);
	grunt.registerTask('deploy',      ['shell:deploy']);
};
