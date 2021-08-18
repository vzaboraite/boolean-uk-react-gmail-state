import { useState } from "react";

import Header from "./components/Header";

import initialEmails from "./data/emails";

import "./App.css";

function App() {
  // Use initialEmails for state
  console.log(initialEmails);

  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);

  const toggleRead = (targetEmail) => {
    const updatedEmails = emails.map((email) => {
      if (email.id === targetEmail.id) {
        /* Version 1:*/
        return { ...targetEmail, read: !targetEmail.read };

        /* Version 2:*/
        // const updatedEmail = {
        //   ...targetEmail,
        //   read: !targetEmail.read
        // }
        // return updatedEmail;
      } else {
        return email;
      }
    });

    setEmails(updatedEmails);
  };

  const toggleStar = (targetEmail) => {
    const updatedEmails = emails.map((email) => {
      if (email.id === targetEmail.id) {
        return { ...targetEmail, starred: !targetEmail.starred };
      } else {
        return email;
      }
    });

    setEmails(updatedEmails);
  };

  const getUnreadEmails = (emails) => {
    const filteredEmails = emails.filter((email) => !email.read);
    return filteredEmails;
  };

  let emailsToRender = hideRead ? getUnreadEmails(emails) : emails;

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
              checked={hideRead}
              onChange={() => {
                setHideRead(!hideRead);
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {emailsToRender.map((email) => (
            <li key={email.id} className={email.read ? "email read" : "email"}>
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
                  onChange={() => toggleStar(email)}
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
