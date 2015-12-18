module.exports = function(grunt) {

  grunt.initConfig({

    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'CHANGELOG.md'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        prereleaseName: 'beta',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    }
  });

  grunt.registerTask('release', function () {
    this.args.unshift('bump-only');
    grunt.task.run([
      this.args.join(':'),
      'changelog',
      'bump-commit'
    ]);
  });


  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-conventional-changelog');
};
