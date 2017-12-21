import fs from 'fs';
import test from 'ava';
import prettify from '..';

process.chdir(__dirname);

test('prettify .vue file', async t => {
	const filename = 'fixtures/hello.vue';
	const content = fs.readFileSync(filename, 'utf8');
	const formatted = await prettify(content, {filename});
	t.is(formatted, content);
});
