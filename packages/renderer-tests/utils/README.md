# Development Utilities

To ease the maintenance burden of this package, each test case included with this package has been created using data 
from real tournaments. The scripts in this directory can be used to re-generate the test cases. 
This may need to be done if breaking changes are made to the bracket data structure, for instance.

## Adding test cases

Add test cases by modifying the `generateTestCases.js` script. Each test case has the following properties:

- `id`: Used to name the test case file and the constant it contains. Must be unique. Must be a valid JavaScript 
  variable name (which primarily means it can't start with a number or contain spaces).
- `name`: A brief human-readable description for the test case.
- `importer`: Bracket importer used to retrieve the data for the test case. See `@tourneyview/importer` for more.
- `importOpts`: Options passed to `importer` to retrieve bracket data. See below for details.

### Importing Brackets

To import a bracket from start.gg with the URL `https://www.start.gg/tournament/test-tournament/event/test-event/brackets/1111/2222`,
the `importOpts` property must be set as such:
```js
{
    phaseId: 1111,
    phaseGroupId: 2222
}
```

For double elimination brackets, the `matchType` parameter should be added, with a value of 
`ContainedMatchType.ALL_MATCHES`, `ContainedMatchType.WINNERS` or `ContainedMatchType.LOSERS`.

To import bracket data from other sources, consult the source of `@tourneyview/importer`.

### Progress Removal

It is assumed that all test cases are created with fully completed brackets. As we may wish to test how our rendering 
logic reacts to unfinished brackets and test state transitions when a bracket is updated, we create variants of each 
test case where some progress has been artificially removed.
These variants are defined in the `progressRemovalSteps.ts` file of this project's source.

Each bracket type should have a test case with variants where at least one match changes state from `NOT_STARTED` to 
`IN_PROGRESS` and then `COMPLETED`.

## Generating Test Cases

Remember that responses from the generation process are cached in the `testCaseCache` directory, which is created 
automatically in this directory. This directory should be cleared after the importer is updated.

To generate source files for all test cases, run the following in this directory:
```shell
STARTGG_API_KEY=yourApiKey node generateTestCases.js
```

To generate a source file for a single test cases, add the ID of the test case as a parameter:
```shell
STARTGG_API_KEY=yourApiKey node generateTestCases.js testCaseName
```

After adding new test cases, re-generate the index file so they can be used:
```shell
node ./generateTestCaseIndex.js
```
