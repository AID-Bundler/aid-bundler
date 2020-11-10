<h1 align="center">AID Bundler</h1>

<p align="center">
  <img src="https://github.com/TheDudeFromCI/aid-bundler/workflows/Build/badge.svg" />
  <img src="https://img.shields.io/npm/v/aid-bundler" />
  <img src="https://img.shields.io/github/repo-size/TheDudeFromCI/aid-bundler" />
  <img src="https://img.shields.io/npm/dm/aid-bundler" />
  <img src="https://img.shields.io/github/contributors/TheDudeFromCI/aid-bundler" />
  <img src="https://img.shields.io/github/license/TheDudeFromCI/aid-bundler" />
</p>

A small utility for bundling multi-file AI Dungeon scripts. This package allows you to develop AI Dungeon scripts from your desktop using Node.js. The project can then be bundled into a zip file to be uploaded with your scenario with a single command.

You can use any Node library directly inside AID.
(Note that AID may have some limitations on supported JS versions.)

## Example Project

An example project setup can be seen in the [example](https://github.com/TheDudeFromCI/aid-bundler/tree/main/example) folder.

## Usage

This project can be installed as an NPM dev-dependency using:
```
npm install --save-dev aid-bundler
```

After installing, you can use create a `script.zip` bundle for your project by using:
```
npx aid-bundler <your_index.js>
```
Or by adding a script inside your package.json
```
"scripts": {
  "bundle": "aid-bundler index.js"
},
```

This will create a `build` folder with the bundled resources in it. The `script.zip` can be uploaded to the AI Dungeon website by clicking the upload icon in the script editor window.