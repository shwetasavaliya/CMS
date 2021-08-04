import { AWS_ACCESS_KEY_ID, AWS_S3_BUCKET_NAME, AWS_SECRET_ACCESS_KEY } from "../../config";
import * as AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v4',
    region: 'us-east-2'
})

export const awsSigneUrl = () => {

    const s3 = new AWS.S3({
        //     endpoint:'kau1.s3.us-east-2.amazonaws.com',
        signatureVersion: 'v4',
        region: 'us-east-2'
    });

    const myBucket = AWS_S3_BUCKET_NAME;
    const myKey = new Date().getTime() + '.png';
    const signedUrlExpireSeconds = 60 * 5;
    const singUrl = s3.getSignedUrl('putObject', {
        Bucket: myBucket,
        Key: 'test/' + myKey,
        Expires: signedUrlExpireSeconds
    })
    return { singUrl, fileName: myKey };
}

export const uploadPdf = async (fileName: any) => {

    const s3 = new AWS.S3({
        //     endpoint:'kau1.s3.us-east-2.amazonaws.com',
        signatureVersion: 'v4',
        region: 'us-east-2'
    });

    const myBucket = AWS_S3_BUCKET_NAME;
    const myKey = new Date().getTime() + '.pdf';
    const parmas = {
        Bucket: myBucket,
        Body: fileName,
        Key: 'invoice/' + myKey,
    }

    const data = await new Promise((resolve, reject) => {
        s3.putObject(parmas, (err, data) => {
            if (err) reject(err)
            resolve(data);
        })
    })
    return { parmas, fileName: myKey };
}
