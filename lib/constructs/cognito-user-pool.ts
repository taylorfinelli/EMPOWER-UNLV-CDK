import { RemovalPolicy } from "aws-cdk-lib";
import { AccountRecovery, Mfa, UserPool } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

/**
 * Amazon Cognito is only used for a single admin account on the website.
 * When manually creating the user in the User Pool, it will require the user to login and
 * reset their password after a certain length of time. The password can be set
 * within the AWS CLI using the following command:
 *
 * aws cognito-idp admin-set-user-password --user-pool-id <your_user_pool_id> --username <username> --password <new_password> --permanent
 */

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
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: false,
        requireDigits: true,
        requireSymbols: false,
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
