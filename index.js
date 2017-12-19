const path = require('path');
const prettier = require('prettier');
const reqCwd = require('req-cwd');

async function prettify(content, filename) {
	const prettierOptions = await prettier.resolveConfig(filename);
	if (filename && path.extname(filename) !== '.vue') {
		return prettier.format(content, prettierOptions);
	}
	const compiler = reqCwd.silent('vue-template-compiler');
	if (!compiler) {
		console.error(`Couldn't find vue-template-compiler dependency`);
		process.exit(1);
	}
	const parsed = compiler.parseComponent(content);
	var formatted = content;
	parsed.styles.forEach(style => {
		const formattedStyle = prettier.format(style.content, Object.assign({parser: style.lang || 'css'}, prettierOptions));
		formatted = `${formatted.substring(0, style.start)}\n${formattedStyle}${formatted.substring(style.end)}`;
	});
	if (parsed.script) {
		const formattedScript = prettier.format(parsed.script.content, prettierOptions);
		formatted = `${formatted.substring(0, parsed.script.start)}\n${formattedScript}${formatted.substring(parsed.script.end)}`;
	}
	return formatted;
}

module.exports = prettify;
