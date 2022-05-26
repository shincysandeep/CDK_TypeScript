
"use strict";

import * as assert from "assert";
import { ISfnHelper, SfnHelper } from "../../../src/core/dal/sfn-helper";
import { ImportMock } from "ts-mock-imports";
import { DynamoDB, S3 } from "aws-sdk";
import * as AWS from "aws-sdk";
import * as AWSMock from "aws-sdk-mock";
import { error } from "aws-cdk/lib/logging";


describe("Unit Tests for the sfn-helper ", function () {

    describe("tests for sfn-helper", function () {

        it("Test 1: true=true", function () {
            const right = true;
            assert.deepStrictEqual(right, true);
        });

        it("Test 2: testing SfnHelper - invokeSfn", async () => {

            AWSMock.setSDKInstance(AWS);
            const stepFunctionsStartExecution: any = { "sfn response": "execution started successfully" }
            const right = true;
            AWSMock.mock('StepFunctions',
                'startExecution',
                new Promise(function (resolve, reject) {
                    resolve(stepFunctionsStartExecution);
                }));


            const stepFunctions = new AWS.StepFunctions();
            const sfnHelper: ISfnHelper = new SfnHelper(stepFunctions, "arn:aws:states:us-east-1:586036623065:stateMachine:msta-move-mkup-dev-master-sfn", false);

            const resp = sfnHelper.invokeSfn("test" )

            AWSMock.restore();
            console.log("-----------------resp:" + JSON.stringify(resp));
            assert.deepStrictEqual(Object.keys(resp).length, 0);

        });

        it("Test 3: testing SfnHelper - returning an error", async () => {

            AWSMock.setSDKInstance(AWS);

            AWSMock.setSDKInstance(AWS);
            AWSMock.mock('StepFunctions',
                'startExecution',
                new Promise(function (resolve, reject) {
                    reject(new Error("Error while invoking SNS msg"));
                })
            );

            const stepFunctions = new AWS.StepFunctions();
            const sfnHelper: ISfnHelper = new SfnHelper(stepFunctions, "arn:aws:states:us-east-1:586036623065:stateMachine:msta-move-mkup-dev-master-sfn", false);

            const resp = sfnHelper.invokeSfn("test" )

            AWSMock.restore();
            console.log("-----------------resp:" + JSON.stringify(resp));
            assert.deepStrictEqual(Object.keys(resp).length, 0);

        });


    })

});