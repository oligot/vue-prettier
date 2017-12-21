#!/usr/bin/env node

const fs = require('fs');
const globby = require('globby');
const program = require('commander');
const getStdin = require('get-stdin');
const loudRejection = require('loud-rejection');
const pkg = require('./package.json');
const prettify = require('./index');

loudRejection();

program
	.version(pkg.version)
	.description(pkg.description)
	.usage('[options] <file ...>')
	.allowUnknownOption()
	.option('--write', 'edit files in-place')
	.option('-l, --list-different', `print names of files that are different from Prettier's formatting`)
	.option('--stdin-filepath <path>', 'path to the file to pretend that stdin comes from')
	.option('--stdin', 'force reading input from stdin')
	.parse(process.argv);

async function run() {
	if (program.stdin) {
		const str = await getStdin();
		if (!str) {
			program.help();
		}
		console.log(await prettify(str, program.stdinFilepath));
	} else {
		const paths = await globby(program.args);
		const files = await Promise.all(paths.map(async path => {
			const content = fs.readFileSync(path, 'utf8');
			const formatted = await prettify(content, path);
			return {
				name: path,
				content,
				formatted
			};
		}));
		if (program.listDifferent) {
			const diff = files.filter(file => file.content !== file.formatted);
			if (diff.length > 0) {
				console.log(diff.map(file => file.name).join('\n'));
				process.exit(1);
			}
		} else {
			files.forEach(file => {
				if (program.write) {
					fs.writeFileSync(file.name, file.formatted, 'utf8');
				} else {
					console.log(file.formatted);
				}
			});
		}
	}
}

run();
