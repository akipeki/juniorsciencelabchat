import { useState, useEffect}  from 'react'

const App = () => {
  const [ value, setValue] = useState(null)
  const [ message, setMessage ] = useState(null)
  const [ previousChats, setPreviousChats] = useState([])
 
const getMessages = async () => {
  const options = {
    method: "POST",
    body : JSON.stringify({
     // message: "hello how are you?"
        message: value
    }),
    headers: {
      "Content-Type": "application/json"
    }

  }
  try {
    const response = await fetch('http://localhost:8000/completions', options)
    const data = await response.json()
    setMessage(data.choices[0].message)
  } catch (error) {
    console.error(error)
  }
}

console.log(message)

  return (
    <div className="app">
   <section className="side-bar">
    <button>+ New chat</button>
    <ul className="history">
      <li>BLUGH</li>
      </ul>
    <nav>
      <p className="credits">Made by Peki</p>
    </nav>
   </section>
   <section className="main">
    <h1>PekiGPT</h1>
    <ul className="feed">

    </ul>
    <div className="bottom-section">
      <div className="input-container">
        <input value={value} onChange={(e) => setValue(e.target.value)}/>
        <div id="submit" onClick={getMessages}>➢</div>
      </div>
      <p className="info">
      Chat GPT Mar 14 Version. Free Research Previev. 
      Our Goal is to make AI systems more natural and safe to interact with.
      Your feedbackj will help us improve.
      </p>
    </div>
   </section>
    </div>
  );
}

export default App;
