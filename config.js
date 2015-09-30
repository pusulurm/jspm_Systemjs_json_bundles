System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "traceur",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  bundles: {
    "dist/directive2/directive2.js": [
      "github:pusulurm/directive2@master",
      "github:pusulurm/directive2@master/main",
      "github:pusulurm/directive2@master/myDirective2",
      "github:pusulurm/directive2@master/_directive2_template_cache",
      "github:pusulurm/directive2@master/directive2_locale_cache",
      "github:pusulurm/directive2@master/dirCtrl2",
      "github:pusulurm/directive2@master/i18n/en_CA.json!github:systemjs/plugin-json@0.1.0",
      "github:pusulurm/directive2@master/i18n/en_US.json!github:systemjs/plugin-json@0.1.0",
      "github:pusulurm/directive2@master/i18n/fr_CA.json!github:systemjs/plugin-json@0.1.0"
    ],
    "dist/directive1/directive1.js": [
      "github:pusulurm/directive1@master",
      "github:pusulurm/directive1@master/main",
      "github:pusulurm/directive1@master/myDirective1",
      "github:pusulurm/directive1@master/_directive1_template_cache",
      "github:pusulurm/directive1@master/directive1_locale_cache",
      "github:pusulurm/directive1@master/dirCtrl1",
      "github:pusulurm/directive1@master/i18n/en_CA.json!github:systemjs/plugin-json@0.1.0",
      "github:pusulurm/directive1@master/i18n/en_US.json!github:systemjs/plugin-json@0.1.0",
      "github:pusulurm/directive1@master/i18n/fr_CA.json!github:systemjs/plugin-json@0.1.0"
    ],
    "dist/commonBundle.js": [
      "github:systemjs/plugin-json@0.1.0",
      "github:systemjs/plugin-json@0.1.0/json",
      "github:components/jquery@2.1.4",
      "github:components/jquery@2.1.4/jquery",
      "npm:angular-translate@2.8.0",
      "npm:angular-translate@2.8.0/dist/angular-translate",
      "github:jspm/nodelibs-process@0.1.1",
      "github:jspm/nodelibs-process@0.1.1/index",
      "npm:process@0.10.1",
      "npm:process@0.10.1/browser",
      "npm:angular@1.5.0-beta.0",
      "npm:angular@1.5.0-beta.0/index",
      "npm:angular@1.5.0-beta.0/angular"
    ],
    "dist/mainBundle.js": [
      "main.js",
      "npm:angular-translate@2.8.0/dist/angular-translate-loader-partial/angular-translate-loader-partial",
      "cacheModule.js",
      "main_locale_cache.js",
      "i18n/en_US.json!github:systemjs/plugin-json@0.1.0",
      "i18n/fr_CA.json!github:systemjs/plugin-json@0.1.0",
      "i18n/en_CA.json!github:systemjs/plugin-json@0.1.0"
    ]
  },

  map: {
    "angular": "npm:angular@1.5.0-beta.0",
    "angular-translate": "npm:angular-translate@2.8.0",
    "angular123": "npm:angular@1.5.0-beta.0",
    "directive1": "github:pusulurm/directive1@master",
    "directive2": "github:pusulurm/directive2@master",
    "jquery": "github:components/jquery@2.1.4",
    "json": "github:systemjs/plugin-json@0.1.0",
    "traceur": "github:jmcriffey/bower-traceur@0.0.88",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:angular-translate@2.8.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:angular@1.5.0-beta.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});
