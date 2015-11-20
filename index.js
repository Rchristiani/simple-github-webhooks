'use strict';
let http = require('http');
let config = require('./config.js');
let spawn = require('child_process').spawn;

let server = http.createServer((req,res) => {
	let data;
	req.setEncoding('UTF8');
	if(req.method === 'POST') {
		req.on('data', (chunk) => {
			data = JSON.parse(chunk);
		});

		req.on('end', () => {
			if(
				data.repository.name === config.repoName &&
				data.hook.events.indexOf(config.event) >= 0
			 ) {
				let response = {
					message: 'success'
				};
				spawn(config.script);
				res.writeHead(200, { 'Content-Type': 'application/json' })
				res.write(JSON.stringify(response));
				res.end();
			}
			else {
				res.writeHead(200, { 'Content-Type': 'application/json' })
				res.write(JSON.stringify({messasge: 'Not Quite'}));
				res.end();
			}
		});

	}
});

server.listen(config.port);