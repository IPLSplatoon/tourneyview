export type MatchQueryParameterValue = string | number;

export type MatchQueryResult = Record<string, MatchQueryParameterValue>;

export type MatchQueryParameter = MatchQuerySelectParameter | MatchQueryNumberRangeParameter | MatchQueryStaticParameter;

interface BaseMatchQueryParameter {
    key: string
    name: string
    type: string
}

export interface MatchQuerySelectParameter extends BaseMatchQueryParameter {
    type: 'select'
    options: MatchQueryOption[]
}

export interface MatchQueryStaticParameter extends BaseMatchQueryParameter {
    type: 'static'
    value: MatchQueryParameterValue
}

export interface MatchQueryNumberRangeParameter extends BaseMatchQueryParameter {
    type: 'numberRange'
    min: number
    max: number
}

export interface MatchQueryOption {
    value: MatchQueryParameterValue
    name: string
    getParams?(): Promise<MatchQueryParameter[]> | MatchQueryParameter[]
}
