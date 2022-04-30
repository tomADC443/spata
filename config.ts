const getEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`
    );
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

const config = {
  DATABASE_URL: getEnvironmentVariable("DATABASE_URL"),
  GOOGLE_CLIENT_ID: getEnvironmentVariable("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnvironmentVariable("GOOGLE_CLIENT_SECRET"),
  JWT_SECRET: getEnvironmentVariable("JWT_SECRET"),
  SERVER_URL: getEnvironmentVariable("SERVER_URL"),
};

export default config;
