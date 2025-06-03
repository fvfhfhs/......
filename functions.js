const Discord = require('discord.js'), userBase = require("./Models/userBase")
const axios = require("axios")
const guildBase = require("./Models/guildBase")
module.exports = {
  createMap: () => {
    const grid = Array(16).fill('⬛️');
    const greenIndices = [];

    while (greenIndices.length < 5) {
      const randomIndex = Math.floor(Math.random() * 16);
      if (!greenIndices.includes(randomIndex)) {
        greenIndices.push(randomIndex);
        grid[randomIndex] = '🟩';
      }
    }

    const map = grid.map((color, index) => {
      return new Discord.ButtonBuilder()
        .setCustomId(`button_${index}`)
        .setLabel("ْ")
        .setDisabled(true)
        .setStyle(color === "⬛️" ? "Secondary" : "Success");
    });

    grid.fill('⬛️');
    const blackButtons = grid.map((_, index) => {
      return new Discord.ButtonBuilder()
        .setCustomId(`button_${index}`)
        .setLabel("ْ")
        .setDisabled(false)
        .setStyle("Secondary");
    });

    return { map: map, black: blackButtons, green: greenIndices }
  },

  checkCount: async (guild) => {
    let data = await guildBase.findOne({ guild: guild.id })
    if (!data) {
      data = new guildBase({ guild: guild.id })
      await data.save();
    }

    let number = data.policejoins.length
    let message = "";

    if (number >= 0 && number <= 2) {
      message = `1 - Kidnapping Citizen 
- Status | ❌ 
2 - Kidnapping Policeman
- Status | ❌ 
3 - Kill Policemen
- Status | ❌ 
4 - Robbery Store 
- Status | ❌ 
5 - Robbery House 
- Status | ❌ 
6 - ATM Robbery 
- Status | ❌ 
7 - Robbery Bank 
- Status | ❌ 
8 - Jewelry Robbery
- Status | ❌ 
9 - Central Bank
- Status | ❌ 
10 - Paleto Bank 
- Status | ❌ 
11 - Fedral Bank 
- Status | ❌ 
12 - BobCat
- Status | ❌`
    } else if (number >= 3 && number <= 5) {
      message = `1 - Kidnapping Citizen 
- Status | ✅ 
2 - Kidnapping Policeman
- Status | ❌ 
3 - Kill Policemen 
- Status | ❌ 
4 - Robbery Store 
- Status | ✅ 
5 - Robbery House 
- Status | ❌ 
6 - ATM Robbery 
- Status | ✅ 
7 - Robbery Bank 
- Status | ❌ 
8 - Jewelry Robbery
- Status | ❌ 
9 - Central Bank 
- Status | ❌ 
10 - Paleto Bank 
- Status | ❌ 
11 - Fedral Bank 
- Status | ❌ 
12 - BobCat 
- Status | ❌`
    } else if (number >= 6 && number <= 8) {
      message = `1 - Kidnapping Citizen 
- Status | ✅ 
2 - Kidnapping Policeman
- Status | ✅ 
3 - Kill Policemen 
- Status | ❌ 
4 - Robbery Store 
- Status | ✅ 
5 - Robbery House 
- Status | ✅ 
6 - ATM Robbery 
- Status | ✅ 
7 - Robbery Bank 
- Status | ❌ 
8 - Jewelry Robbery
- Status | ✅ 
9 - Central Bank 
- Status | ❌ 
10 - Paleto Bank 
- Status | ❌ 
11 - Fedral Bank 
- Status | ❌ 
12 - BobCat 
- Status | ❌`
    } else if (number >= 9 && number <= 12) {
      message = `1 - Kidnapping Citizen 
- Status | ✅ 
2 - Kidnapping Policeman
- Status | ✅ 
3 - Kill Policemen 
- Status | ❌ 
4 - Robbery Store 
- Status | ✅ 
5 - Robbery House 
- Status | ✅ 
6 - ATM Robbery 
- Status | ✅ 
7 - Robbery Bank 
- Status | ✅ 
8 - Jewelry Robbery
- Status | ✅ 
9 - Central Bank 
- Status | ❌ 
10 - Paleto Bank 
- Status | ✅ 
11 - Fedral Bank 
- Status | ❌ 
12 - BobCat 
- Status | ✅`
    } else if (number >= 13 && number <= 20) {
      message = `1 - Kidnapping Citizen 
- Status | ✅ 
2 - Kidnapping Policeman
- Status | ✅ 
3 - Kill Policemen 
- Status | ✅ 
4 - Robbery Store 
- Status | ✅ 
5 - Robbery House 
- Status | ✅ 
6 - ATM Robbery 
- Status | ✅ 
7 - Robbery Bank 
- Status | ✅ 
8 - Jewelry Robbery
- Status | ✅ 
9 - Central Bank 
- Status | ✅ 
10 - Paleto Bank 
- Status | ✅ 
11 - Fedral Bank 
- Status | ✅ 
12 - BobCat 
- Status | ✅`
    }
    if (!data.joins || !data.joinChannels.first) return;
    let channel = guild.channels.cache.get(data.joinChannels.first)
    if (!channel) return;

    let embed = new Discord.EmbedBuilder()
      .setColor("#030292")
      .setImage("https://media.discordapp.net/attachments/1277437909330563163/1311723062781284495/81C942A0-50C1-44F9-B828-67D80BD47121.jpg?ex=6749e4cc&is=6748934c&hm=64bea448b26792896c3deee3eb204d92a5ed8b36adfbe0f8364b75ec4b5b7583&")
      .setThumbnail("https://media.discordapp.net/attachments/1277437909330563163/1311723853218844782/C7A50005-0685-4C3A-AD54-F34A0F30C766.png?ex=6749e589&is=67489409&hm=9dabcf04f569ddc59592df4c87c3ea42a38dfb8b9eba1f01a5a0073995b35b67&")
      .setDescription(`** 🚔 - Police Priority

${message}**`);

    channel.send({
      embeds: [embed],
      content: `|| @everyone ||`
    });
  },

  imgur: async (url) => {
    const clientId = '0a1cb9a1d62fe5b';

    try {
      const res = await axios.get(url, { responseType: 'arraybuffer' });
      const ggg = Buffer.from(res.data, 'binary').toString('base64');

      const imgurr = await axios({
        method: 'post',
        url: 'https://api.imgur.com/3/image',
        headers: {
          Authorization: `Client-ID ${clientId}`,
          'Content-Type': 'application/json',
        },
        data: {
          image: ggg,
        },
      });


      return imgurr.data.data.link;
    } catch (error) {
      console.error('Error uploading image to Imgur:', error.message);
      throw error;
    }
  },

  addPoint: async (guild, user, type, num) => {
    let db = await userBase.findOne({ guild: guild, user: user })
    if (!db) {
      db = new userBase({ guild: guild, user: user })
      await db.save();
    }

    db.points[type] += Number(num)
    await db.save();

    return true
  },

  addPolicePoint: async (guild, user, character, type, num) => {
    let db = await userBase.findOne({ guild: guild, user: user })
    if (!db) {
      db = new userBase({ guild: guild, user: user })
      await db.save();
    }

    db = db[character]

    let points = db.police_points.find(c => c.name.toLowerCase() === type.toLowerCase()).value

    await userBase.updateOne(
      { guild: guild, user: user, [`${character}.police_points.name`]: `${type}` },
      { $set: { [`${character}.police_points.$.value`]: points += parseInt(num) } }
    );

    return true
  },

  sleep: (ms) => {
    return new Promise((r) => setTimeout(() => r(ms), ms));
  },

  checkInv: (inv, tools) => {
    for (var tool of tools) {
      let required_number = parseInt(tool.split(" ")[0], 10),
        required_name = tool.split(" ")[1]

      if (!required_number) required_number = 1

      const test_item = inv.find((item) => item.name.toLowerCase() == required_name.toLowerCase() && item.count >= required_number);
      if (!test_item) return false;

      return true
    }
  },

  checkStore: (store, values) => {
    for (var value of values) {
      const test_item = store.find((item) => item.name.toLowerCase() == value.toLowerCase());
      if (!test_item) return { status: false, value: value };

      return { status: true }
    }
  }
}