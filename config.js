require("dotenv").config();

module.exports = {
  ssh: {
    host: process.env.KEENETIC_HOST,
    user: process.env.KEENETIC_USER,
    password: process.env.KEENETIC_PASSWORD,
  },
  networks: {
    IKE0: ["Cloudflare", "Google", "Telegram"],
  },
};
