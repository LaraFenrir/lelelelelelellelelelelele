const Discord = require('discord.js');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
//var token = process.env.TOKEN
const adapter = new FileSync('database.json');
const storeadapter = new FileSync('store.json');
const db = low(adapter);
const storedb = low(storeadapter);
const superagent = require("superagent")
db.defaults({ histoires: [], xp: []}).write()
const snekfetch = require("snekfetch")
var bot = new Discord.Client();
var prefix = ("r!");
var randnum = 0
var botenabled = true;
var storynumber = db.get('histoires').map('story_value').value();
var dispatcher;
var token = process.env.TOKEN
bot.on('ready', () => {
  bot.user.setActivity("Être dev par ℒ𝓪𝓻𝓪 ℱ𝒆𝓷𝓻𝓲𝓻 [r!help]", {type: "WATCHING"});
    console.log('Bot Ready !');
});
process.on('unhandledRejection', function(reason, p){
    console.log("");

});
bot.login(token)

bot.on("guildMemberAdd", member => {
    member.guild.channels.find("name", "hey-salut").send(`:white_check_mark: ${member.user.username} Vient de rejoindre le serveur ! r!help et ton nouvel ami !`)

})


bot.on("guildMemberRemove", member => {
    member.guild.channels.find("name", "bye-bye").send(`:x: ${member.user.username} Vient de partir.. Dommage..`)
})
 
    bot.on('message', async message => {
    
    var msgauthor = message.author.id;

    if(message.author.bot)return;

    if(!db.get("xp").find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
        console.log(userxpdb);
        var userxp = Object.values(userxpdb)
        console.log(userxp);
        console.log(`Nombre d'xp : ${userxp[1]}`)

        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
    }
      
 if (message.content == prefix + "tip")
   message.channel.send("Tu veux me soutenir ? m'aider dans mes projets ? Ou tout simplement me faire plaisir ? Si tu en as les moyens uniquement, passe sur mon tipee ! : https://en.tipeee.com/larafenrir ")
     
 if(message.content === prefix + 'dev')
  
  var dev = new Discord.RichEmbed()
  .setTitle(`Salut à toi, ${message.author.username}`)
  .addField("Si tu lis ceci c'est pour en savoir plus sur ma développeuse. Je vais tout te dire.", "Son pseudo discord est ℒ𝓪𝓻𝓪 ℱ𝒆𝓷𝓻𝓲𝓻#1084. Elle est développeuse depuis longtemps déjà. Elle as déjà créée (avant de me créer moi) un bot musique, qui dois sans doutes être présent actuellement sur le serveur ou tu te situe (dans le cas contraire, désolée :/) essaie donc de faire '+help music' tu verras !")
  .addField("Que dire de plus..", "Ah si ! Elle te remercie de m'avoir ajoutée sur ce serveur ! Car même si elle n'est pas co, je sauvegarde toutes intéractions avec moi même ou les autres bots de Lara, ce qui fait qu'elle les voies. Donc, merci ! ❤")
  .setImage('https://cdn.discordapp.com/attachments/511554588738846720/522212606577082370/1312931744.jpg')
  .setThumbnail("https://cdn.discordapp.com/attachments/511554588738846720/522212793299238923/nekoGirl_1.jpg")

  message.channel.send({embed: dev})

    if(message.content === prefix + "serveur")
        var serverinfo = new Discord.RichEmbed()
        .setDescription("Informations du discord")
        .addField("Nom du discord", message.guild.name)
        .addField("créé le", message.guild.createdAt)
        .addField("Tu as rejoin le", message.member.joinedAt)
        .addField("Nombre d'utilisateurs sur le discord", message.guild.memberCount)
        .setColor("0x0000FF")
        message.channel.send({embed: serverinfo})
    
    
    if(message.content.startsWith(prefix + "sondage")) {
            let usera = message.mentions.members.first();
            let args = message.content.split(" ").slice(1);
            let thingToEcho = args.join(" ")
            var sondage = new Discord.RichEmbed()
                .setDescription(`Sondage lancé par ${message.author.username} `)
                .addField(thingToEcho, "Répondre avec :white_check_mark: ou :x:")
                .setColor(0xB40404)
                .setTimestamp()
            message.guild.channels.find("name", "sondage").send({embed: sondage})
            .then(function (message) {
                message.react("❌")
                message.react("✅")
            }).catch(function() {

            });

        }

    if(message.content === prefix + "chat") {
      let msg = await message.channel.send("En cours...")

      let {body} = await superagent
      .get('http://aws.random.cat/meow')
      console.log(body.file)
      if(!{body}) return message.channel.send("C'est cassé ! C'est pas moi c'est le site ! J'te jure ! Essaie encore tu verras !")

        let cEmbed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor('🐱 Piti chat ! 🐱')
        .setImage(body.file)
        .setTimestamp()
        .setFooter('Bot RP', bot.user.displayAvatarURL)

        message.channel.send({embed: cEmbed})
        msg.delete()
    }



    if(message.content === prefix + "meme") {
      let msg = await message.channel.send("En cours...")

      let {body} = await superagent
      .get('https://api-to.get-a.life/meme')
      console.log(body.text)
      if(!{body}) return message.channel.send("C'est cassé ! C'est pas moi c'est le site ! J'te jure ! Essaie encore tu verras !")

        let mEmbed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor('G3T M3M3D')
        .setImage(body.url)
        .setTimestamp()
        .setFooter('Bot RP', bot.user.displayAvatarURL)

        message.channel.send({embed: mEmbed})
        msg.delete()
    }

    if(message.content === prefix + "chien") {
      let msg = await message.channel.send("En cours...")

      let {body} = await superagent
      .get('https://dog.ceo/api/breeds/image/random')
      console.log(body.message)
      if(!{body}) return message.channel.send("C'est cassé ! C'est pas moi c'est le site ! J'te jure ! Essaie encore tu verras !")

        let dEmbed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor('🐶 Piti chien ! 🐶')
        .setImage(body.message)
        .setTimestamp()
        .setFooter('Bot RP', bot.user.displayAvatarURL)

        message.channel.send({embed: dEmbed})
        msg.delete()
    }



    if(message.content === prefix + "xpstat"){
        var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
        var xpfinal = Object.values(xp);
        var xp_embed = new Discord.RichEmbed()
            .setColor('#F72BB0')
            .setTitle(`Xp de ${message.author.username}`)
            .setDescription("Voilà toute l'xp accumulée !")
            .addField("XP :", `${xpfinal[1]} xp`)
        message.channel.send({embed: xp_embed});
    
    
    }
    if(message.content === prefix + 'roll') {
        var coin = Math.floor(Math.random() * 2);
        if(coin === 0) {
            coin = 'pile'
        };
        if(coin === 1) {
            coin = 'face'
        };
        message.channel.send('La pièce tourne... \n Et elle tombe coté **' + coin + '**.\nSi pile, tu a réussis, si face tu échoue.');
    };
    if (message.content === prefix + "ping") {
        var startTime = Date.now();
     message.channel.sendMessage("Calcul en cours...").then((message) => {
      var endTime = Date.now();
        message.edit("Bot : " + Math.round(endTime - startTime) + " ms\nAPI : "+Math.round(bot.ping)+" ms");
       })
   }
   if(message.author.bot) return;
             if(message.content.startsWith(prefix + "userinfo") || message.content.startsWith(prefix + "ui")) {
           
               let usera = message.mentions.members.first();
               if(!usera) return message.channel.send("Précise moi un utilisateur");
               let gameName = usera.presence.game ? usera.presence.game.name : "None";
           
           
               var embed = new Discord.RichEmbed()
               .setAuthor(usera.user.tag, usera.user.avatarURL)
               .addField("ID de l'utilisateur", usera.id, true)
               .addField("Pseudo", usera.user.username, true)
               .addField("Status actuel", usera.presence.status, true)
               .addField("Jeu", gameName, true)
               .addField("Quand à t'il join ?", usera.joinedAt, true)
               .setTimestamp()
               .setColor(0x0f7fa6)
               .setThumbnail(usera.user.avatarURL);
               message.channel.send({embed});
           
               console.log("'L'info d'utilisateur à été demandé dans le serveur '" + message.guild.name + "' par " + message.author.username + " (" + message.author.id + ")");
           }
   
   
   
   
   

   if(message.content.startsWith(prefix + "purge")) {
       if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission.");

       let args = message.content.split(" ").slice(1);

       if(!args[0]) return message.channel.send("Précise moi un nombre de messages.")
       message.channel.bulkDelete(args[0]).then(() => {
           message.channel.send(`${args[0]} messages ont été supprimés.`)
       }
    )
   }

  

   if (message.content === prefix + "help") {
    var help = new Discord.RichEmbed()
    .setTitle(`Salut à toi ${message.author.username} !`)
    .setColor("#120D16")
    .setDescription("Voici le menu d'aide !")
    .setImage("https://cdn.discordapp.com/attachments/508105906261721108/510264359541538826/hyperdimension-neptunia-victory-1.jpg")
    .setThumbnail("https://cdn.discordapp.com/attachments/508105906261721108/510264225180942346/5788f566eafcef6b0d2eafb9ca3a59b5650fec1c_hq.jpg")
    .addField("Tout marche avec le préfixe r!", "help: Affiche ce menu\nping : Permet de voir si je lag.. (Si je lag, faut taper ma développeuse, c'est sa faute !\ntip: Permet d'avoir la page de mon tipee (Ne faites pas de dons si vous n'avez pas les moyens ou l'envie. Personen n'as à vous forcer à le faire.)\nui: Permet d'avoir des infos sur un utilisateur.\ndev: Infos sur ma développeuse d'amour ❤\nroll: Fait tourner une pièce.\nxpstat: Pour savoir l'xp accumulée sur le serv (nombres de messages)\nchat: Vous affiche aléatoirement l'image d'un piti chat\nchien: Vous affiche aléatoirement l'image d'un piti chien\nmeme: G3T M3M3D\nfiche: Modèle de fiche\npurge : Pour delet les messages(staffs uniquement\n(Staff only)warn @mention raison: Permet de warn un utilisateur.\nseewarns @mention: Voir les warns d'un utilisateur.\n(Staff only)deletewarns @mention numéro du warn (Utiliser seewarns): Pour delet un warn.")
    .setFooter("D'autre commandes arrivent mon petit.. C'est que le début.")

    




    message.channel.send({embed: help});
} 






if (message.content.startsWith("Je t'aime")) {
var amour = new Discord.RichEmbed()

.setAuthor(`${message.author.username}`)
.addField("C'est beau ! Moi aussi je t'aime !", "J'en suis presque jalouse OwO")
.setColor("FD3F92")
.setThumbnail(`${message.author.avatarURL}`)
.setImage("https://i0.wp.com/l-express.ca/wp-content/uploads/2018/02/coeur2.jpg?fit=585%2C439&ssl=1")

message.channel.send({embed: amour})
}

if (message.content.startsWith("T'est belle <@510258803594362890>"))
message.channel.send("Nion ! C'est twa ! :3")


var fs = require('fs');
 
let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
 
if (message.content.startsWith(prefix + "warn")){
 
if (message.channel.type === "dm") return;
 
var mentionned = message.mentions.users.first();
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
if(message.mentions.users.size === 0) {
 
  return message.channel.send("**:x: Vous n'avez mentionné(e) aucun utilisateur**");
 
}else{
 
    const args = message.content.split(' ').slice(1);
 
    const mentioned = message.mentions.users.first();
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          if (args.slice(1).length != 0) {
 
            const date = new Date().toUTCString();
 
            if (warns[message.guild.id] === undefined)
 
              warns[message.guild.id] = {};
 
            if (warns[message.guild.id][mentioned.id] === undefined)
 
              warns[message.guild.id][mentioned.id] = {};
 
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
 
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
 
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
 
            } else {
 
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
 
                time: date,
 
                user: message.author.id};
 
            }
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
message.delete();
 
            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');
 
message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
}
 
 
 
  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
    const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size !== 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          try {
 
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
              return;
 
            }
 
          } catch (err) {
 
            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
            return;
 
          }
 
          let arr = [];
 
          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");
 
          for (var warn in warns[message.guild.id][mentioned.id]) {
 
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
 
            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
 
          }
 
          message.channel.send(arr.join('\n'));
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
          console.log(args);
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
 
 
 
 
  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
   const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    const arg2 = Number(args[1]);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
 
          if (!isNaN(arg2)) {
 
            if (warns[message.guild.id][mentioned.id] === undefined) {
 
              message.channel.send(mentioned.tag+" n'a aucun warn");
 
              return;
 
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
 
              message.channel.send("**:x: Ce warn n'existe pas**");
 
              return;
 
            }
 
            delete warns[message.guild.id][mentioned.id][arg2];
 
            var i = 1;
 
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
 
              var val=warns[message.guild.id][mentioned.id][key];
 
              delete warns[message.guild.id][mentioned.id][key];
 
              key = i;
 
              warns[message.guild.id][mentioned.id][key]=val;
 
              i++;
 
            });
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              delete warns[message.guild.id][mentioned.id];
 
            }
 
            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);
 
            return;
 
          } if (args[1] === "tout") {
 
            delete warns[message.guild.id][mentioned.id];
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);
 
            return;
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"deletewarns <utilisateur> <nombre>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"deletewarns <utilisateur> <nombre>");
 
        }
 
      } else {
 
       message.channel.send("Erreur mauvais usage: "+prefix+"deletewarns <utilisateur> <nombre>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");
 if (message.content === prefix + "ping") {
     var startTime = Date.now();
  msg.channel.sendMessage("Calcul en cours...").then((message) => {
   var endTime = Date.now();
     message.edit("Bot : " + Math.round(endTime - startTime) + " ms\nAPI : "+Math.round(bot.ping)+" ms");
    })
}   
      
      
      
    switch (args[0].toLowerCase()){

        case "newstory":
        var value = message.content.substr(10);
        var author = message.author.toString();
        var number = db.get('histoires').map('id').value();
        //var storyid = number + 1;
        console.log(value);
        message.reply("Ajout de l'histoire à la base de données")

        db.get('histoires')
            .push({ story_value: value, story_author: author})
            .write();
        
        break;

        case "tellstory":
        
        story_random();
        console.log(randnum);

        var story = db.get(`histoires[${randnum}].story_value`).toString().value();
        var author_story = db.get(`histoires[${randnum}].story_author`).toString().value();
        console.log(story);
        
        message.channel.send(`Voici l'histoire : ${story} (Histoire de ${author_story})`)
        
        break;
        
        case "fiche":
        var fiche = new Discord.RichEmbed()
            .setTitle("Voici les fiches que nous attendons de votre part:")
            .setColor("#D80A29")
            .addField("Voilà les catégories:", "**Nom:**\n**Prénom:**\n**Âge:**\n**Sexe:**\n**Histoire (5-10 lignes PC):**\n**Caractère:**\n**Taille:**\n**Signes discinsctifs:**\n**Armes (Si votre perso en possède):**\n**Autres trucs a dire sur le perso:**\n**Image(s):**")
        console.log("Help fiche demandée")
        message.channel.send({embed: fiche})
        break;
        
        case "playlist":
        var playlist = new Discord.RichEmbed()
            .setTitle("Petites playlists ou musiques pour RP tranquillou ^^")
            .setAuthor(`RP - ${message.guild.name}`)
            .setThumbnail("https://media.giphy.com/media/cgW5iwX0e37qg/giphy.gif")
            .setImage("https://media.giphy.com/media/wsWcsrfMXjJgk/giphy.gif")
            .addField("Voilà les musiques, elles serons mise à jour souvent ! Enjoy", "<https://www.youtube.com/watch?v=-kBhum7f4rI> **(Musique chill, posée)**\n<https://www.youtube.com/watch?v=htCcgpisgtk> **(Du hard metal)**\n <https://www.youtube.com/playlist?list=UUqXzaPAOef97erJRijURPrQ> **(Playlist de tout genre, mais la particularitée, c'est que le son est en 3d ! Si tu connais pas, va jetter un oeil, ca vaux le détour ;))**")
            .addField("Coup de coeur de Lara !", "https://www.youtube.com/watch?v=_eDpH4hMW1o")
            .addField("Comme précisé plus haut, elle serras mise à jour souvent ! Tennez vous au courant ! :p", "Vous pouvez aussi me faire vos propositions ! go me MP ℒ𝓪𝓻𝓪 ℱ𝒆𝓷𝓻𝓲𝓻.")    
        console.log("La playlist a été demandée !")
        message.channel.send({embed: playlist})    
        
        break;

        case "ban":

        if (!message.channel.permissionsFor(message.member).hasPermission("BAN_MEMBERS")){
            message.reply("Flèmme, car t'as pas les perms https://media.tenor.com/images/af630f8d408127ba0a0e96a62bfb4e4c/tenor.gif")
        }else{
            var banmember = message.mentions.members.first();
            if(!banmember){
                message.reply("Pas de gars avec ce nom :/");
            }else{
                banmember.ban().then((member) => {
                message.channel.send(`${member.displayName} à été ban ! En même temps, il était pas trés utile.. https://i.imgur.com/O3DHIA5.gif`);
            }) 
        
        
        
}}}
function story_random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(storynumber);
    randnum = Math.floor(Math.random() * (max - min +1) + min);


function random(min, max) {
  min = Math.ceil(0);
  max = Math.floor(3);
  randnum = Math.floor(Math.random() * (max - min +1) + min);
}

  }})
