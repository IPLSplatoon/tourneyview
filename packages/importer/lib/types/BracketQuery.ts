export type BracketQueryParameter = BracketQuerySelectParameter | BracketQueryNumberRangeParameter;

interface BaseBracketQueryParameter {
    key: string
    name: string
    type: string
}

export interface BracketQuerySelectParameter extends BaseBracketQueryParameter {
    type: 'select'
    options: BracketQueryOption[]
}

export interface BracketQueryNumberRangeParameter extends BaseBracketQueryParameter {
    type: 'numberRange'
    min: number
    max: number
}

export interface BracketQueryOption {
    value: string
    name: string
    params: BracketQueryParameter[]
}