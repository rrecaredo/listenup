# listenup

## Some technical notes:

- I decided to use TypeScript because I like the extra layer of code-safety it brings.
- I used a kebap-case file naming convention just because it is a personal preference, but I am very used to other styles too (this style does not play well with React applications, for instance).
- I went full TDD on this. All the tests in this codebase are integration tests. Since the amount of side effects and Futures in the code I couldn't think of many places where to test unitarily. The services act more like sagas, with low business-logic footprint.
- There is no Authentication/Authorization mechanism involved. In this area, the solution may vary depending on the needs: Is there a single sign-on service? Perhaps it could be reussable. JWT otherwise, API private keys for limited users, roled based acces control if required, etc.
- If Friends/Plays services or their Schemas are to grow, a Graphl API could make more sense in order to give the consumers more power and control over the data they want.
- I have been working directly on master. I would normally create and work upon feature branches and merge them once the work is done and properly tested.

## Instructions

- There are the typical `npm` scripts in place, *build* for transpiling the code, *start* for starting it (already transpiled one), *dev* for local development and *test* for running all the tests. 
