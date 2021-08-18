import { useState } from "react";

import Header from "./components/Header";

import initialEmails from "./data/emails";

import "./App.css";

function App() {
  // Use initialEmails for state
  console.log(initialEmails);

  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [currentTab, setCurrentTab] = useState("inbox");

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

  const filterUnreadEmails = (emails) => {
    const filteredEmails = emails.filter((email) => !email.read);
    return filteredEmails;
  };

  const filterStarredEmails = (emails) => {
    const filteredEmails = emails.filter((email) => email.starred);
    return filteredEmails;
  };

  const applyFilters = (emails) => {
    let filteredEmails = emails;
    if (hideRead) {
      filteredEmails = filterUnreadEmails(filteredEmails);
    }

    if (currentTab === "starred") {
      filteredEmails = filterStarredEmails(filteredEmails);
    }

    return filteredEmails;
  };

  const unreadEmails = filterUnreadEmails(emails);
  const starredEmails = filterStarredEmails(emails);

  const emailsToRender = applyFilters(emails);

  console.log("current tab: ", currentTab);

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={currentTab === "inbox" ? "item active" : "item"}
            onClick={() => {
              setCurrentTab("inbox");
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadEmails.length}</span>
          </li>
          <li
            className={currentTab === "starred" ? "item active" : "item"}
            onClick={() => {
              setCurrentTab("starred");
            }}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={(event) => {
                setHideRead(event.target.checked);
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
