import { useState } from "react";

import Header from "./components/Header";

import initialEmails from "./data/emails";

import "./App.css";

function App() {
  // Use initialEmails for state
  console.log(initialEmails);

  const [emails, setEmails] = useState(initialEmails);

  const toggleRead = (target) => {
    const updatedEmails = emails.map((email) => {
      if (email.id === target.id) {
        console.log("email before update: ", email);
        return { ...email, read: !email.read };
      } else {
        return email;
      }
    });

    setEmails(updatedEmails);
  };

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              // onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {emails.map((email) => (
            <li className="email read">
              {console.log("email inside li: ", email)}
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={() => toggleRead(email)}
                />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  // onChange={??}
                />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
