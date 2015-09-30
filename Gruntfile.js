module.exports = function(grunt){
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        copy : {
            main: {
                files:[
                    {
                        expand: true,flatten: true, src: ['jspm_packages/github/pusulurm/directive1@master/i18n/*'], dest: 'dist/directive1/i18n', filter: 'isFile'
                    },
                    {
                        expand: true,flatten: true, src: ['jspm_packages/github/pusulurm/directive2@master/i18n/*'], dest: 'dist/directive2/i18n', filter: 'isFile'
                    },
                    {
                        expand: true, flatten: true, src: ['i18n/*'], dest: 'dist/main/i18n', filter: 'isFile'
                    }
                ]
        }
        }
    });
    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', ['copy']);
};