'use strict';

import { SQS } from 'aws-sdk';

export interface ISqsHelper {
    // send message
    sendMessage(params: any): Promise<any>;
    // recieve single/batch message
    recieveMsg(params: any): Promise<any>;
}

export class SqsHelper implements ISqsHelper {
    private readonly sqs: SQS;
    private readonly debug: boolean;
    private readonly queueUrl: string;

    constructor(sqs: SQS, queueUrl: string, debugLoggingEnabled = false) {
        this.sqs = sqs;
        this.queueUrl = queueUrl;
        this.debug = debugLoggingEnabled;
    }

    async sendMessage(inp: any): Promise<any> {
        const params = {
            MessageBody: JSON.stringify(inp), /* required */
            QueueUrl: this.queueUrl
        }
        return new Promise((resolve, reject) => {
            this.sqs.sendMessage(params, (err, data) => {
                if (err) {
                    console.log(
                        `Error while publishing data to sqs, input: ${JSON.stringify(
                            params,
                            null,
                            2
                        )} , error is:${JSON.stringify(err, null, 2)}`
                    );
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }



    async recieveMsg(inp: any): Promise<any> {
        const params = {
            MessageBody: JSON.stringify(inp), /* required */
            QueueUrl: this.queueUrl
        }
        return new Promise((resolve, reject) => {
            this.sqs.receiveMessage(params, (err, data) => {
                if (err) {
                    console.log(
                        `Error while recieving data from sqs, input: ${JSON.stringify(
                            params,
                            null,
                            2
                        )} , error is:${JSON.stringify(err, null, 2)}`
                    );
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}
