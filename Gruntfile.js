module.exports = function(grunt){

    //CONFIGURE grunt
    grunt.initConfig({
        uglify: {
            development: {
                //Expanded Files
                files: [
                    {
                        expand: true,
                        cwd:'./public/scripts/',
                        src:['*.js'],
                        dest: './public/scripts/min',
                        ext: '.min.js'
                    }
                ],
                options: {
                    sourceMap: true
                }
            },
        },
        cssmin: {
            development: {
                files: [
                    {
                        expand: true,
                        cwd: './public/stylesheets/',
                        src: ['*.css'],
                        dest: './public/stylesheets/min',
                        ext: '.min.css'
                    }
                ],
                options: {
                    sourceMap: true
                }    
            },
        },
        watch: {
            uglify: {
                files: './public/scripts/*.js',
                tasks: ['uglify:development']
            },
            cssmin: {
                files: './public/stylesheets/*.css',
                tasks: ['cssmin:development']
            }
        }
    });

    grunt.registerTask('default',['watch']);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
};