'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ChillGenerator = module.exports = function ChillGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ChillGenerator, yeoman.generators.Base);

ChillGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'confirm',
    name: 'someOption',
    message: 'Yall ready for this?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    cb();
  }.bind(this));
};

ChillGenerator.prototype.app = function app() {
  this.mkdir('app');

  this.copy('bowerrc', '.bowerrc');
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

ChillGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('favicon.ico', 'app/favicon.ico');
  this.copy('index.html', 'app/index.html');

  this.mkdir('app/scripts');
  this.mkdir('app/scripts/vendor');
  this.mkdir('app/img');
  this.mkdir('app/styles');
  this.mkdir('app/scripts/fonts');

  this.copy('styles/_animations.sass', 'app/styles/_animations.sass');
  this.copy('styles/_fonts.sass', 'app/styles/_fonts.sass');
  this.copy('styles/_global.sass', 'app/styles/_global.sass');
  this.copy('styles/_helperclasses.sass', 'app/styles/_helperclasses.sass');
  this.copy('styles/_print.sass', 'app/styles/_print.sass');
  this.copy('styles/oldie.sass', 'app/styles/oldie.sass');
  this.copy('styles/style.sass', 'app/styles/style.sass');

  this.copy('scripts/plugins.js', 'app/scripts/plugins.js');
  this.copy('scripts/main.js', 'app/scripts/main.js');



};
