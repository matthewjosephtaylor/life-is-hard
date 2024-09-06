# App Front

## What is an 'App Front'?

This is the term within the ai-ui project that was created to describe the entry-point of the developer's user interface code.

In a typical React application there is a large amount of boilerplate code that is required to get a project up and running. The concept of this project is that the developer will start with an existing production-ready project that has all of the boilerplate code already in place.

There is particular need in this case to be innovative as the complexity of providing AI-driven React Components is non-trivial, and requires a lot of setup to get right beyond setting up a simple React project.

## How do I make changes to an 'App Front'?

1. Install and run the project as described in the [README](./../README.md).
2. Edit the code in the provided demo to get your feet wet [PizzaDemo](./../src/app-front/pizza-demo/PizzaDemo.tsx).
3. Profit

## How do I create a new 'App Front'?

1. Create a new App Front React Component, we suggest adding this into the [app-front](./../src/app-front) directory.

```typescript
    // src/app-front/MyNewAppFront.tsx
    import React from 'react';

    export const MyNewAppFront = () => {
        return (
            <div>
                <h1>My New App Front</h1>
            </div>
        );
    };
```

2. Add a reference to the new App Front to the [APP_FRONTS](./../src/app-front/APP_FRONTS.tsx) constant

```typescript
export const APP_FRONTS: Record<string, ReactChild> = {
  "power-user": <PowerUserSpa />,
  playground: <PlaygroundSpa />,
  overlay: <OverlaySpa />,
  "pizza-demo": <PizzaDemoFront />,
  "my-new-app-front": <MyNewAppFront />,
} as const;
```
3. Edit the [vite.config.ts](./../vite.config.ts) file to reference the App Front you want to create.

```typescript
    __APP_FRONT__: JSON.stringify("my-new-app-front"), // change to the name of the new App Front
```

## How do I add AIPL components to an 'App Front'?

In order to have AIPL component interactivity you will need to wrap your React components inside of an AiplComponentProvider.

```typescript
    // src/app-front/MyNewAppFront.tsx
    export const MyNewAppFront = () => {
        return (
            <AiplComponentProvider config={myConfig}>
                <div>
                    <h1>My New App Front</h1>
                </div>
            </AiplComponentProvider>
        );
    };
```

## How do I configure the AiplComponentProvider?

In order for the AI (LLM) to understand how to work with the AIPL Components it must understand what is possible, and what is not. This project uses programming concept of [types](https://en.wikipedia.org/wiki/Type_system).

We have adopted the use of [Typebox](https://github.com/sinclairzx81/typebox) internally to give the developer a programatic way of describing types with enough context so that the LLM can understand how to manipulate the AIPL Components properly.

It is recommended to start with the [pizzaDemoConfig](../src/app-front/pizza-demo/pizzaDemoConfig.ts) as a starting point and that one refer to the Typebox project for documentation on how to use the `JavaScriptTypeBuilder` to create the necessary types.

It is important to note that this project relies upon the [@mjtdev/engine](https://github.com/matthewjosephtaylor/mjtdev-engine) project and that the `TypeBoxes.createTypeInfo` within that project is used to create a `TypeInfo` object that is in turn used 'under the hood' to capture the necessary information to make the AIPL Components work properly.

