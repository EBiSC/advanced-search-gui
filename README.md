Installation
============
First, ensure you have `node` and `npm` installed (v8 or better is required), and also install `yarn` and add it to your path e.g.
```
npm install yarn
export PATH=./node_modules/yarn/bin:$PATH
```

Next, use `yarn` to install dependencies:
```
yarn install
```

Running the app
===============
To run the app locally when developing/testing the code:
```
npm test
```

To run tests on the app:
```
npm test
```
Note that there are NO tests at the moment...

Building a distribution
=======================
To build a standalone distribution that can be deployed in a standard HTTP server (Apache, nginx, node serve, whatever):
```
npm build
```
The distribution is created in the `build` subdirectory.

Publishing to github pages
==========================
To build the app and publish to github pages (ie. https://ensembl.github.io/advanced-search-gui/):
```
npm build deploy
```

Configuration
=============
The following files can be modified to change the application:
- [consequences.json](./src/consequences.json) - add more consequences if available. LOF isn’t there because you can’t query by multiple consequences. 
- [Config.js](src/Config.js) - URLs for services
- [UiStyles.js](src/UI/UiStyles.js) - stores contextual styles as JS objects.
- [Documentation.md](src/Documentation.md) - can be edited to edit the in-app documentation.

After changing, the application needs to be rebuilt (see above).