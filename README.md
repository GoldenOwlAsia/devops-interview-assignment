# Devops Interview Assigment

Devops interview assignment at [Golden Owl](https://goldenowl.asia/)

## Scenario

We have RESTful API for authentication was created using:
  - NestJS - https://nestjs.com
  - SQLite
  - Docker

You can get source code in `./sample-api`.

Here are some api endpoints you can try:

```console
curl --location --request GET 'http://localhost:3000'
```

```console
curl --location --request POST 'http://localhost:3000/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Ben",
    "lastName": "Tran",
    "email": "ben@goldenowl.asia",
    "password": "password123",
    "passwordConfirmation": "password123"
}'
```

```console
curl --location --request POST 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "ben@goldenowl.asia",
    "password": "password123"
}'
```

```console
curl --location --request GET 'http://localhost:3000/auth/profile' \
--header 'Authorization: Bearer YOUR_AUTH_TOKEN_HERE'
```

## Requirement

Deploy the application to AWS follow these requirements:

- Use Terraform for IaC
- Application must be run in Kubernetes system - AWS EKS
- Streaming server log to AWS CloudWatch

## Submission

After completing the assignment:

- Push the source code to remote repository (github/gitlab), then send us the link to your repository.

- Make a short video to verify that the application is deployed successfully:
  + Show API is working (you can test it with Postman app)
  + Show used services in AWS (AWS EKS, AWS CloudWatch)

GOOD LUCK!!!
