import { useState } from 'react'
const Statistics = (props) =>{
  return(

<>
      
      <h1>statistics</h1>

      <div>good  {props.good}</div>
      <div>neutral  {props.neutral}</div>
      <div>bad  {props.bad}</div>
      <div>all  {props.all}</div>
      <div>average  {props.average}</div>
      <div>positive  {props.positive}%</div>
    </>
  )
}
const App = () => {
  
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad;
  const average = all === 0 ? 0: (good - bad)/all;
  const positive = all ===0? 0: (good/all);
  // const [all, setAll] = useState(0)
  // const [average, setAverage] = useState(0)
  // const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const NewGood = good+1;
    setGood(NewGood);
    // const NewAll = all+1;
    // setAll(NewAll);
    // setPositive(((NewGood)/NewAll)*100);
    //  setAverage((NewGood - bad) /(NewAll));

  }
  const handleNeutralClick = () => { 
    const NewNeutral = neutral+1;
    setNeutral(NewNeutral);
    // const NewAll = all+1;
    // setAll(NewAll);
    // setPositive(((good)/NewAll)*100);
    // setAverage((good - bad) /(NewAll));

  }
  const handleBadClick = () => {
    const NewBad = bad+1;
    setBad(NewBad);
    // const NewAll = all+1;
    // setAll(NewAll);
    // setPositive(((good)/NewAll)*100);
    // setAverage((good - NewBad) /(NewAll));

}

  return (
    <>
    <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Statistics all = {all} good = {good} bad = {bad} neutral = {neutral} average = {average} positive = {positive}></Statistics>
</>
    
  )
}

export default App