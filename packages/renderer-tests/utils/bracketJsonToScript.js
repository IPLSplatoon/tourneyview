import { BracketType, MatchState, ContainedMatchType, MatchType } from '@tourneyview/common';

// this is a little terrible, but it's ok

export function bracketJsonToScript(bracket, constantName) {
    const fileHeader = `import type { Bracket } from '@tourneyview/common';
import { BracketType, ContainedMatchType, MatchState, MatchType } from '@tourneyview/common';

export const ${constantName}: Bracket = `;

    const fileFooter = ';';

    const newBracket = {
        ...bracket,
        type: formatEnumValue(BracketType, 'BracketType', bracket.type),
        matchGroups: bracket.matchGroups.map((group) => ({
            ...group,
            containedMatchType: formatEnumValue(ContainedMatchType, 'ContainedMatchType', group.containedMatchType),
            matches: group.matches.map((match) => {

                return ({
                    ...match,
                    type: formatEnumValue(MatchType, 'MatchType', match.type),
                    state: formatEnumValue(MatchState, 'MatchState', match.state)
                });
            })
        }))
    };

    const jsonContent = JSON.stringify(newBracket, null, 4);

    // remove quotes from property names
    const unquotedContent = jsonContent.replace(
        /^[\t ]*"[^:\n\r]+(?<!\\)":/gm,
        (match) => match.replace(/"/g, ''));

    // find enum values
    const withReplacedEnums = unquotedContent.replace(
        enumFinderRegex,
        (_, type, comma) => type + comma
    );

    // replace double quotes with single quotes
    const withReplacedQuotes = withReplacedEnums.replace(
        / "(.*)"(,?)$/gm,
        (_, stringContent, comma) => ` '${stringContent.replaceAll('\\"', '"').replaceAll("'", "\\'")}'${comma}`
    );

    return fileHeader + withReplacedQuotes + fileFooter;
}

const enumSentinelValue = 'RAW_ENUM__';
const enumFinderRegex = new RegExp(`"${enumSentinelValue}(.*)"(,?)$`, 'gm');

function formatEnumValue(type, typeName, value) {
    if (value == null) return value;

    const enumMember = type[value];
    if (enumMember == null) {
        throw new Error(`Type "${typeName}" has no member named "${value}"`);
    }

    return `${enumSentinelValue}${typeName}.${type[value]}`;
}


