import makeApp from "@main/config/app";
import { Environment } from "@main/config/environment";

const makeServer = async () => {
  const app = await makeApp();

  app.listen(Environment.infrastructure.server.rest.express.port, () => {
    // eslint-disable-next-line no-console
    console.log(
      `Server running on port ${Environment.infrastructure.server.rest.express.port}!`,
    );
  });
};

makeServer();
