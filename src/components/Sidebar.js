import React,{useState,useEffect} from 'react'
//auto 30 secs only if changed.
//link click save to textarea
//edit button starts the timer again and you can continue typing after same
//show word,char count
//second vr:blacklist
//sentirment analysis
//post the text as tweet lol
export const Sidebar = ({stamps,onClick}) => {
    
    
    return (
        
        <div className='sidebar'>
            <ul>{
                stamps.map((x,i)=>{
                    return <li key={i} onClick={()=>onClick(i)}><a href='#'>{`${x.text}-${x.time}`}</a></li>
                })    
            }</ul>
        </div>
    )
}
