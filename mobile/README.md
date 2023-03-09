# Getting Started with mobile Prijavi app

Setup development environment following 'React Native CLI Quick start' tab from [this link](https://reactnative.dev/docs/environment-setup).

## Additional required setup (ARM only)
Project uses [FFMPEG based](https://github.com/tanersener/react-native-ffmpeg) library to compress videos. This library doesn't yet support ARM architecture. Android will handle it automatically but iOS/XCode won't. To resolve this, you simply need to install [Rosetta Compatibility layer](https://support.apple.com/en-us/HT211861) then start XCode in Rosetta compatibility regime (which is also described in the *'Which apps need Rosetta?'*  segment of the same document)

## Recommended setup

1. [Latest VSCode](https://code.visualstudio.com/download)
2. [Homebrew](https://brew.sh/) 
3. [NPM/NodeJS (Unofficial but useful post for ARM based MacOS machines)](https://justinwride.medium.com/install-node-and-npm-natively-on-apple-silicon-mac-m1-7432c826389b)
4. [Latest Android studio](https://developer.android.com/studio)
5. [Latest XCode with Command Line Tools](https://apps.apple.com/us/app/xcode/id497799835?mt=12)

## Available Scripts

In the project directory root, you can run:

### `yarn start`

Runs the **Metro** server necessary to run app in development mode and to have a set of development features.
Main feature of this server is hot-reload allowing you to see live changes in the app you make in code.
This is also your main log output.

### `yarn android`

This will build your **Android** app in development mode. If  **Metro** isn't started at this point it will start it for you.

### `yarn ios`

This will build your **iOS** app in development mode. If  **Metro** isn't started at this point it will start it for you.

### `yarn test`

This runs unit tests you have written on project.

### `yarn lint`

This will do a static code analysis of your code and notify you if something doesn't match project guidelines. To enable checks for that while you're writing code in VSCode editor, make sure you install the [ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for it.

## Learn More

//TODO
