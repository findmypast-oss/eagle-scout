// Generates a secret-paths.json file suitable for consumption by the
// secrets initialiser. Use this file if the paths to secrets change
// depending on the environment.
const fs = require('fs-extra');
const path = require('path');

const createSecretPathFile = async (environment, filepath) => {
  // Use string interpolation to custom the paths if paths are dependant on deployment environment
  // e.g.: path: `secret/service/db/${environment}/password` for example.
  const secretPaths = {
    accessToken: `secret/eagle-scout/sourcegraph-access-token`,
  };

  await fs.ensureDir(path.dirname(filepath));
  fs.writeJsonSync(filepath, secretPaths);
};

const getEnvironment = () => {
  if (process.env.ENVIRONMENT) return process.env.ENVIRONMENT;

  throw new Error(
    'Please supply the ENVIRONMENT environment variable to specify the deployment environment.'
  );
};

const getFilepath = () => {
  if (process.env.SECRETS_FILEPATH) return process.env.SECRETS_FILEPATH;

  throw new Error(
    'Please supply the SECRETS_FILEPATH environment variable to specify the name and destination of the secrets path file.'
  );
};

createSecretPathFile(getEnvironment(), getFilepath());
