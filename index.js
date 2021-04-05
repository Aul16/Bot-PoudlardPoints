const Discord = require('discord.js');
const bot = new Discord.Client();
const {TOKEN, PREFIX} = require("./config");
const fs = require("fs");

var Gryffindor = 0;
var Hufflepuff = 0;
var Ravenclaw = 0;
var Slytherin = 0;

let cooldown = new Set();
let cdseconds = 3;

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

bot.on('ready', function(){
  //bot.user.setAvatar('./logo_bot.jpg').catch(console.error)
  bot.user.setActivity('Compter les points | Préfix : p!').catch(console.error);
})

bot.on('message', function(msg) {
  if (msg.author.bot) return;
  const args = msg.content.split(/ +/g);
  const cmd = args.shift().toLowerCase();

  let raw = fs.readFileSync("./score.json");
  let score = JSON.parse(raw);

  if(!msg.content.startsWith(PREFIX)) return;
  if(cooldown.has(msg.author.id)){
    msg.delete();
     return msg.reply("Vous devez attendre 3 secondes entre chaque commande");
  }

  cooldown.add(msg.author.id);

  if (msg.member.hasPermission('ADMINISTRATOR')){

    if(cmd === `${PREFIX}add`){
      try{
        if(args[0] !== "g" && args[0] !== "h" && args[0] !== "r" && args[0] !== "s"){
          msg.channel.send("Please enter a valid house");
          return;
        }

        if(!(isNumber(args[1]))){
          msg.channel.send("Please enter a number");
          return;
        }

        if(args[0] == "g"){
          msg.channel.send("J'augmente les points des Gryffindor de " + args[1] + " points");
          Gryffindor = score.g;
          Gryffindor += parseInt(args[1]);
          score.g = Gryffindor;
          fs.writeFileSync('./score.json', JSON.stringify(score));
          msg.channel.send("Les Gryffindor ont maintenant " + Gryffindor + " points");
        }
        if(args[0] == "h"){
          msg.channel.send("J'augmente les points des Hufflepuff de " + args[1] + " points");
          Hufflepuff = score.h;
          Hufflepuff += parseInt(args[1]);
          score.h = Hufflepuff;
          fs.writeFileSync('./score.json', JSON.stringify(score));
          msg.channel.send("Les Hufflepuff ont maintenant " + Hufflepuff + " points");
        }
        if(args[0] == "r"){
          msg.channel.send("J'augmente les points des Ravenclaw de " + args[1] + " points");
          Ravenclaw = score.r;
          Ravenclaw += parseInt(args[1]);
          score.r = Ravenclaw;
          fs.writeFileSync('./score.json', JSON.stringify(score));
          msg.channel.send("Les Ravenclaw ont maintenant " + Ravenclaw + " points");
        }
        if(args[0] == "s"){
          msg.channel.send("J'augmente les points des Slytherin de " + args[1] + " points");
          Slytherin = score.s;
          Slytherin += parseInt(args[1]);
          score.s = Slytherin;
          fs.writeFileSync('./score.json', JSON.stringify(score));
          msg.channel.send("Les Slytherin ont maintenant " + Slytherin + " points");
        }
      }
      catch(error){
        console.error(error);
      }
    }



    if(cmd === `${PREFIX}sub`){
      try{
        if(args[0] !== "g" && args[0] !== "h" && args[0] !== "r" && args[0] !== "s"){
          msg.channel.send("Please enter a valid house");
          return;
        }

        if(!(isNumber(args[1]))){
          msg.channel.send("Please enter a number");
          return;
        }

        if(args[0] == "g"){
          msg.channel.send("Je baisse les points des Gryffindor de " + args[1] + " points");
          Gryffindor = score.g;
          Gryffindor -= parseInt(args[1]);
          score.g = Gryffindor;
          fs.writeFileSync('./score.json', JSON.stringify(score));
          msg.channel.send("Les Gryffindor ont maintenant " + Gryffindor + " points");
        }
        if(args[0] == "h"){
          msg.channel.send("Je baisse les points des Hufflepuff de " + args[1] + " points");
          Hufflepuff = score.h;
          Hufflepuff -= parseInt(args[1]);
          score.h = Hufflepuff;
          fs.writeFileSync('./score.json', JSON.stringify(score));
          msg.channel.send("Les Hufflepuff ont maintenant " + Hufflepuff + " points");
        }
        if(args[0] == "r"){
          msg.channel.send("Je baisse les points des Ravenclaw de " + args[1] + " points");
          Ravenclaw = score.r;
          Ravenclaw -= parseInt(args[1]);
          score.r = Ravenclaw;
          fs.writeFileSync('./score.json', JSON.stringify(score));
          msg.channel.send("Les Ravenclaw ont maintenant " + Ravenclaw + " points");
        }
        if(args[0] == "s"){
          msg.channel.send("Je baisse les points des Slytherin de " + args[1] + " points");
          Slytherin = score.s;
          Slytherin -= parseInt(args[1]);
          score.s = Slytherin;
          fs.writeFileSync('./score.json', JSON.stringify(score));
          msg.channel.send("Les Slytherin ont maintenant " + Slytherin + " points");
        }
      }
      catch(error){
        console.error(error);
      }
    }
  }
  if(cmd === `${PREFIX}topserv`){
    var HouseList = [["Gryffindor", score.g],
    ["Hufflepuff", score.h],
    ["Ravenclaw", score.r],
    ["Slytherin", score.s]];

    top = HouseList.sort(function(a, b){return b[1] - a[1];});
    message = ".\n"
    for (let i = 0; i < top.length; i++){
      message += `${top[i][0]} : ${top[i][1]} points \n`
    }
    msg.channel.send(message);
  }

  if(cmd === `${PREFIX}help`){
    msg.reply(". \n'p!add maison nombre' pour ajouter des points  ---  ADMIN ONLY\n" +
    "'p!sub maison nombre' pour enlever des points  ---  ADMIN ONLY\n" +
    "p!topserv pour avoir le classement\n\n\n" +
    "g = gryffindor\n" +
    "h=Hufflepuff\n" +
    "r = ravenclaw\n" +
    "s = slytherin");
  }

  setTimeout(() => {
    cooldown.delete(msg.author.id)
  }, cdseconds * 1000);
});

bot.login(TOKEN)
