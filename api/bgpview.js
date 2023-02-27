const { Signale } = require("signale");
const axios = require("axios");

class BGPViewApi {
  constructor() {
    this.http = axios.create({
      baseURL: "https://api.bgpview.io/",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "git@github.com:hoyai/keenetic-traffic-routing",
      },
    });

    this.log = new Signale({ scope: "BGPViewApi" });
  }

  /**
   * Getting data by ASN number
   * @param {*} number ASN number
   * @returns [{prefix, name, country_code, description}]
   */
  async prefixes(number = 61138) {
    this.log.debug(number, "Getting data by ASN number");
    const { data } = await this.http.get("asn/" + number + "/prefixes");
    this.log.debug(number, data.status_message);
    if (data.status !== "ok") throw "Error getting data by ASN " + number;
    return data.data.ipv4_prefixes;
  }
}

module.exports = new BGPViewApi();
