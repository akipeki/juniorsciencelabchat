import React, { useState, useEffect } from 'react';

const App = () => {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  const createNewChat = () => {
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
  }

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
    setMessage(null)
    setValue("")
  }

  const getMessages = async () => {
    const prompt = "You are a kindergarten teacher with good pedagogical skills and tendency to answer with metaphors and some inspirational extra information regarding the question. Answer with max 110 tokens. This time the question is:";
    const completeQuestion = `${prompt} ${value}`;

    const options = {
      method: "POST",
      body: JSON.stringify({
        message: completeQuestion
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const response = await fetch("http://localhost:8000/completions", options);
      const data = await response.json();
      setMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(currentTitle, value, message)

    if (!currentTitle && value && message) {
      setCurrentTitle(value)
    }

    if (currentTitle && value && message) {
      setPreviousChats(prevChats => (
        [...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: value
        }, {
          title: currentTitle,
          role: message.role,
          content: message.content
        }]
      ))
    }
  }, [message, currentTitle])

  console.log(previousChats)

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))

  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New chat</button>
        <ul className="history">
          <li>{uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}</li>
        </ul>
        <nav>
          <p className="credits">PEK-1</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>Junior Science Lab®</h1>}
        <ul className="feed">
          {currentChat.map((chatMessage, index) => <li key={index}>
            <p className='role'>{chatMessage.role}</p>
            <p>{chatMessage.content}</p>
          </li>)}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <div id="submit" onClick={getMessages}>➢</div>
          </div>
          <p className="info">
            Dear Juior Science Lab® student. Do you have any questions for me?
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
