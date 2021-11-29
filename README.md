<!--
title: 'Serverless API for using Textract and Aws Rekognition'
description: 'This API is ready to use and deploy to your AWS account, runs a serverless API for running Textract and Rekognition in a simple way, fast and reliable way.'
layout: Doc
framework: v1
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/fgiouck'
authorName: 'Giovanni Marcos'
authorAvatar: ''
-->

# Serverless Framework Node Express API on AWS

This template demonstrates how to deploy this simple AWS services API running on AWS Lambda using the traditional Serverless Framework.

## Anatomy of the template

This template works in a simple way, you configure it with your own AWS keys on a .env file, install all modules and name the buckets, roles and DynamoDB whichever way you want and deploy. It receives a file, if its a PDF or JPEG it runs textract, returns the result JSON after a few seconds, if its MP4, it runs Rekognition Facial Scan and returns the return JSON on up to 14min, depending on file size. File is saved on your S3 and lambda's do the service and save the results. If you run into any bugs or want to help improve this, feel free to contact me in 'https://github.com/fgiouck'

## Usage

### Deployment

Install dependencies with:

```
npm install
```

create a .env file like this:

```
accessKeyId: "YOUR ACCESS KEY" ,
secretAccessKey: "YOUR SECRET KEY",
region: "YOUR REGION"
```

Also feel free to change bucket names, DynamoDB names or role names on serverless.yml
and then deploy with:

```
serverless deploy
```

After running deploy, you should see output similar to:

```bash
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
........
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service aws-node-express-api.zip file to S3 (711.23 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.................................
Serverless: Stack update finished...
Service Information
service: aws-node-express-api
stage: dev
region: us-east-1
stack: aws-node-express-api-dev
resources: 12
api keys:
  None
endpoints:
  ANY - https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  api: aws-node-express-api-dev-api
layers:
  None
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [`httpApi` event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api/).


### Local development

It is also possible to emulate API Gateway and Lambda locally by using `serverless-offline` plugin. In order to do that, execute the following command:

```bash
serverless plugin install -n serverless-offline
```

It will add the `serverless-offline` plugin to `devDependencies` in `package.json` file as well as will add it to `plugins` in `serverless.yml`.

After installation, you can start local emulation with:

```
serverless offline
```

To learn more about the capabilities of `serverless-offline`, please refer to its [GitHub repository](https://github.com/dherault/serverless-offline).
