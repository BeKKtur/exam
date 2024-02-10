export interface ApiQuote {
    id?:string
    author: string,
    category: string,
    quote: string
}

export interface Quote extends ApiQuote {
    [id:string]
}

export interface ApiQuotes {
    [id:string]: ApiQuote;
}

export interface AddQuote {
    Quote: ApiQuote
}