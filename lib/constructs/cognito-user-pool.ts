import { RemovalPolicy } from "aws-cdk-lib";
import { AccountRecovery, Mfa, UserPool } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export class EmpowerUserPool extends Construct {
  readonly userPool: UserPool;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.userPool = this.createUserPool();
    this.addUserPoolClient("EmpowerReactClient");
  }

  private createUserPool(): UserPool {
    return new UserPool(this, "UserPool", {
      userPoolName: "EmpowerUsers",
      accountRecovery: AccountRecovery.EMAIL_ONLY,
      keepOriginal: {
        email: true,
      },
      removalPolicy: RemovalPolicy.DESTROY,
      deletionProtection: true,
      signInAliases: {
        email: false,
        username: true,
      },
      mfa: Mfa.OFF,
      enableSmsRole: false,
      selfSignUpEnabled: false,
      standardAttributes: {
        email: {
          required: true,
          mutable: false,
        },
      },
      autoVerify: {
        email: true,
      },
    });
  }

  private addUserPoolClient(clientName: string): void {
    this.userPool.addClient("UserPoolClient", {
      userPoolClientName: clientName,
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
      preventUserExistenceErrors: true,
    });
  }
}
