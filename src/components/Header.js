import React,{useState,useEffect} from 'react'

export const Header = ({text,onChange,word,char}) => {
    
    
   
    const onSubmit = (e) => {
        e.preventDefault()
        console.log('text:',text)
    }
    
    return (
        <div className='header'>
            <form onSubmit={onSubmit}>
                <textarea id='textfield' placeholder='Enter text here...' value = {text} onChange={(e)=>onChange(e)}></textarea>
                
            </form>
            <div className='counts'>
                <h2>word count : {word}</h2>
                <h2>char count : {char}</h2>
            </div>
        </div>
    )
}
