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
			let response;
			if(config.event === 'push') {
				if(data.repository.name === config.repoName) {
					response = {
						message: 'Push successful'
					};
					spawn(config.script);
				}
				else {
					response = {
						message: 'Not the request you wanted'
					}
				}
			}
			else {
				if(data.action === 'closed' && data.pull_request.merged) {
					response = {
						message: 'Pull Request successful'
					};
					spawn(config.script);
				}
			}
			res.writeHead(200, { 'Content-Type': 'application/json' })
			res.write(JSON.stringify(response));
			res.end();
		});

	}
});

server.listen(config.port);