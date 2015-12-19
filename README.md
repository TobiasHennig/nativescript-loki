# NativeScript Loki

> Thin wrapper around Loki and Loki NativeScript adapter

## What is Loki

> LokiJS is a document oriented database written in javascript, published under MIT License. Its purpose is to store javascript objects as documents in a nosql fashion and retrieve them with a similar mechanism. - [LokiJS](https://github.com/techfort/LokiJS)

## Installation

Run the following command from the `/app` directory of your project:

```
$ npm install nativescript-loki --save
```

## Usage

```js
// Requirements
var Loki = require("./node_modules/nativescript-loki/nativescript-loki.js");

// Setup Loki
var db = new Loki("loki", { autosave: true });

// Check if database exists
if(db.exists()) {
    console.log("Database exists");
}

// Rename database
db.rename("new-name").then(function() {
    console.log("Database renamed");
});

// Remove database
db.remove().then(function() {
    console.log("Database removed");
});
```

## Thanks

The thanks goes to [sect2k](https://github.com/sect2k) who has [inspired](https://github.com/TobiasHennig/loki-nativescript-adapter/issues/1) me to create this package.

To go deeper in [Loki](http://lokijs.org) have a look at the [documentation](http://lokijs.org/#/docs).

[![npm version](https://badge.fury.io/js/nativescript-loki.svg)](http://badge.fury.io/js/nativescript-loki)