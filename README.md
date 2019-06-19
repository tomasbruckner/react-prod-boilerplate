# React Scalable Production Ready Boilerplate
This boilerplate should provide you with most of the necessary tools you are going to need when developing React application for production. It is based on Create React App, but with extra tools like redux, translations, access management, notifications, loading, ErrorBoundary, REST api service, theming etc.

> Everything should be easy to replace and modified by your own needs.

## Get started
Simply run:

```bash
npm install
npm run start
```

You can use all commands available in Create React App.

#### Windows
You need to configure your npm to run npm scripts inside bash instead of cmd. You can do it by running:
```bash
npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"
```

Make sure you have [Git for Windows](https://git-scm.com/download/win) installed (64b version).

If you have 32b version of Git for Windows, use:

```bash
npm config set script-shell "C:\\Program Files (x86)\\git\\bin\\bash.exe" 
```

If you don't want to configure your npm, you can also use command below. This will not set version code in Help page and you won't be able to build the project with `npm run build`. To run it, you can use:

```bash
npm run start:windows
```


## NPM scripts
Boilerplate comes with some useful scripts preconfigured.
```bash
* lint - runs linting command
* lint: fix - tries to fix all possible linting errors
* start - strat application on port 3000
* start:windows - start application on port 3000, but current commit hash is not available (you can run regular start command on Windows, but you need to configure npm first. Use this only if you don't have any kind of bash installed on your computer)
* build - builds app to static files
* test:coverage - run snapshot tests with coverage
* test:unit - runs unit (snapshot) tests in watch mode
* test:unit:ci - you should run this task inside Continuous Integration pipeline
* test:e2e - runs Cypress tests
* test:e2e:ci - runs Cypress tests inside CI mode
* test:e2e:ci:start - you should run this task inside Continuous Integration pipeline
* cypress:open - opens Cypress GUI
* generate:license - generates license info for all your libraries to public/license folder
* version:update - updates current version of the project
```

## Design decisions
### Create React App
Create React App is a great project that solves a lot of problem for you. It installs right versions of dependencies and configures them for you. It configures Webpack, Jest, React, Eslint so it works correctly together. It still lacks some advanced features like translations, routing. That's why this boilerplate is based on the Create React App, but adds extra features that you might find useful. 

### Automatic formatter
Application uses [Prettier](https://prettier.io) for formatting with configuration defined in `package.json`. It is configured using `husky` so that it runs before every commit. This forces same style in whole application and removes all arguments.

Previously, I depended on IDEA formatting, but some developers are using different IDE and it becomes a problem. Also solutions like editorconfig are too forgiving and forces only small portion of the formatting to be the same (line endings, line length etc.).


Prettier has good integration to all popular IDEs (IDEA, VS Code etc.).

### CSS
Application uses [Styled Components](https://www.styled-components.com) library. It as a modern way how to write CSS that uses principle CSS-in-JS, which is designed for web components instead of MVC style of developing web application that was popular in the past.

### Theming
It is a common requirement, that you want to switch graphical themes either for client-specific requirements or you want to support option for your users to change application colors based on their own preference (eg. turn on Dark Mode). That's why this boilerplate supports it out of the box, you just have to defined the respective CSS values for the themes.

### React Components library
It is discouraged for developers to reinvent the wheel. That's why you should probably use some library that already implements most of the basic components, that you will probably need, e.g. button, modal, form, inputs etc. There are several options right now. It usually copies the name of the CSS framework that was used. So we have `react-strap` with Bootstrap, Material UI with `material-ui-core` and some other less popular.

I usually try to use the most mainstream and right now I believe it is Material UI Core. What you will notice in the application is, that I don't like to use components from this library directly. I prefer to have my own wrapper around almost every component. From my experience, library components rarely satisfies customer needs, so you will need to add some extra functionality based on the basic component. Or you just want to have easy way to specify styling for certain types of components in your application based on props. 

### Linter
Linting is a core tool that helps you prevent code smells and unnecessary bugs. Create React App comes with its own eslint configuration, but I find it too permissive. That's why eslint configuration in this project extends Create React App and adds business standard of `airbnb` eslint configuration. Airbnb configuration can prevent a lot of bugs like writing React lifecycle method `componentDidmount` instead of `componentDidMount`. It also enforces JavaScript best practices and makes the code much more readable.

### Translations
Application comes with `i18next` library with React integration to enable good developer experience and easy way to localize your application.

### Ducks
Application is based on React Redux pattern. It expects you to use REST Api in your application instead of GraphQL. Recently, GraphQL has become quite popular, but I don't believe it has advantages over REST Api in all situations. If you use GraphQL in your project, you should probably use Apollo Client instead of Redux (but it is a valid use case to use both).

What is a Duck? It is a pattern in Redux applications. It even comes from the name (re-dux => re-ducks). It is based on a premise that it is more useful to have your reducer, selector and action creators in one place instead of separate files. Personally, I like this pattern, because it makes the code more readable and it worked out well in my projects.

### File structure
There are basically two mainstream ways how to split your application. You can have all services in `services` folder, all pages in `pages` folder, all components in `components` folder, all reducers in `reducer` folder etc.
 The other way is to split it by application modules. So if you have Users module, you will have `users` folder that contains `userService`, `Users.page.js` etc.
 
 The first approach has scalability issues when the application grows larger. You will end up with `services` folder that has 100 files and it starts to get confusing in my opinion. That's why I prefer the second way. If your application is small to medium size, you can also choose the first approach. My experience is that in small application, it doesn't really matter what type of structure you choose.
 
### Notifications
Notifications are something, you will also most probably need. That's why I find it unnecessary to reimplement them every single time and I added them to this boilerplate. You just need to dispatch notification in `NotificationDuck` and everything works.

### Caching
Very common problem with Redux application is that it renders unnecessary your whole application. You probably wouldn't notice it at the start, but when your application grows and components become more complex, you will feel the performance  problems very soon.

What is a common problem? In your Redux selector, you do something like this:

```javascript
export const getUsersId = (state) => getOwnState(state).users.map(user => user.id);
```

Looks perfectly reasonable, right? But the problem is, that if you have connected React component that uses this Redux selector, than this components renders every time no matter if it extends `PureComponent` or not. Why? Because `map` creates new array every time. And that is a problem. You will either have to implement your own `componentWillUpdate` lifecycle method and do some deep comparison of the arrays or you can use something like `reselect` library.

Reselect is very simple library, but it can have great impact on your performace. Basic use case works like this:

you define what parts of a redux state you want to use (with passing selector functions as arguments) and you pass one function, that gets results of these selector and should return what you want. You can use map, filter or whatever you want, it doesn't matter. When you call this reselector function for the first time, it caches all parameters and return value. When you call it the second time, it jut checks that function arguments are the same (it does shallow equality) and return cached value. Because of that, `map` in `getUsersId` example will be called only once for same `users` and it will return always the same array. Now `PureComponent` can prevent from re-rendering big part of your application if you are using Redux selector in some top node of your component tree.

Another way how to prevent unnecessary work is to use memoization not only with Redux state, but also in components method or some utils library. For this, I use `memoizee` library, that works similarly to `reselect`, but is not so tightly connected to Redux selectors. It would be possible to use `reselect` for everything, but I prefer to use libraries just as they have been designed, instead making workarounds or bending the libraries to suite your needs. 

### License checker
It is a quite common requirement for your clients to ask for a list of libraries and their type of license. That's why there is prepared npm task that generates these files and puts them inside `public` folder. If you don't want them to be publicly available, you can put them anywhere you want.

### Version number
Also another quite common requirement. You want to be able to check what version of frontend are looking at right now. Version update is done usually during the Continuous Integration pipeline, but the value is available in your React config file, so you can display it in any way you want.

### React Helmet
`React Helmet` is a great library for `<head>` html tag manipulation. It makes manipulating title very easy.

## Skipped libraries
In this part, I would like to discuss some design choices I have made by not including some popular libraries.

### Virtualization library
Virtualization is a technique that lets you render only visible part of a huge list. E.g. user should be able to access 1000 of items in a list, but when he scrolls he only sees 20. Virtualization library like `react-window` provides you with a way to only render 20 visible items, to the performance of the app is much better.

Virtualization is also often used when using the infinite scrolling technique.

I have used this library in several projects, but personally I don't see it as a common use case and you can in most cases solve it by different UX decisions. If you need it anyway, it is quite easy to implement it to Material UI Core library.

### Recompose + Rambda
Very hyped libraries a year ago. My personal experience is that it enhances the developer experience, because it is quite fun to use. You can write functional JavaScript much easier.

On the other hand, it adds extra level of abstraction. Extra library that you need to learn and I don't see direct benefits. If you write something in 10 lines, usually it is not much shorter when using especially Rambda library. And it is much harder to debug.

From my perspective, you don't make things easier, you just make them different. It doesn't save lines of code and it confuses people that do not know the api of these libraries.

### 
