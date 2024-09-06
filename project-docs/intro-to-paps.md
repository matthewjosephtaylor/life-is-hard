# Intro to PAPs

## What is a PAP?
A PAP is a "Public Access Point", which is a concept in AI-Workforce that allows for the creation of a public endpoint that can be used to access AI services.

In particular this gives one access to an Agent that can be used to interact with the AI-Workforce backend. Agents are created via signing up for an account on the [AI-Workforce website](https://ai-workforce.intelligage.net/).

There should be an AI character created by default or you can create your own.

## How do I create a PAP?

1. Create an account on the [AI-Workforce website](https://ai-workforce.intelligage.net/).
2. Create an AI character or use the default character.
3. Create a PAP by right-clicking on the character and clicking the ["Create PAP" button](./assets/create-pap.png). Be sure that the PAP also has another character that will be used to [represent the user in any conversations](./assets/add-user-to-pap.png)
4. Copy the URL for the PAP using the `Copy URL` button paste the URL into the browser to access the PAP to make sure it is functioning as desired.
5. The URL will look something like `https://ai-workforce.intelligage.net/access-point-XXXXXX`  where the last part begining with `access-point` is the unique identifier for the PAP aka the PAP ID.

## How do I use a PAP in ai-ui?

Edit the [vite.config.js](../vite.config.ts) file and modify it to include the PAP ID in the `env` object. For example:

```typescript
    __PAP_ID__: JSON.stringify(
      "access-point-XXXXXXX"
    ),
```