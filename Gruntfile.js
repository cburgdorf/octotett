module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sencha_dependencies: {
      app: {
          options : {
              appFile: 'app.js',
              senchaDir: 'touch',
              isTouch: true,
              printDepGraph: true,
              mode: 'dynMock'
          }
      }
    }
  });




  //grunt.loadNpmTasks('grunt-sencha-dependencies');
  grunt.loadTasks('grunt-sencha-dependencies-0.3.1');


    // Default task(s).


  grunt.registerTask('dep', ['sencha_dependencies:app']);

};

