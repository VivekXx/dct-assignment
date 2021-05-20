import './App.css';
import {Header} from './components/Header'
import {Sidebar} from './components/Sidebar'
import {Blacklist} from './components/Blacklist'
import Sentiment from 'sentiment'
import React,{useState,useEffect} from 'react'
function App() {
  
  if(!localStorage.text)localStorage.text=''
  if(localStorage.stamps==undefined)localStorage.stamps=[]
  // if(!localStorage.blacklist)localStorage.blacklist=[]
  const [text,setText] = useState(localStorage.text)
  const [word,setWord] = useState(0)
  const [char,setChar] = useState(0)
  const [timer,setTimer]  = useState(true)
  const [blacklist,setBlacklist] = useState([])
  const [sent,setSent] = useState()
  let temptimer = true
  let currtext
  let newStamp
  let lastText = localStorage.text
  let stamplist = localStorage.stamps
  const sentiment = new Sentiment()
  const [stamps,setStamps] = useState(JSON.parse(stamplist))
  let lastStamps=JSON.parse(stamplist)
  const onChange = (e) => {
    const curr = e.target.value
    if(curr[curr.length-1]==' ' && curr.length!=1){
      const temp = curr.slice(0,curr.length-1)
      console.log('inside',temp,temp.split(' ')[temp.split(' ').length-1])
      console.log(blacklist)
      if(blacklist.some((x)=>x==temp.split(' ')[temp.split(' ').length-1])){
        setText(temp.split(' ').slice(0,temp.split(' ').length-1).join(' '))
        currtext = temp.split(' ').slice(0,temp.split(' ').length-1).join(' ')
        localStorage.text = temp.split(' ').slice(0,temp.split(' ').length-1).join(' ')
        console.log('inside if',temp.split(' ').slice(0,temp.split(' ').length-1).join(' '))
        return
      }
    }
    setText(()=>{
      currtext = e.target.value
      localStorage.text=e.target.value
      return currtext
    })
    
  }
  const getSentiment = (score) => {
    if(score>4)return 'Very Happy'
    else if(score > 0 ) return 'Happy'
    else if(score==0) return 'Neutral'
    else if(score<-4) return 'Very Unhappy'
    else return 'Unhappy' 
  }
  const reset = () => {
    setText('')
    localStorage.text=''
    currtext=''
    setStamps(()=>[])
    stamplist=[]
    localStorage.stamps=[]
    
  }
  const onClick = (i) => {
    
    setText(()=>stamps[i].text)
    localStorage.text=stamps[i].text
    currtext = stamps[i].text
  }
  function timeouts(){
    
    const temp = document.getElementById('textfield').value
    newStamp = {text:temp,time:Date().toString()}
    stamplist=[...stamplist,newStamp]
    if(newStamp.text!=lastText && newStamp.text!=''){
      lastText=temp
      setStamps([...lastStamps,newStamp])
      lastStamps = [...lastStamps,newStamp]
      localStorage.stamps=JSON.stringify(lastStamps)
    }
    
    setTimeout(timeouts,5000)
  }
  
  useEffect(()=>{
    timeouts()
  },[])
  useEffect(()=>{
    setWord(()=>text[text.length-1]==-' ' || text.length===0?text.split(' ').length-1:text.split(' ').length)
    setChar(()=>text.length)
    setSent(()=>sentiment.analyze(text)) 
  },[text])
  return (
    <div>
      <div className='container'>
          <Header char={char} word={word} text={text} onChange={onChange} />
          {/* <button onClick={()=>reset()}></button> */}
          <Sidebar onClick={onClick} stamps={stamps}/>
          <Blacklist blacklist={blacklist} setBlacklist={setBlacklist}/>
          
      </div>
      {sent!=undefined && <h1 className='sentiment'>Sentiment : {getSentiment(sent.score)}</h1>}
    </div>
  );
}

export default App;
