const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

 async run(client, message, args) {
   if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You Cannot Use This Command.");
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No Reason Given";
    const kickEmbed = new Discord.MessageEmbed()
       .setTitle(`You Were Kicked from ${message.guild.name}`)
       .setDescription(`Reason: ${reason}`)
       .setColor("#5708ab")
       .setTimestamp()
       .setFooter(client.user.tag ,client.user.displayAvatarURL());

       // -kick @user
       if(!args[0]) return message.channel.send("You Need To State A User To Kick. \`?kick '@user' 'reason'\`");
       if (!mentionedMember) return message.channel.send("The Member Is Not In The Server.");
       try {
        await mentionedMember.send(kickEmbed);
       } catch (err) {
        console.log(`I Was Unable To Message The Member.`);
    }

    try{
      await mentionedMember.kick(reason)
      .then(message.channel.send("Done!"));
    } catch(err) {
      console.log(err);
      return message.channel.send("I Was Unable To Kick The Member mentioned.")
    }
  }
}