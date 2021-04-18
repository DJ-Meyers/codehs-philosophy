# codehs-philosophy

## Running the Application

### Installation and Setup

[Install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm) if you haven't already.

Verify your versions of Node.js and npm by running `node -v` and `npm -v` respectively in your terminal.

Install the necessary dependencies with `npm install`

### Scripts

Run `npm start https://en.wikipedia.org/wiki/Valid_Wikipedia_Url` in your terminal.

Alternatively, you can run `npm run test` to see the output of the tests or `npm run random` to test the script on a random Wikipedia article.

## Technical Details

### Project Configuration

This project was built with Node.JS and TypeScript because I'm more familiar with the tools and libraries available in JavaScript than in Python. I chose to write the project in TypeScript rather than vanilla JavaScript because I feel that it makes Javascript a much better language for collaboration by guaranteeing type safety and overall leading to more Object-Oriented code. I set up my project with ESLint and Airbnb's [Typescript Style Guide](https://github.com/airbnb/javascript) to enforce consistent style that would help a team maintain readable code.

### Architecture

I separated the code into classes based on responsibility. The CliReader class handles and validates User Input, the WikipediaNavigator class handles the recursive search of Wikipedia links and handles the exit conditions, and the PageParser is responsible for scraping a given URL to find the first _valid_ Wikipedia link. While all of this logic could have been stored in one file, it would have been far less maintainable and testable. While tests were not part of the requirements, I found them to be very helpful for detecting regressions in my PageParser class when trying to account for edge cases. I used Mocha/Chai for writing tests.

### Webscraping

I used the npm package Cheerio to do the webscraping portion of this project. The greatest challenge of this assignment was accounting for edge cases. Some of the edge cases were:

- Disambiguations. I avoided these by only looking at `<p>` tags without a class attribute. Normal body paragraphs on a Wikipedia page have no classes.

- Parenthetical links. We want to ignore links to pronunciation guides and other parentheticals or else the search will not work properly. I avoided these by counting pairs of parenthesis up until the current link that we are validating. This could lead to weird edge cases with emoticons or `(` and `)` characters being used outside fo parenthetical statements.

- Super tags. The search will also break if we are looking at super-script links, which point to sources in the article or indicate that a citation is needed. These are handled with the same idea as links within parentheses, but checking for `<sup` and `</sup` instead of `(` and `)`.

- Loops. For example, if we start at Abstraction, we the following loop: Abstraction &rarr; Rule of Inference &rarr; Logical Form &rarr; Logic &rarr; Rule of Inference, creating an endless cycle. While this will eventually error out when reaching the Max_Hops value, I used memoization to exit out of this condition when we detect a previously visited link.

In order to find a lot of these edge cases, I made great use of the `/Special:Random` url to find pages that had a disambiguation, but not parentheses or vice versa.
