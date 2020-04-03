const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("../config.json");
const moment = require ("moment-timezone")
moment.locale('pt-br')

bot.on('raw', async dados => {

    if (dados.t !== "VOICE_STATE_UPDATE") return;

    if (dados.t == "VOICE_STATE_UPDATE") {

    if (dados.d.channel_id !== '692546266894303362' && dados.d.channel_id !== '692546289434492938') return;

    let canal = bot.channels.get("657353416179187717")

    let nome = dados.d.member.nick
    let hora = dados.d.joined_at
    let id = dados.d.user_id
    let userid = bot.users.get(id);
    let avatarr = userid.displayAvatarURL;

    if (dados.d.channel_id == '692546266894303362')
    {
        let pEmbed = new Discord.RichEmbed()
        .setTitle("Inicio Expediente")
        .setThumbnail(avatarr)
        .setDescription(`Staff - ${nome}\n\n Entrada: - ${moment().format('L')} às ${moment().tz('America/Sao_Paulo').format('LT')}`)
        .setColor("GREEN")
        .setFooter('Newark Roleplay')
        .setTimestamp()
      canal.send(pEmbed) 
    } else {
        let pEmbed = new Discord.RichEmbed()
        .setTitle("Fim Expediente")
        .setThumbnail(avatarr)
        .setDescription(`Staff - ${nome}\n\n Saída: - ${moment().format('L')} às ${moment().tz('America/Sao_Paulo').format('LT')}`)
        .setColor("RED")
        .setFooter('Newark Roleplay')
        .setTimestamp()
        canal.send(pEmbed)
    }
}
})

bot.login(config.token)