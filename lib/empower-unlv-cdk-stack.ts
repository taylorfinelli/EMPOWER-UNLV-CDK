import * as cdk from "aws-cdk-lib";
import { UserPool } from "aws-cdk-lib/aws-cognito";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { EmpowerGraphDataTable } from "./constructs/ddb-data";
import { EmpowerUserPool } from "./constructs/cognito-user-pool";
import { EmpowerVisitorsTable } from "./constructs/ddb-visitors";
import { EmpowerCountryCountsTable } from "./constructs/ddb-country-counts";
import { EmpowerRegionCountsTable } from "./constructs/ddb-region-data";
import { EmpowerLocalDevGraphDataTable } from "./constructs/ddb-local-dev";

export class EmpowerUnlvCdkStack extends cdk.Stack {
  readonly ddbDataTable: Table;
  readonly ddbLocalDevTable: Table;
  readonly ddbVisitorTable: Table;
  readonly ddbCountryCountsTable: Table;
  readonly ddbRegionCountsTable: Table;
  readonly userPool: UserPool;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.ddbDataTable = new EmpowerGraphDataTable(this, "EmpowerGraphDataTable").table;
    this.ddbLocalDevTable = new EmpowerLocalDevGraphDataTable(
      this,
      "EmpowerLocalDevGraphDataTable"
    ).table;
    this.ddbVisitorTable = new EmpowerVisitorsTable(this, "EmpowerVisitorsTable").table;
    this.ddbCountryCountsTable = new EmpowerCountryCountsTable(
      this,
      "EmpowerCountryCountsTable"
    ).table;
    this.ddbRegionCountsTable = new EmpowerRegionCountsTable(
      this,
      "EmpowerRegionCountsTable"
    ).table;
    this.userPool = new EmpowerUserPool(this, "EmpowerUserPool").userPool;
  }
}
