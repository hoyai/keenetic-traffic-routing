const { NodeSSH } = require("node-ssh");
const { Signale } = require("signale");

export class KeeneticApi {
  constructor() {
    this.ssh = new NodeSSH();
    this.log = new Signale({ scope: "KeeneticApi" });
  }

  /**
   * Connecting to the router via SSH
   * @param {*} host router address
   * @param {*} username Administrative account login
   * @param {*} password Administrative account password
   * @returns NodeSSH connect promise
   */
  connect(host = "127.0.0.1", username = "admin", password = "admin") {
    this.log.debug(host, username, "Connecting to the router via SSH");
    return this.ssh.connect({ host, username, password });
  }

  /**
   * Clearing all added routing rules
   */
  async rulesClear() {
    const { stdout } = await this.ssh.execCommand(`more running-config`);
    for (let el of stdout.split("\n")) {
      if (el.search("ip route") === -1) continue;
      el = el.split(" auto")[0];
      await this.ssh.execCommand("no " + el);
      this.log.debug("delete rule", el);
    }
  }

  /**
   * Adding a New Routing Rule
   * @param {*} ip added ip address or subnet
   * @param {*} network local subnet where this traffic will go
   * @param {*} comment a comment
   * @returns stdout the result of adding the rule
   */
  async rulesCreate(ip = "10.0.0.1", network = "IKE0", comment = "default") {
    const { stdout } = await this.ssh.execCommand(
      `ip route ${ip} ${network} auto !${comment}`
    );

    this.log.success("add rule", network, comment, ip, stdout);
    return stdout;
  }
}
