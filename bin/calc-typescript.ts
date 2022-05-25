#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CalcTypescriptStack } from '../lib/calc-typescript-stack';

const app = new cdk.App();
new CalcTypescriptStack(app, 'CalcTypescriptStack');
