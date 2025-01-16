import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { RemovalPolicy } from "aws-cdk-lib";
import { Construct } from "constructs";

export class EmpowerLocalDevGraphDataTable extends Construct {
  readonly table: Table;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.table = this.createTable();
  }

  private createTable(): Table {
    return new Table(this, "LocalDev-GraphDataTable", {
      tableName: "LocalDev",
      partitionKey: {
        name: "graphId",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "itemId",
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PROVISIONED,
      removalPolicy: RemovalPolicy.DESTROY,
      readCapacity: 1,
      writeCapacity: 1,
    });
  }
}
