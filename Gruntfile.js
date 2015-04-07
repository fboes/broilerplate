module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dirs: {
			htdocs: 'htdocs/',
			docs:   'docs/'
		},

		jshint: {
			build: {
				files: {
					src: [
						'<%= dirs.htdocs %>js/*.js',
						'!<%= dirs.htdocs %>js/*.min.js'
					]
				},
				options: { // see https://github.com/jshint/jshint/blob/master/examples/.jshintrc
					browser: true,
					jquery: true,
					strict: true
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
					'<%= dirs.htdocs %>js/main.min.js': [
						'<%= dirs.htdocs %>js/main.js', // add your vendors here
						'!<%= dirs.htdocs %>js/main.min.js'
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
					cwd: '<%= dirs.htdocs %>sass',
					src: ['*.scss'],
					dest: '<%= dirs.htdocs %>css',
					ext: '.css'
				}]
			}
		},

		autoprefixer: {
			build: {
				expand: true,
				flatten: true,
				options: {
					map: true
				},
				src: '<%= dirs.htdocs %>css/*.css',
				dest: '<%= dirs.htdocs %>css/'
			}
		},

		/*compass: {
			build: {
				options: {
					basePath: '<%= dirs.htdocs %>',
					config: '<%= dirs.htdocs %>config.rb'
				}
			}
		},*/

		styleguide : {
			options: {
				framework: {
					name: 'kss'
				},
				name: 'SASS Styleguide'
			},
			build: {
				files: {
					'<%= dirs.docs %>styleguide': '<%= dirs.htdocs %>sass/styles.scss'
				}
			}
		},

		replace: {
			rtl: {
				src: ['<%= dirs.htdocs %>css/styles.css'],
				dest: '<%= dirs.htdocs %>css/rtl.css',
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
				src: ['<%= dirs.htdocs %>css/*.css'],
				dest: '<%= dirs.htdocs %>css/oldie/',
				replacements: [
					{from: /\/\*#.+?\*\//g, to: ''},
					{from: /(@media[^\{]+device-pixel-ratio[^\{]+\{ [\s\S]+? \} \}\s*)/g, to: ''},
					//{from: /(@media screen) and \(max-width: (660)px\)( \{ [\s\S]+? \} \}\s*)/g, to: '$1$2'},
					//{from: /(@media screen) and \(max-width: (660)px\)( \{ [\s\S]+? \} \}\s*)/g, to: ''},
					{from: /(@media screen) and \(.+?\)( \{ [\s\S]+? \} \}\s*)/g, to: '$1$2'},
					//{from: /(@media screen) and \(.+?\)( \{ [\s\S]+? \} \}\s*)/g, to: ''},
					{from: /-moz-[^\{]+?:.+?;\s*/g, to: ''},
					{from: /-webkit-[^\{]+?:.+?;\s*/g, to: ''},
					{from: /(transition|border-[\S]*radius):.+?;\s*/g, to: ''},
					{from: /opacity: 0;\s*/g, to: 'visibility: hidden; '},
					{from: /opacity: 1;\s*/g, to: 'visibility: visible; '},
					{from: /(rgba\(.+?),\s?[\d\.]+(\))/g, to: '$1$2'},
					{from: /@media \(tty\) \{ (.+ \}) \}(\s*)/g, to: '$1$2'},
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
				src: ['<%= dirs.htdocs %>css/*.css'],
				overwrite: true,
				replacements: [
					{from: /(@media[^\{]+tty[^\{]+\{ [\s\S]+? \} \}\s*)/g, to: ''}
				]
			}
		},

		image_resize: {
			options: {overwrite:true},
			fav16: {
				options: {width: 16},
				files:   {'<%= dirs.htdocs %>favicon-16x16.png':'<%= dirs.htdocs %>images/logo.png'}
			},
			fav32: {
				options: {width: 32},
				files:   {
					'<%= dirs.htdocs %>favicon-32x32.png':'<%= dirs.htdocs %>images/logo.png',
					'<%= dirs.htdocs %>favicon.ico':'<%= dirs.htdocs %>images/logo.png'
				}
			},
			fav96: {
				options: {width: 96},
				files:   {'<%= dirs.htdocs %>favicon-96x96.png':'<%= dirs.htdocs %>images/logo.png'}
			},
			fav152: {
				options: {width: 152},
				files:   {'<%= dirs.htdocs %>apple-touch-icon-precomposed.png':'<%= dirs.htdocs %>images/logo.png'}
			},
			fav196: {
				options: {width: 196},
				files:   {'<%= dirs.htdocs %>favicon-196x196.png':'<%= dirs.htdocs %>images/logo.png'}
			}
		},

		shell: {
			prev: { command: 'ssh example.com "cd your-directory && git pull && exit"'}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js']
			},
			sass: {
				options: {
					livereload: true,
				},
				files: ['<%= dirs.htdocs %>sass/**/*.scss'],
				tasks: ['sass','autoprefixer','replace']
			},
			scripts: {
				options: {
					livereload: true,
				},
				files: ['<%= jshint.build.files.src %>'],
				tasks: ['jshint','uglify']
			},
			livereload: {
				options: {
					livereload: true,
				},
				files: [
					'<%= dirs.htdocs %>*.html',
					'<%= dirs.htdocs %>images/*'
				],
				tasks: []
			}
		}
	});

	// Load the plugins
	require('jit-grunt')(grunt, {
		replace: 'grunt-text-replace'
	});

	// Default task(s).
	grunt.registerTask('default', ['jshint','uglify','sass','autoprefixer','replace','styleguide','image_resize']);
};
