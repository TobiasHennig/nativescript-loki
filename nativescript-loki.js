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
        this.lokiOptions.adapter = new LokiNativeScriptAdapter(); // Add adapter
        _super.call(this, this.path, this.lokiOptions);
    }
    Object.defineProperty(LokiNs.prototype, "path", {
        get: function () {
            return fs.path.join(this.folder.path, this.name + this.extension);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LokiNs.prototype, "file", {
        get: function () {
            return this.folder.getFile(this.name + this.extension);
        },
        enumerable: true,
        configurable: true
    });
    LokiNs.prototype.exists = function () {
        return fs.File.exists(this.path);
    };
    LokiNs.prototype.rename = function (newName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.file
                .rename(newName + _this.extension)
                .then(function (result) {
                _this.name = newName;
                resolve(_this.name);
            }, function (err) {
                reject(new Error(err));
            });
        });
    };
    LokiNs.prototype.remove = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.file
                .remove()
                .then(function (result) {
                resolve();
            }, function (err) {
                reject(new Error(err));
            });
        });
    };
    return LokiNs;
})(Loki);
