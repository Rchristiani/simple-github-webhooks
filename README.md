#Simple Github Webhooks

There are a bunch of webhook servers out there for node, but they seem to be about 2 years old! Here is a very simple script that will accept a `POST` request and run a bash script for you.

##Config

You will need to include a `config.js` file that exports a module.

	module.exports = {
		event: 'push',
		repoName: 'your-repo-name',
		script: './script.sh',
		port: '5000'
	};

There are four options

**event** Just the event you want to listen too. Probably push.

**repoName** The repo you are listening for an event on. 

**script** The script you want to run. It is important that you make the bash script executable. Run `chmod +x yourscript.sh`.

**port** The port you want the server to run on.

Once everything is configured use something like [`forever`](https://github.com/foreverjs/forever) to keep it running.