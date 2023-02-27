const { Signale } = require("signale");
const axios = require("axios");

class ripeApi {
  constructor() {
    this.http = axios.create({
      baseURL: "https://stat.ripe.net/",
    });

    this.log = new Signale({ scope: "ripeApi" });
  }

  /**
   * Getting data by ASN number
   * @param {*} number ASN number
   * @returns [{prefix, name, country_code, description}]
   */
  async prefixes(number = 61138) {
    this.log.debug(number, "Getting data by ASN number");
    const { data } = await this.http.get("data/announced-prefixes/data.json", {
      params: {
        resource: number,
      },
    });

    return data.data.prefixes
      .filter(({ prefix }) => !prefix.includes("::"))
      .map(({ prefix }) => prefix);
  }
}

module.exports = new ripeApi();
