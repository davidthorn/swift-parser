export type ParseTextResult = {
    closed: string
    remaining: string
    old: string
    completed: boolean
}

export const searchForClosingBracket = (bracket: '(' | '{' ,  search: string): { matchedString?: string , remainingString: string } => {
    let chars = search.split('')

    let openBracket = bracket === '(' ? '(' : '{'
    let closeBracket = bracket === '(' ? ')' : '}'

    type data = {
        matched: string, /// add the char to this when open > closed
        remaining: string, /// add the char to this when open == closed but not equal to 0
        ignored: string, /// add the char to this when open, closed equal 0 
        open: number, /// increment when finding a (
        closed: number /// increment when finding a )
    }

    const obj: data = {
        matched: "",
        remaining: "",
        ignored: "",
        open: 0,
        closed: 0
    }

    const result = chars.reduce((main, current) => {
        
        let m = main.matched
        let r = main.remaining
        let i = main.ignored
        let o = main.open
        let c = main.closed

        switch(current) {
            case openBracket:
                if(o > c) {
                    m += current
                    o += 1
                } else if(o === 0 && c === 0) { /// we have found the first bracket
                    o += 1
                } else if (o === c) {
                    r += current
                } else {
                    i += current
                }
            break;
            case closeBracket:
                if(o === (c + 1)) {
                    c += 1 /// we have found the closing one
                } else if(o === 0 && c === 0) { /// we have found the first bracket
                    throw new Error('this really should not happen dude!')
                } else if(o === c ) { /// we have found the first bracket
                    r += current  
                } else {
                    m += current
                    c += 1
                }
            break;
            default:
                if(o === 0 && c === 0) {
                    i += current
                } else if(o === c ) { 
                    r += current  
                } else {
                    m += current
                }
            break
        }

        return {
            matched: m,
            remaining: r,
            ignored: i,
            open: o,
            closed: c
        }
    }, obj)
   
    return {
        matchedString: result.matched.trim(),
        remainingString: result.remaining
    }
}

export const parseText = (text: string): ParseTextResult => {
    const result = text.split('').reduce( (a, b) => {

        if(a.completed === true) {
            return {
                ...a,
                r: `${a.r}${b}`
            }
        }

        let d: string = ""
        let e: string = ""
        let _open = a.open
        let _closed = a.closed
        let isCompleted: boolean = a.completed
    
        if( b === '{') {
            _open += 1
        }
    
        if(b === '}') {
            _closed += 1
        }

        if(_closed > _open && b === '}') {
            isCompleted = true
            d = a.n
        }

        if(!isCompleted) {
            d = `${a.n}${b}`
        } else {
            e = `${a.r}`
        }
    
        return {
            n: d,
            r: e,
            open: _open,
            closed: _closed,
            completed: isCompleted
        }
    }, { n: "", r: "" , open: 0 ,  closed: 0 , completed: false } )

    return {
        closed: result.n,
        remaining: result.r,
        old: text,
        completed: result.completed
    }
}

