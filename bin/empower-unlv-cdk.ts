#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { EmpowerUnlvCdkStack } from "../lib/empower-unlv-cdk-stack";

const app = new cdk.App();
new EmpowerUnlvCdkStack(app, "EmpowerUnlvCdkStack", {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
