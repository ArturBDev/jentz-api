import { App } from "aws-cdk-lib";
import { Platform } from "aws-cdk-lib/aws-ecr-assets";
import { Environments } from "../lib/types";
import { capitalize, getGitRoot } from "../lib/utils";
import { Architecture } from "aws-cdk-lib/aws-lambda";
import { SantosStack } from "../lib/stacks/Santos";

const createStacks = async (app: App): Promise<void> => {
  const gitRoot = await getGitRoot();

  const environmentsParse = Environments.safeParse(
    app.node.tryGetContext("environments")
  );

  if (!environmentsParse.success) {
    throw new Error(
      `Invalid environments context value: ${JSON.stringify(
        environmentsParse.error
      )}`
    );
  }

  const environmentName = app.node.tryGetContext("environment") || "dev";

  if (!environmentName || typeof environmentName !== "string") {
    throw new Error(
      `Provide a valid environment via context: -c "environment=<environment-name>"`
    );
  }

  if (!/^[a-z0-9]+$/.test(environmentName)) {
    throw new Error(
      `Invalid environment name "${environmentName}". Environment names must be lowercase letters and numbers only.`
    );
  }

  const environment = environmentsParse.data.find(
    (env) => env.environmentName === environmentName
  );

  if (!environment) {
    throw new Error(`Environment "${environmentName}" not found`);
  }

  const tags = {
    project: "Santos",
    environment: environmentName,
  };

  const platform =
    process.arch === "arm64" ? Platform.LINUX_ARM64 : Platform.LINUX_AMD64;

  const architecture =
    platform === Platform.LINUX_ARM64
      ? Architecture.ARM_64
      : Architecture.X86_64;

  const { account, region } = environment;

  new SantosStack(app, `Santos-${capitalize(environmentName)}`, {
    env: {
      account,
      region,
    },
    tags,
    gitRoot,
    platform,
    architecture,
    environmentName,
  });
};

const app = new App();

createStacks(app).catch((error) => {
  throw error;
});
