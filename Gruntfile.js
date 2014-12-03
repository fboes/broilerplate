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

		watch: {
			grunt: {
				files: ['Gruntfile.js']
			},
			sass: {
				files: ['<%= dirs.web %>sass/**/*.scss'],
				tasks: ['sass','autoprefixer'] // or 'compass'
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
	require('jit-grunt')(grunt);

	// Default task(s).
	grunt.registerTask('default', ['sass','autoprefixer']); // or 'compass'
};
