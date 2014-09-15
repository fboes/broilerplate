module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			build: {
				options: {
					style: 'compact',
					sourcemap: 'none'
				},
				files: [{
					expand: true,
					cwd: 'sass/',
					src: ['*.scss'],
					dest: 'css/',
					ext: '.css'
				}]
			}
		},
		compass: {
			build: {
				options: {
					//basePath: '',
					config: 'config.rb'
				}
			}
		},
		watch: {
			styles: {
				files: ['sass/**/*.scss'],
				tasks: ['sass'] // or 'compass'
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-sass');
	//grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['sass']); // or 'compass'
};
