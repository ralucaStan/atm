# Overview

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)
and uses [React Bootstrap](https://react-bootstrap.github.io). It uses basic CSS.

This project was developed using Chrome.


# Installation

Install dependencies with `npm i`.

Then you can run `npm start`.

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Project idea

This is an implementation for an ATM custom interface.

Card and money actions are simulated by clicking on the green arrows below the symbols.

Every screen has a route, as seen in `src/index.js`.
Screen components are to be found in `src/` folder and have an associated css file (ex: `Intro.js` & `Intro.css`).

The user can navigate backwards, to the next screen or abort flow using the ActionBar, a component found in `src/components/ActionBar.js` and used across the screens.

`src/config.js` has the links for this actions (back, next, abort) for every page.

A `src/api/api.js` is used in order to fake calls and response times. It uses Promises and time outs.
Every page has a method by which it validates the next step transition.

A basic visual implementation of the delay is also implemented.
