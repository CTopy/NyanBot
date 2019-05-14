// Load libraries
const fs = require('fs');
const sql = require('sqlite3');
const Discord = require('discord.js');

// Load config
const { prefix, token } = require('./config.json');

// Init client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Init SQLite DB
//let db = new sql.Database('./database.db', sql.OPEN_READWRITE, (err) => {
let db = new sql.Database(':memory:', sql.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log('Connected to SQlite database.');
    
    db.run(
        `CREATE TABLE IF NOT EXISTS themes (
        themeName TEXT,
        themeDesc TEXT,
        );`, [], 
        (err) => {
            if(err) return console.log(err);
            db.run(`INSERT INTO themes (themeName, themeDesc) VALUES ('Test1', 'This is a description'), ('Emoji\nMultiple\nLine\nTheme', 'This is another description')`);
        }
    );
});

// Dynamically load commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    // Ignore bots and not prefixed messages
	if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Get args and command name
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

    // Get command name in files 
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // Do nothing if the command doesn't exist
	if (!command) return;

    // If the command can only be used is Guild
	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}
    
    // Show command usage
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

    // Execute command
	try {
		command.execute(message, args, db);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);