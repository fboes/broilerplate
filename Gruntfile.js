module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dirs: {
			web: ''
		},

		sass: {
			build: {
				options: {
					style: 'compact'
				},
				files: [{
					expand: true,
					cwd: '<%= dirs.web %>sass',
					src: ['*.scss'],
					dest: '<%= dirs.web %>css',
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
				src: '<%= dirs.web %>css/*.css',
				dest: '<%= dirs.web %>css/'
			}
		},
		/*compass: {
			build: {
				options: {
					basePath: '<%= dirs.web %>',
					config: '<%= dirs.web %>config.rb'
				}
			}
		},*/

		/*styleguide : {
			options: {
				framework: {
					name: 'kss'
				},
				name: 'SASS Styleguide'
			},
			build: {
				files: {
					'<%= dirs.web %>docs/styleguide': '<%= dirs.web %>sass/styles.scss'
				}
			}
		},*/

		replace: {
			rtl: {
				src: ['<%= dirs.web %>css/styles.css'],
				dest: '<%= dirs.web %>css/rtl.css',
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
				src: ['<%= dirs.web %>css/*.css'],
				dest: '<%= dirs.web %>css/oldie/',
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
				src: ['<%= dirs.web %>css/*.css'],
				overwrite: true,
				replacements: [
					{from: /(@media[^\{]+tty[^\{]+\{ [\s\S]+? \} \}\s*)/g, to: ''}
				]
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js']
			},
			sass: {
				files: ['<%= dirs.web %>sass/**/*.scss'],
				tasks: ['sass','autoprefixer','replace'] // or 'compass','styleguide'
			},
			livereload: {
				options: {
					livereload: true,
				},
				files: [
					'<%= dirs.web %>css/*.css',
					'<%= dirs.web %>*.html',
					'<%= dirs.web %>js/*.js',
					'<%= dirs.web %>images/*'
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
	grunt.registerTask('default', ['sass','autoprefixer','replace']); // or 'compass','styleguide'
};
