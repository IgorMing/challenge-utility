# Utility (Code Challenge)

App built for testing my knowledge.

**Note:** Unfortunately, I stopped getting data from the GraphQL service. So, for that reason, I decided to delivery without ordering the data as the guide suggested. But no worries, the app is running well anyways. The only requirement for accomplishing it is having the GraphQL service endpoint working as expected.

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

> **PS:** The notes below are just a personal way that I'm used to use for following the steps of my work. I left it below in case you'd like to check.

## TODOs

- [x] configure ts
- [x] apollo client for fetching GraphQL data nicely
- [x] codegen for getting types in the easier way
- [x] make eslint ready
- [x] create a UI to show all the data retrieved
- [x] get calculated odds and show it
- [ ] order retrieved data

---

- [ ] use env variables to reference the root data endpoint
