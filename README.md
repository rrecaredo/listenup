# listenup

## Some technical notes:

- I decided to use TypeScript because I like the extra layer of code-safety it brings.
- I used a kebap-case file naming convention just because it is a personal preference, but I am very used to other styles too (this style does not play well with React applications, for instance).
- I went full TDD on this. All the tests in this codebase are integration tests. Since the amount of side effects and Futures in the code I couldn't think of many places where to test unitarily. The services act more like sagas, with low business-logic footprint.
- Error handling is extremetely basic, there are a couple of try/catch blocks wraping the endpoints that are as lids in case something goes wrong. A better approach would be creatting a error middleware with some logging strategy).
- There is no Authentication/Authorization mechanism involved. In this area, the solution may vary depending on the needs: Is there a single sign-on service? Perhaps it could be reussable. JWT otherwise, API private keys for limited users, roled based acces control if required, etc.

## Assumptions:

- I assumed there is a strong correlation between `friends` and `plays` services. Because of this and for the sake of simplicity I assumed that both services have awareness of the same user universe. In other words, If user A is returned by `friends` service, I assume it is going to be present in `plays service` data-store regardless of whether the user has played a track or not (It would return an empty array if she/he hasn't). If this is not the case, then the code needs to be updated accordingly to manage these other scenarios.
