module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dirs: {
			web: ''
		},

		sass: {
			build: {
				options: {
					style: 'compact',
					sourcemap: 'none'
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
					{from: /left/g, to: 'xrite'},
					{from: /right/g, to: 'left'},
					{from: /xrite/g, to: 'right'},
					{from: /:\s?(\d[a-z0-9\.]*) (\d[a-z0-9\.]*) (\d[a-z0-9\.]*) (\d[a-z0-9\.]*);/g, to: ':$1 $4 $3 $2;'},
					{from: /"rtl"/g, to: '"ltr"'}
				]
			},
			oldie: {
				src: ['<%= dirs.web %>css/*.css'],
				dest: '<%= dirs.web %>css/oldie/',
				replacements: [
					//{from: /(@media screen) and \(min-width: 660px\)( \{ .+ \} \}\s*)/g, to: '$1$2'},
					//{from: /(@media screen) and \(min-width: 660px\)( \{ .+ \} \}\s*)/g, to: ''},
					//{from: /(@media screen) and \(.+?\)( \{ .+ \} \}\s*)/g, to: '$1$2'},
					{from: /(@media screen) and \(.+?\)( \{ .+ \} \}\s*)/g, to: ''},
					{from: /-moz-[^\{]+?:.+?;\s*/g, to: ''},
					{from: /-webkit-[^\{]+?:.+?;\s*/g, to: ''},
					{from: /(rgba\(.+?),\s?[\d\.]+(\))/g, to: '$1$2'},
					{from: /@media \(tty\) \{ (.+ \}) \}(\s*)/g, to: '$1$2'}
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
