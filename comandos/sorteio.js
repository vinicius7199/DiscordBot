const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
  message.delete().catch(O_o => {});
  const comousar = new Discord.RichEmbed()
    .setAuthor("Newark", bot.user.avatarURL)
    .setTitle(`Sorteio`)
    .setDescription(`Irá iniciar um sorteio.`)
    .addField(
      "Como usar",
      `\`sorteio <minutos para inciar> <o que vai ser sorteado>\`\n\`Sorteio\``
    )
    .addField(
      "Permissão",
      "O staff que for fazer o sorteio tem que está em um cargo com a permissão `Gerenciar Servidor`"
    )
    .addField(
      "LEIA:",
      "Caso o bot reinicie irá precisar reiniciar o sorteio. :("
    );

  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message
      .reply(`você não tem permissão!`)
      .then(msg => msg.delete(6000));
  var time = args[0];
  if (!time)
    return message.channel
      .send(message.author, comousar)
      .then(msg => msg.delete(10000));
  var sorting = args.slice(1).join(" ");
  if (!sorting)
    return message.channel
      .send(message.author, comousar)
      .then(msg => msg.delete(10000));

  var timea = time * 1000 * 60;
  const embed = new Discord.RichEmbed()
    .setDescription(`Para participar do sorteio reaja com 🎉!`)
    .setAuthor(`${sorting}`)
    .setColor('RANDOM')
    .setFooter(`Acaba em ${time} minuto(s)!`);

  message.channel
    .send(`🎉 **SORTEIO** 🎉`, embed)
    .then(g => {
      g.react("🎉");
      var collector = g.createReactionCollector(
        (r, u) => r.emoji.name === "🎉"
      );
      collector.on("end", r => {
        if (!r.first()) {
          const embed2 = new Discord.RichEmbed()
            .setDescription(`Ninguém participou do sorteio! :frowning:`)
            .setAuthor(`${sorting}`)
            .setColor('RANDOM')
            .setFooter(`Newark Roleplay!`);
          g.clearReactions();
          return g.edit(`🎉 **SORTEIO ACABOU** 🎉`, embed2);
        }
        var user = r
          .first()
          .users.filter(user => !user.bot)
          .random();
        const embed3 = new Discord.RichEmbed()
          .setDescription(`Ganhador: **${user.tag}**`)
          .setThumbnail(user.displayAvatarURL)
          .setAuthor(`${sorting}`)
          .setColor('RANDOM')
          .setFooter(`Newark Roleplay!`);
        g.clearReactions();
        g.edit(`🎉 **SORTEIO ACABOU** 🎉`, embed3);
        message.channel.send(`:tada: **|** ${user}, você ganhou um ${sorting}!`);
      });
      setTimeout(() => {
        collector.stop();
      }, timea);
    });
};

exports.help = {
    name: "sorteio",
    aliases: []
}