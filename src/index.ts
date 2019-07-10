#!/usr/bin/env node

import { SSL_OP_EPHEMERAL_RSA } from 'constants';

import command from 'commander';
import unzipper from 'unzipper';
import * as fs from 'fs';
import * as es from 'event-stream';
import Minizip from 'minizip-asm.js';


command
  .version('0.0.1')
  .description("An example CLI for ordering pizza's")
  .option('-w, --word_list <file path>', 'Word List')
  .option('-f, --zip_file <file path>', 'Zip File')
  .parse(process.argv);

var mz = new Minizip(fs.readFileSync(command.zip_file))
var list = mz.list()

function main() {
  var s = fs
    .createReadStream(command.word_list)
    .pipe(es.split())
    .pipe(
      es
        .mapSync(function(line: string) {
          // pause the readstream
          s.pause();
          try {
            var foo = mz.extract(list[0].filepath, {password:line})
            console.log(line)
          } catch (e) {
            s.resume()
          } finally {
          }
        })
        .on('error', function(err: Error) {
          console.log('Error while reading file.', err);
        })
        .on('end', function() {
          console.log('Read entire file.');
        })
    );
}
main();
