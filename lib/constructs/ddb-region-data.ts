import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { RemovalPolicy } from "aws-cdk-lib";
import { Construct } from "constructs";

export class EmpowerRegionCountsTable extends Construct {
  readonly table: Table;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.table = this.createTable();
  }

  private createTable(): Table {
    return new Table(this, "RegionCountsTable", {
      tableName: "RegionCounts",
      partitionKey: {
        name: "region",
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PROVISIONED,
      removalPolicy: RemovalPolicy.DESTROY,
      readCapacity: 1,
      writeCapacity: 1,
    });
  }
}
