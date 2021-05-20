import React,{useState} from 'react'

export const Blacklist = ({blacklist,setBlacklist,text,changeText}) => {
    
    const [input,setInput] = useState('')
    const onSubmit = (e) => {
        e.preventDefault()
        if(!blacklist.some((x)=>x===input))setBlacklist(()=>[...blacklist,input])
    }
    return (
        <div>
            <h2>BlackListed Words</h2>
            <form onSubmit={(e)=>onSubmit(e)}>
                <input placeholder='Enter word to blacklist' onChange={(e)=>setInput(e.target.value)} value={input}/>
            </form>
            
            <ul>
                {
                    blacklist.map(x=><li>{x}</li>)
                }
            </ul>
        </div>
    )
}
