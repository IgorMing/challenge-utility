# Utility (Code Challenge)

App built for testing my knowledge.

**NOTE:** The last requirement, related to order the positions based from higher to lower likelihood, required me to change how I've had architectured the ListItem component.
First I've made it with some ephemeral states, which was a huge problem when I had to order it based on a data calculated into a child component, and keep the entire data placed into the parent layer component. So I had to move all the logic and re-architecture the solution to work well.

Additionally, for real apps the business logic would be separated by some library or on custom hooks. I decided to keep like that because I think this note might be enough to expose my real concerns about code quality.

## Preview

https://user-images.githubusercontent.com/8928206/213335571-715f2804-c9d5-4a44-aa7d-8e6cc82056e8.mov

---

## Getting started

To build the project, it's quite straightforward.

First, install all the dependencies:

```shell
$ yarn
```

Now, let's run [codegen](https://the-guild.dev/graphql/codegen) to get all the project types _(of course, considering that the GraphQL endpoint is running well)_

```shell
$ yarn compile
```

Now we can run it, wherever you prefer (either iOS or Android)

```shell
$ yarn ios # or yarn android
```

That's all you need! Expo does everything behind the scenes for letting the app up and running.

In the last two hours, I put some efforts trying to figure out an infinite loop behavior that was happening after the changes, and it was kinda tricky to find.

---

> **PS:** The notes below are just a personal way that I'm used to use for following the steps of my work. I left it below in case you'd like to check.

## TODOs

- [x] configure ts
- [x] apollo client for fetching GraphQL data nicely
- [x] codegen for getting types in the easier way
- [x] make eslint ready
- [x] create a UI to show all the data retrieved
- [x] get calculated odds and show it
- [x] order retrieved data
