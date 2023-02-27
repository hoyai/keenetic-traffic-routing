require("dotenv").config();
const KeeneticApi = require("./api/keenetic");

async function bootstrap() {
  const instance = new KeeneticApi();
  await instance.connect(
    process.env.KEENETIC_HOST,
    process.env.KEENETIC_USER,
    process.env.KEENETIC_PASSWORD
  );

  instance.disconnect();
}

bootstrap();
