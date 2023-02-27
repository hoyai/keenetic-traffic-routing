require("dotenv").config();

module.exports = {
  // Data for connecting to the SSH router
  ssh: {
    host: process.env.KEENETIC_HOST,
    user: process.env.KEENETIC_USER,
    password: process.env.KEENETIC_PASSWORD,
  },

  // Interfaces in the router for routing rules
  networks: {
    // Interface: [filename configuration rules]
    IKE0: ["Cloudflare", "Google", "Telegram"],
  },
};
