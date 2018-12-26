export type ParseTextResult = {
    closed: string
    remaining: string
    old: string
}

export const parseText = (text: string): ParseTextResult => {
    const result = text.split('').reduce( (a, b) => {
    
        let _open = a.open
        let _closed = a.closed
    
        if( b === '{') {
            _open += 1
        }
    
        if(b === '}') {
            _closed += 1
        }
    
        let d = _closed <= _open ? `${a.n}${b}` : a.n 
        let e = _closed == _open ? `${a.r}${b}` : a.r
    
        return {
            n: d,
            r: e,
            open: _open,
            closed: _closed 
        }
    }, { n: "", r: "" , open: 0 ,  closed: 0 } )

    return {
        closed: result.n,
        remaining: result.r,
        old: text
    }
}

