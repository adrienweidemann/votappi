# Welcome to VOTAPPI 👋

[![Node](https://img.shields.io/badge/node-18-black.svg?logo=node.js&color=43853d)](https://nodejs.org/)
[![NPM](https://img.shields.io/badge/npm-9-black.svg?logo=npm&color=CB0000)](htps://npmjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-black.svg?logo=typescript&color=3178c6)](https://typescriptlang.org/)
[![License: proprietary](https://img.shields.io/badge/License-proprietary-yellow.svg)](#)

> Votappi - Votapp back-end

## TO DO

## Prerequisites

- node 18
- npm 9

## Install & build

```sh
TO DO
```

## Usage

### .env files

Please, create an .env file based on .env.sample. file.

### production / pre-production (need build)

```sh
TO DO
```

### local

```sh
# build and run server on file changes
TO DO
```

## Run tests

```sh
TO DO
```

# Architecture, development and testing

## Project architecture

**TO DO**

Good luck!

## Tests

For test purpose, this project use Jest and Faker packages.

The following "Golden rules" were the base for our application tests:
https://github.com/goldbergyoni/javascript-testing-best-practices

Main rules used for this project:

- categorize tests under at least 2 levels,
- no try/catch, anticipate all incoming errors instead,
- avoid global test fixtures and seeds, add data per-test,
- don’t “foo”, use realistic input data (take a look to faker API),
- structure test with the AAA pattern (Arrange, Act & Assert) when you can,
- explicit tests names and describes,
- **if something in the app breaks, don't forget to add new tests in order to cover the new incoming error**,
- have fun (and don't hesitate to open new debate with your teammates in order to challenge theses golden rules).

About the architecture, each file has his own test file in the same sub directory. Unit tests are not really dissociated from functional tests.

**TO DO**

## Author's note

This project is based on my personal projects. You'll maybe found code remainder or some logic that is pretty overkill for this project.
But I want to show how I usually work, what I like to implement in my projects and what I'm capable of.

I was inspired by the configuration of Airbnb linters for this project (https://github.com/airbnb/javascript).
I use Husky as Git hook to prevent code to be pushed if tests doesn't work or if code has not been linted (https://typicode.github.io/husky/#/).
It's just a tool, so I didn't take a lot of time to configure, I think we can improve it usage.

Project's architecture is custom, based on my experiences and documentation I found on Internet. Same for test's guidelines.
I'm really open to every constructive comments to improve myself.

I wish you a nice day.
