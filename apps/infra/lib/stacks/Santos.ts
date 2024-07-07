import { Stack, StackProps, App, IgnoreMode, Duration } from "aws-cdk-lib";
import {
  Deployment,
  LambdaIntegration,
  RestApi,
  Stage,
} from "aws-cdk-lib/aws-apigateway";
import { Platform } from "aws-cdk-lib/aws-ecr-assets";
import {
  Architecture,
  DockerImageFunction,
  DockerImageCode,
} from "aws-cdk-lib/aws-lambda";

interface SantosStackProps extends StackProps {
  gitRoot: string;
  platform: Platform;
  architecture: Architecture;
  environmentName: string;
}

export class SantosStack extends Stack {
  constructor(scope: App, id: string, props?: SantosStackProps) {
    super(scope, id, props);

    const { gitRoot, platform, architecture, environmentName, env } = props;

    // API Gateway
    const api = new RestApi(this, "api", {
      restApiName: "Santos API",
      description: "API Gateway for jentz-api",
    });

    // Email sender API
    const jentzAPI = new DockerImageFunction(this, "JentzAPI", {
      code: DockerImageCode.fromImageAsset(gitRoot, {
        file: "apps/jentz-api/lambda.Dockerfile",
        platform,
        ignoreMode: IgnoreMode.GIT,
      }),
      architecture,
      memorySize: 256,
      reservedConcurrentExecutions: 10,
      initialPolicy: [],
      timeout: Duration.seconds(30),
    });

    // API Gateway resource mappings
    // └─ /api (ANY) -> jentz-api
    const apiIntegration = new LambdaIntegration(jentzAPI);
    const apiResource = api.root.addResource("api", {
      defaultCorsPreflightOptions: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        statusCode: 200,
      },
    });

    const apiProxyResource = apiResource.addResource("{proxy+}");
    apiProxyResource.addMethod("ANY", apiIntegration, {
      apiKeyRequired: true,
    });
  }
}
