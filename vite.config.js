import {resolve} from 'path';
import {defineConfig} from 'vite';
import handlebars from 'vite-plugin-handlebars';

const page_data = [
	{
		name : "main",
		path : '/index.html',
		context_data : {
			title : "Main page"
		}
	},
	{
		name : "people",
		path : '/pages/people.html',
		context_data : {
			title : "People page"
		}
	}
];
const page_configuration = page_data.reduce((config, entry)=>{
	config[entry.path] = entry.context_data;
	return config;
}, new Object());

const page_build_option = page_data.reduce((input, entry)=>{
	input[entry.name] =  resolve(__dirname, entry.path.substring(1));
	return input;
}, new Object());

export default defineConfig({
	build: {
		rollupOptions: {
			input : page_build_option,
		}
	},
	plugins: [
		handlebars({
			context(page_path) {
				console.log("arguments : ", ...arguments); // only receive "path". and can not use "index.html" to any other route sub page. just one. 
				// console.log("data :", page_configuration[page_path]);
				return page_configuration[page_path];
			},
			partialDirectory: resolve(__dirname, '/src/partials'),
		})
	],
});