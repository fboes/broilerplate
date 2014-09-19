module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dirs: {
			web: ''
		},

		/*sass: {
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
		},*/
		compass: {
			build: {
				options: {
					basePath: '<%= dirs.web %>',
					config: '<%= dirs.web %>config.rb'
				}
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			grunt: {
				options: {
					livereload: false,
				},
				files: ['Gruntfile.js']
			},
			sass: {
				options: {
					livereload: false,
				},
				files: ['<%= compass.build.options.basePath %>sass/**/*.scss'],
				tasks: ['compass'] // or 'sass'
			},
			stuff: {
				files: ['<%= dirs.web %>css/*.css', '<%= dirs.web %>*.html'],
				tasks: []
			}
		}
	});

	// Load the plugins
	// grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['compass']); // or 'sass'
};
