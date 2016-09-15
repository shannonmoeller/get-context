/*jshint node:true */
'use strict';

module.exports = function (grunt) {
    // Plugins
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Config
    grunt.initConfig({
        // Metadata
        pkg: require('./package.json'),

        // Lint scripts
        jshint: {
            options: { jshintrc: '.jshintrc' },
            all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.test.js']
        },

        // Bundle and wrap scripts
        browserify: {
            build: {
                options: { standalone: '<%= pkg.name %>' },
                src: ['lib/<%= pkg.name %>.js'],
                dest: '<%= pkg.name %>.js'
            },
            test: {
                options: { debug: true },
                src: ['test/**/*.test.js'],
                dest: 'test/all.js'
            }
        },

        // Test scripts
        simplemocha: {
            options: { reporter: 'spec' },
            all: ['test/all.js']
        },

        // Delete generated files
        clean: {
            js: ['<%= pkg.name %>.js', 'test/all.js'],
            node: ['node_modules']
        },

        // File watching
        watch: {
            options: { livereload: true },
            js: {
                files: ['lib/**/*.js', 'test/**/*.test.js'],
                tasks: ['js']
            }
        }
    });

    // Tasks
    grunt.registerTask('js', ['clean:js', 'jshint', 'browserify']);
    grunt.registerTask('test', ['js', 'simplemocha']);
    grunt.registerTask('default', ['test']);
};
