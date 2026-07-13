require("dotenv").config();

const { Client, GatewayIntentBits, Events } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

const guildMemberAdd = require("./events/guildMemberAdd");

console.log("guildMemberAdd =", guildMemberAdd);
console.log("typeof =", typeof guildMemberAdd);

client.once(Events.ClientReady, () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on(Events.GuildMemberAdd, guildMemberAdd);

client.login(process.env.TOKEN);