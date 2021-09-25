const API = require("./api_key.json");
const { Client, Intents } = require("discord.js");
const { default: axios } = require("axios");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
let lastPrice = "";

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  setInterval(async () => {
    let d = new Date();
    await axios
    .get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&symbols=slp"
    )
    .then((r) => {
      console.log("R$ " +
      r.data[0].current_price.toFixed(4) +
      " // " +
      d.getHours() +
      ":" + (d.getMinutes() <
      10
      ? "0" + d.getMinutes()
      : d.getMinutes()))
      lastPrice = r.data[0].current_price.toFixed(4);
      client.user.setActivity({
        type: "WATCHING",
        name: "R$ " +
            r.data[0].current_price.toFixed(4) +
            " // " +
            d.getHours() +
            ":" +
            (d.getMinutes() <
            10
            ? "0" + d.getMinutes()
            : d.getMinutes())
      });
    })
    .catch((err) => {
      console.log(err);
      client.user.setActivity({
        type: "WATCHING",
        name: String(
            "R$ " +
            lastPrice +
            " // " +
            d.getHours() +
            ":" + (d.getMinutes() <
            10
            ? "0" + d.getMinutes()
            : d.getMinutes())
        ),
      });
    });
  }, 60000);
});

client.login(API["api"]);
