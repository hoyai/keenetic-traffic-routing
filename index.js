const KeeneticApi = require("./api/keenetic");
const ripeApi = require("./api/ripe");
const config = require("./config");
const { Signale } = require("signale");
const log = new Signale({ scope: "Main" });

async function bootstrap() {
  const instance = new KeeneticApi();
  await instance.connect(config.ssh.host, config.ssh.user, config.ssh.password);
  await instance.rulesClear();

  for (const interface in config.networks) {
    log.debug(interface, "sorting through the rules of the network");
    for (const filename of config.networks[interface]) {
      log.debug(filename, "open the rules");
      const rules = require("./rules/" + filename);
      for (const rule of rules) {
        log.debug(rule, "getting detailed information");
        if (!rule.includes("AS")) {
          log.info(rule, "add rule with comment", filename);
          await instance.rulesCreate(rule, interface, filename);
          continue;
        }

        // Getting information about ASN
        const prefixes = await ripeApi.prefixes(rule);
        for (const prefix of prefixes) {
          log.info(prefix, interface, "add rule with comment", filename, rule);
          await instance.rulesCreate(prefix, interface, `${filename} ${rule}`);
        }
      }
    }
  }

  instance.disconnect();
}

bootstrap();
