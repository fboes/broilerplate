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
				files: {
					'<%= dirs.web %>css/styles.css' : '<%= dirs.web %>sass/styles.scss',
					'<%= dirs.web %>css/desktop.css': '<%= dirs.web %>sass/desktop.scss'
				}
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
		watch: {
			grunt: {
				files: ['Gruntfile.js']
			},
			sass: {
				options: {
					livereload: false,
				},
				files: ['<%= dirs.web %>sass/*.scss'],
				tasks: ['sass'] // or 'compass'
			},
			stuff: {
				options: {
					livereload: true,
				},
				files: ['<%= dirs.web %>css/*.css', '<%= dirs.web %>*.html', '<%= dirs.web %>js/*.js'],
				tasks: []
			}
		}
	});

	// Load the plugins
	require('jit-grunt')(grunt);

	// Default task(s).
	grunt.registerTask('default', ['compass']); // or 'sass'
};
