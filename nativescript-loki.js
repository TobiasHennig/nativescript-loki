var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fs = require('file-system');
var Loki = require('./node_modules/lokijs/src/lokijs.js');
var LokiNativeScriptAdapter = require('./node_modules/loki-nativescript-adapter/loki-nativescript-adapter.js');
module.exports = (function (_super) {
    __extends(LokiNs, _super);
    function LokiNs(name, lokiOptions, folder) {
        if (name === void 0) { name = 'loki'; }
        if (lokiOptions === void 0) { lokiOptions = {}; }
        if (folder === void 0) { folder = fs.knownFolders.documents(); }
        this.name = name;
        this.lokiOptions = lokiOptions;
        this.folder = folder;
        this.extension = '.db'; // Set extension
        this.path = fs.path.join(this.folder.path, this.name + this.extension); // Create path
        this.lokiOptions.adapter = new LokiNativeScriptAdapter(); // Add adapter
        _super.call(this, this.path, this.lokiOptions);
    }
    LokiNs.prototype.getFile = function () {
        return this.folder.getFile(this.name + this.extension);
    };
    LokiNs.prototype.exists = function () {
        return fs.File.exists(this.path);
    };
    LokiNs.prototype.rename = function (newName, callback, scope) {
        this.getFile().rename(newName + this.extension)
            .then(function (result) {
            this.name = newName;
            callback.call(scope);
        }, function (err) {
            callback.call(scope, new Error(err));
        });
    };
    LokiNs.prototype.remove = function (callback, scope) {
        this.getFile().remove()
            .then(function (result) {
            callback.call(scope);
        }, function (err) {
            callback.call(scope, new Error(err));
        });
    };
    return LokiNs;
})(Loki);
