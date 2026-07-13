const { AttachmentBuilder } = require("discord.js");
const createWelcomeCard = require("../utils/welcomeCard");

console.log("TYPE:", typeof createWelcomeCard);

module.exports = async (member) => {
    const channel = member.guild.channels.cache.get("1525770098667814994");

    if (!channel) return;

    const buffer = await createWelcomeCard(member);

    const attachment = new AttachmentBuilder(buffer, {
        name: "welcome.png",
    });

    await channel.send({
        content: `🎉 Welcome ${member}`,
        files: [attachment],
    });
};