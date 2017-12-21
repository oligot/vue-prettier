const path = require('path');
const prettier = require('prettier');
const reqCwd = require('req-cwd');

async function prettify(content, options) {
	const prettierOptions = await prettier.resolveConfig(options.filename);
	if (options.filename && path.extname(options.filename) !== '.vue') {
		return prettier.format(content, prettierOptions);
	}
	const compiler = reqCwd.silent('vue-template-compiler');
	if (!compiler) {
		console.error(`Couldn't find vue-template-compiler dependency`);
		process.exit(1);
	}
	var formatted = content;
	var parsed = compiler.parseComponent(formatted);
	if (parsed.template && (!options.part || options.part.includes('template'))) {
		const formattedTemplate = prettier.format(parsed.template.content, Object.assign({parser: 'parse5'}, prettierOptions));
		const indented = formattedTemplate
			.split('\n')
			.filter(line => line)
			.map(line => `\t${line}`)
			.join('\n');
		formatted = `${formatted.substring(0, parsed.template.start)}\n${indented}\n${formatted.substring(parsed.template.end)}`;
	}
	parsed = compiler.parseComponent(formatted);
	if (!options.part || options.part.includes('style')) {
		parsed.styles.forEach(style => {
			const formattedStyle = prettier.format(style.content, Object.assign({parser: style.lang || 'css'}, prettierOptions));
			formatted = `${formatted.substring(0, style.start)}\n${formattedStyle}${formatted.substring(style.end)}`;
		});
	}
	parsed = compiler.parseComponent(formatted);
	if (parsed.script && (!options.part || options.part.includes('script'))) {
		const formattedScript = prettier.format(parsed.script.content, prettierOptions);
		formatted = `${formatted.substring(0, parsed.script.start)}\n${formattedScript}${formatted.substring(parsed.script.end)}`;
	}
	return formatted;
}

module.exports = prettify;
