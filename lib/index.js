#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var fs = __importStar(require("fs"));
var es = __importStar(require("event-stream"));
var minizip_asm_js_1 = __importDefault(require("minizip-asm.js"));
commander_1.default
    .version('0.0.1')
    .description("An example CLI for ordering pizza's")
    .option('-w, --word_list <file path>', 'Word List')
    .option('-f, --zip_file <file path>', 'Zip File')
    .parse(process.argv);
var mz = new minizip_asm_js_1.default(fs.readFileSync(commander_1.default.zip_file));
var list = mz.list();
function main() {
    var s = fs
        .createReadStream(commander_1.default.word_list)
        .pipe(es.split())
        .pipe(es
        .mapSync(function (line) {
        // pause the readstream
        s.pause();
        try {
            var foo = mz.extract(list[0].filepath, { password: line });
            console.log(line);
        }
        catch (e) {
            s.resume();
        }
        finally {
        }
    })
        .on('error', function (err) {
        console.log('Error while reading file.', err);
    })
        .on('end', function () {
        console.log('Read entire file.');
    }));
}
main();
