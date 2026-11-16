import { StartggImporter } from '@tourneyview/importer';
import { ContainedMatchType } from '@tourneyview/common';
import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs';
import { bracketJsonToScript } from './bracketJsonToScript.js';
import { obfuscateBracket } from './obfuscateBracket.js';
import { outputDir, outputFileExtension } from './common.js';

const startggApiKey = process.env.STARTGG_API_KEY;
if (startggApiKey == null) {
    console.log('Please provide a start.gg API key using the STARTGG_API_KEY environment variable');
    process.exit(1);
}

const startggImporter = new StartggImporter(startggApiKey);

const testCases = [
    {
        id: 'DoubleElimLargeGroupStage',
        name: 'Large DE Group Stage',
        importer: startggImporter,
        importOpts: {
            phaseId: 2277841,
            phaseGroupId: 3299652,
            matchType: ContainedMatchType.ALL_MATCHES
        }
    },
    {
        id: 'DoubleElim',
        name: 'Double Elimination',
        importer: startggImporter,
        importOpts: {
            phaseId: 2131690,
            phaseGroupId: 3106483,
            matchType: ContainedMatchType.ALL_MATCHES
        },
    },
    {
        id: 'DoubleElim32Team',
        name: 'Large Double Elimination',
        importer: startggImporter,
        importOpts: {
            phaseId: 1149531,
            phaseGroupId: 1783692,
            matchType: ContainedMatchType.ALL_MATCHES
        },
    },
    {
        id: 'SingleElim1Round',
        name: 'Single Elimination (1 Round)',
        importer: startggImporter,
        importOpts: {
            phaseId: 2389774,
            phaseGroupId: 3446260
        }
    },
    {
        id: 'SingleElim',
        name: 'Single Elimination',
        importer: startggImporter,
        importOpts: {
            phaseId: 2064075,
            phaseGroupId: 3019539
        }
    },
    {
        id: 'RoundRobin',
        name: 'Round Robin',
        importer: startggImporter,
        importOpts: {
            phaseId: 983958,
            phaseGroupId: 1555326
        },
    },
    {
        id: 'RoundRobinSmall',
        name: 'Small Round Robin',
        importer: startggImporter,
        importOpts: {
            phaseId: 2131701,
            phaseGroupId: 3106531
        }
    },
    {
        id: 'SwissSmall',
        name: 'Small Swiss',
        importer: startggImporter,
        importOpts: {
            phaseId: 1149529,
            phaseGroupId: 1783664,
            roundNumber: 4
        }
    },
    {
        id: 'Swiss',
        name: 'Swiss',
        importer: startggImporter,
        importOpts: {
            phaseId: 2456778,
            phaseGroupId: 3531782,
            roundNumber: 5
        }
    }
];

const testCaseCacheDir = path.resolve(import.meta.dirname, './testCaseCache');
if (!fs.existsSync(testCaseCacheDir)) {
    fs.mkdirSync(testCaseCacheDir);
}

function writeOutputFile(bracket, testCase) {
    const outputPath = path.resolve(outputDir, `./${testCase.id}${outputFileExtension}`);
    console.log(`${testCase.name}: Writing output file ${outputPath}`);
    fs.writeFileSync(outputPath, bracketJsonToScript(bracket, testCase.id));
}

async function fetchTestCase(testCase) {
    const cachePath = path.resolve(testCaseCacheDir, `./${testCase.id}.json`);
    if (fs.existsSync(cachePath)) {
        console.log(`${testCase.name}: Using cached response`);
        return JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    }

    console.log(`${testCase.name}: Fetching bracket data`);
    const importedBracket = await testCase.importer.getMatches(testCase.importOpts);
    console.log(`${testCase.name}: Caching response (${cachePath})`);
    fs.writeFileSync(cachePath, JSON.stringify(importedBracket, null, 4));
    return importedBracket;
}

(async () => {
    const selectedTestCaseId = process.argv[2];
    const selectedTestCases = selectedTestCaseId == null
        ? testCases
        : testCases.filter((testCase) => testCase.id.toLowerCase() === selectedTestCaseId.toLowerCase());

    console.log(`Generating ${selectedTestCases.length} test case${selectedTestCases.length === 1 ? '' : 's'}...`);

    await Promise.all(selectedTestCases.map(async (testCase) => {
        const originalBracket = await fetchTestCase(testCase);
        const obfuscatedBracket = obfuscateBracket(originalBracket, testCase.id, selectedTestCases.length === 1);
        obfuscatedBracket.name = testCase.name;
        writeOutputFile(obfuscatedBracket, testCase);
    }));
})().catch((e) => {
    console.error(e);
});
