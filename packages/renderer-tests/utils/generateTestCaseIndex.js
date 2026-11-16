import fs from 'node:fs';
import path from 'node:path';
import { outputDir, outputFileExtension } from './common.js';

const testCaseFiles = fs.readdirSync(outputDir);

const testCaseModuleNames = testCaseFiles
    .filter((fileName) => fileName !== 'index.ts')
    .map((fileName) => fileName.substring(0, fileName.length - outputFileExtension.length));

const imports = testCaseModuleNames
    .map((moduleName) => `import { ${moduleName} } from './${moduleName}${outputFileExtension}';`)
    .join('\n');

const objectContent = testCaseModuleNames
    .map((moduleName) => `    ${moduleName}: ${moduleName}`)
    .join(',\n');

const result = `import type { Bracket } from '@tourneyview/common';
${imports}

export const testCases: Record<string, Bracket> = {
${objectContent}
};`;

const outputPath = path.resolve(outputDir, './index.ts');
fs.writeFileSync(outputPath, result);
console.log(`Writing output file ${outputPath}`);
