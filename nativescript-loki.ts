import fs = require('file-system');
import Loki = require('./node_modules/lokijs/src/lokijs.js');
import LokiNativeScriptAdapter = require('./node_modules/loki-nativescript-adapter/loki-nativescript-adapter.js');

export = class LokiNs extends Loki {
    name: string;
    lokiOptions: any;
    folder: any;
    extension: string;

    constructor(name = 'loki', lokiOptions = {}, folder = fs.knownFolders.documents()) {
        this.name = name;
        this.lokiOptions = lokiOptions;
        this.folder = folder;

        this.extension = '.db';										// Set extension
        this.lokiOptions.adapter = new LokiNativeScriptAdapter();   // Add adapter
		
        super(this.path, this.lokiOptions);
    }
    
    get path(): string {
        return fs.path.join(this.folder.path, this.name + this.extension);
    }

    get file() {
        return this.folder.getFile(this.name + this.extension);
    }

    exists(): boolean {
        return fs.File.exists(this.path);
    }

    rename(newName: string) {
        return new Promise((resolve, reject) => {
            this.file
                .rename(newName + this.extension)
                .then((result) => {
                    this.name = newName;
                    resolve(this.name);
                }, (err) => {
                    reject(new Error(err));
                });
        });
    }

    remove() {
        return new Promise((resolve, reject) => {
            this.file
                .remove()
                .then((result) => {
                    resolve();
                }, (err) => {
                    reject(new Error(err));
                });
        });
    }
}
