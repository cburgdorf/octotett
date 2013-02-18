module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      app: ['dest']
    },
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
    },
    uglify: {
      app: {
          options: {
              sourceMap: 'dest/source-map.js',
              beautify: true,
              compress: false
          },
          files: {
              'dest/app.min.js': [
                  'libs/jsdeferred/jsdeferred.nodoc.js',
                  'libs/quartettjs/quartett.min.js',
                  'libs/quartettjs/quartett.data.js',
                  '<%= sencha_dependencies_app %>'
              ]
          }
      }
    },
    copy: {
      app: {
          files: [
              //{expand: true, src: ['src/**'], dest: 'dest/', cwd: '../libs/touch-2.1.1/'},
              {src: ['resources/**'], dest: 'dest/'},
              {src: ['index.html'], dest: 'dest/'}
          ],
          options: {
              processContent: function(content, filePath) {
                  if (/index.html/.test(filePath)) {
                      // remove the ext script
                      content = content.replace(/<script.*id="microloader".*><\/script>/, '<script src="app.min.js"></script><link rel="stylesheet" href="resources/css/app.css">');
                      // now update the css location
                      content = content.replace(/\.\.\/libs\/ext-4.1.1a\//, '');
                      return content.replace(/app\/app.js/, 'app.min.js');
                  }
                  return content;
              }
          }
      }
    }
  });




  //grunt.loadNpmTasks('grunt-sencha-dependencies');
  grunt.loadTasks('grunt-sencha-dependencies-0.3.1');

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['clean:app', 'sencha_dependencies:app', 'uglify:app', 'copy:app']);

};

