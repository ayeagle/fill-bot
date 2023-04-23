import styles from "./CoreApp.module.css";
import { useEffect, useState } from "react";
import * as icons from "react-icons/fa";
// import { isConditionalExpression } from 'typescript';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthenticationButton from "./AuthenticationButton";
import { useLocation } from "react-router-dom";
import { withAuthenticationRequired, useAuth0, User } from "@auth0/auth0-react";
import EditBlockedDomains from "./EditBlockedDomains";
import React from "react";

let normalName: string;
declare var window: any;
const chrome = window.chrome;
let logo: any;
let img: any;
let allInputs: any;
let allEmailInputs: HTMLInputElement[] = [];
let usedEmails: Array<string> = [];
let blockedDomains: Array<string> = [];
let secSubVal: any;
let temp: any;
//still need to actually write the permanent array
//somewhere that is... permanent lol

console.log("COREapp has loaded");

function CoreApp() {
  const location = useLocation();
  const domainElements = window.location.href.split("//")[1].split(".");
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const [emailOnPage, setEmailOnPage] = useState(false);
  const [emailOnFile, setEmailOnFile] = useState(true);
  const [email, setEmail] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [emailFront, setEmailFront] = useState("");
  const [emailBack, setEmailBack] = useState("");
  const [responsePrompt, setResponsePrompt] = useState("");
  const [subVal, setSubVal] = useState("");
  const [waiter, setWaiter] = useState(false);
  const [dismiss, setDismiss] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(isAuthenticated);
  const [isSettingGmailFilter, setIsSettingGmailFilter] = useState(false);

  const [promptWarn, setPromptWarn] = useState(false);
  const [editBlockedDomains, setEditBlockedDomains] = useState(false);
  // const [editBDChecks, setEditBDChecks] = useState<boolean[]>([]);
  const [editBDChecks, setEditBDChecks] = useState(Array(10).fill(false));
  const [gmailCheck, setGmailCheck] = useState("");
  const [targetNode, setTargetNode] = useState<HTMLElement | null>(null);

  const [emailFilterString, setEmailFilterString] = useState("");

  useEffect(() => {
    if (promptWarn) setPromptWarn(false);
  }, [promptWarn]);
  console.log("PROMPT WARN: " + promptWarn);
  // const [allInputs, setAllInputs] = useState()
  //console.log("this bitch be the perma array")
  //console.log(usedEmails)

  //options for do not show logo piece button

  // add animations for copied to clipboard
  //login stuff
  //stuff

  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////

  const copyToClipboard = () => {
    navigator.clipboard.writeText(subVal);
  };
  //////////////////////////////////////////
  //////////////////////////////////////////

  const inputChecker = (checkVal: string, searchVal: string) => {
    console.log("inputChecker");
    return checkVal.toUpperCase().indexOf(searchVal.toUpperCase()) !== -1;
  };
  //////////////////////////////////////////
  //////////////////////////////////////////

  const doesExist = (checkArray: any, value: any) => {
    for (let i = 0; i < checkArray.length; i++) {
      if (checkArray[i] === value) {
        return true;
      }
    }
    return false;
  };
  //////////////////////////////////////////
  //////////////////////////////////////////

  useEffect(() => {
    setInterval(() => {
      setWaiter(true);
      // fill()
    }, 500);
  }, [waiter]);
  //////////////////////////////////////////
  //////////////////////////////////////////

  const validEmailCheck = (email: string) => {
    console.log("validEmailCheck");
    const checker = (val: string) => {
      return email.toUpperCase().indexOf(val);
    };
    if (
      checker("@") === -1 ||
      (checker("@GMAIL.COM") === -1 &&
        checker("@YAHOO.COM") === -1 &&
        checker("@HOTMAIL.COM") === -1)
    ) {
      setResponsePrompt("invalid email");
      setPromptWarn(true);
      return false;
    }
    setResponsePrompt("");
    chrome.runtime.sendMessage({ type: "setEmail", email: email });
    return true;
  };
  //////////////////////////////////////////
  //////////////////////////////////////////

  const registerEmail = () => {
    console.log("registerEmail");
    console.log("registerEmail");
    console.log(tempEmail);
    console.log(tempEmail.length);
    console.log(email);

    let emailVal: string;
    if (tempEmail === "" || tempEmail.length < 10) {
      emailVal = email;
    } else {
      emailVal = tempEmail;
    }
    if (validEmailCheck(emailVal)) {
      configEmailDetails(emailVal);
      setSettingsOpen(false);
    }

    console.log(emailVal);
    console.log("emailVal");
    console.log("registerEmail");
  };
  //////////////////////////////////////////
  //////////////////////////////////////////

  const pageContainsEmailFields = (inputsArray: Array<any>) => {
    console.log("pageContainsEmailFields");
    inputsArray.forEach((input, index) => {
      if (
        (inputChecker(input.name, "EMAIL") ||
          inputChecker(input.placeholder, "EMAIL") ||
          inputChecker(input.type, "EMAIL")) &&
        input.id !== "no_fill_email_input"
      ) {
        if (inputsArray.length > index + 1) {
          if (
            !inputChecker(inputsArray[index + 1].name, "PASSWORD") &&
            !inputChecker(inputsArray[index + 1].placeholder, "PASSWORD") &&
            !inputChecker(inputsArray[index + 1].type, "PASSWORD")
          ) {
            execPageContainsEmailFields(input);
          }
        } else {
          execPageContainsEmailFields(input);
        }
      }
    });
  };
  //////////////////////////////////////////
  //////////////////////////////////////////

  async function execFill() {
    chrome.runtime.sendMessage(
      { type: "getCurrentSubVal" },
      (response: any) => {
        console.log("the async get email method was invoked");
        console.log(response);
        console.log(response.currentSubVal);

        fill(response.currentSubVal);
      }
    );
  }

  async function fill(subby: any) {
    console.log("fill");
    console.log("fill");
    console.log("fill");
    console.log(subby);
    console.log(subby);
    console.log(subby);

    if (!doesExist(usedEmails, subby)) {
      chrome.runtime.sendMessage(
        { type: "addUsedEmail", usedEmail: subby },
        (response: any) => {
          usedEmails = response.usedEmails;
        }
      );
    }

    if (allEmailInputs.length > 0 && allEmailInputs[0] != null) {
      const targetElement = document.getElementById(
        allEmailInputs[allEmailInputs.length - 1].id
      );
      if (targetElement != null) {
        // targetElement.scrollIntoView();

        const yOffset = -300;
        const y =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;

        console.log("Window scroll auditor");
        console.log(targetElement);
        console.log(targetElement.getBoundingClientRect());
        console.log(targetElement.getBoundingClientRect().top);
        console.log(window.pageYOffset);
        console.log(yOffset);
        console.log(y);

        window.scrollTo({ top: y, behavior: "smooth" });

        const origBackgroundColor = targetElement.style.backgroundColor;
        const origColor = targetElement.style.color;

        targetElement.style.backgroundColor = "rgb(76, 115, 255)";
        targetElement.style.color = "white";

        setTimeout(() => {
          targetElement.style.backgroundColor = origBackgroundColor;
          targetElement.style.color = origColor;

          targetElement.style.transition = "3s";
        }, 1);
      }
    }

    const inputElements = document.querySelectorAll("input");
    inputElements.forEach((input) => {
      if (
        (inputChecker(input.name, "EMAIL") ||
          inputChecker(input.placeholder, "EMAIL") ||
          inputChecker(input.type, "EMAIL")) &&
        input.id !== "no_fill_email_input"
      ) {
        // setEmailOnPage(true)
        input.value = subby;
      }
    });
    setDismiss(true);
  }

  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////

  async function execPageContainsEmailFields(input: any) {
    console.log("execPageContainsEmailFields");
    setEmailOnPage(true);
    input.value = subVal;
    allEmailInputs.push(input);
    console.log("SUBVAL WHEN COMPONENT IS GENERATED");
    console.log(subVal);
    console.log(secSubVal);
    var page_fill_button = document.createElement("button");
    page_fill_button.classList.add(styles.page_fill_button);

    page_fill_button.addEventListener("click", async function (event) {
      let tempSubVal: any;

      chrome.runtime.sendMessage(
        { type: "getCurrentSubVal" },
        (response: any) => {
          console.log("the async get email method was invoked");
          console.log(response);
          console.log(response.currentSubVal);

          tempSubVal = response.currentSubVal;

          fill(tempSubVal);
        }
      );

      event.preventDefault(); //this works for links
      event.stopPropagation(); //this does not work
    });

    var page_fill_button_logo = document.createElement("img");
    page_fill_button_logo.src = logo;
    page_fill_button_logo.classList.add(styles.page_fill_button_logo);

    page_fill_button.appendChild(page_fill_button_logo);

    if (input.parentNode) {
      input.parentNode.insertBefore(page_fill_button, input.nextSibling);
    }
  }
  //////////////////////////////////////////
  //////////////////////////////////////////

  const configEmailDetails = (email: string) => {
    console.log("configEmailDetails");

    let temp = `${email.substring(
      0,
      email.toUpperCase().indexOf("@")
    )}+${normalName}${String.fromCharCode(95)}${"flytr4p"}${email.substring(
      email.toUpperCase().indexOf("@"),
      email.length
    )}`;
    setSubVal(temp);
    // secSubVal = `${email.substring(0, email.toUpperCase().indexOf("@"))}+${normalName}${email.substring(email.toUpperCase().indexOf("@"), email.length)}`
    setEmail(email);
    setEmailOnFile(true);
    setEmailFront(email.substring(0, email.toUpperCase().indexOf("@")));
    setEmailBack(
      email.substring(email.toUpperCase().indexOf("@"), email.length)
    );

    chrome.runtime.sendMessage(
      { type: "setCurrentSubVal", currentSubVal: temp },
      (response: any) => {
        console.log("this is the response from the set curr sub val!!!!");

        console.log(response);
      }
    );
  };

  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////

  async function fetchDBVals() {
    let promise = await chrome.runtime.sendMessage(
      { type: "setDBVals" },
      (response: any) => {
        blockedDomains = response.blockedDomains;
        usedEmails = response.usedEmails;
      }
    );

    console.log(usedEmails);
    console.log(usedEmails);
    console.log(usedEmails);
    console.log(usedEmails);
    genUsedEmailsFilterArray();
  }

  useEffect(() => {
    //check if the blocked domains exists
    //check if the blocked domains exists

    fetchDBVals();

    let simpleDomain = window.location.href.split("//")[2];

    console.log("these are the domainelements");
    console.log(domainElements);

    if (doesExist(blockedDomains, normalName)) {
      setDismiss(true);
      return;
    }

    if (domainElements.length === 2) {
      normalName = domainElements[0];
    } else if (domainElements.length > 2) {
      normalName = domainElements[1];
    } else {
      normalName = "We couldn't find a name :(";
    }

    allInputs = Array.from(document.querySelectorAll("input"));

    chrome.runtime.sendMessage({ type: "getLogo" }, (response: any) => {
      console.log(response);
      img = response.img;
      logo = response.logo;
    });

    if (waiter) {
      console.log("waiter");
      chrome.runtime.sendMessage({ type: "getEmail" }, (response: any) => {
        // console.log(response)
        if (response.email !== "") {
          //console.log("first if was invoked")
          configEmailDetails(response.email);
        } else {
          //console.log("second if was invoked")
          setEmailOnFile(false);
        }
      });
      pageContainsEmailFields(allInputs);
    }
  }, [window.location.href, waiter]);

  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////

  const genUsedEmailsFilterArray = () => {
    let temp = "";
    usedEmails.forEach((e) => {
      temp += `To:${e}` + " ";
    });
    console.log("{" + temp + "}");
    console.log("{" + temp + "}");
    console.log("{" + temp + "}");
    setEmailFilterString("{" + temp + "}");
    console.log("{" + temp + "}");
    console.log("{" + temp + "}");
    console.log("{" + temp + "}");
    return "{" + temp + "}";
  };

  const block = () => {
    if (!doesExist(blockedDomains, normalName)) {
      blockedDomains.push(normalName);

      chrome.runtime.sendMessage(
        { type: "addBlockedDomains", blockedDomains: blockedDomains },
        (response: any) => {
          blockedDomains = response.blockedDomains;
        }
      );
    }

    console.log("this domain has been blocked");
    console.log(blockedDomains);

    setDismiss(true);
  };

  //////////////////////////////////////////
  //////////////////////////////////////////
  const settingsButton = () => {
    if (settingsOpen) {
      setResponsePrompt("");
    }
    setSettingsOpen(!settingsOpen);
  };

  // const saveBlockedDomains = () => {
  //   setEditBlockedDomains(false);

  //   let temp: string[] = [];
  //   console.log(editBDChecks);
  //   console.log(blockedDomains);
  //   console.log(blockedDomains.length);

  //   for (let i = 0; i < blockedDomains.length; i++) {
  //     if (!editBDChecks[i]) {
  //       temp.push(blockedDomains[i]);
  //     }
  //   }

  //   console.log(temp);

  //   blockedDomains = temp;

  //   chrome.runtime.sendMessage(
  //     { type: "addBlockedDomains", blockedDomains: blockedDomains },
  //     (response: any) => {
  //       blockedDomains = response.blockedDomains;
  //     }
  //   );

  //   // setEditBDChecks(temp)

  //   //edit local domain list

  //   //send new domain list back

  //   // if (settingsOpen) {
  //   //   setResponsePrompt('')
  //   // }
  //   // setSettingsOpen(!settingsOpen)
  // };
  //////////////////////////////////////////
  //////////////////////////////////////////

  const getToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      setToken(token);
    } catch (e) {
      console.log(e);
    }
  };

  let email_filter: any;

  useEffect(() => {
    getToken();
    setGmailCheck(window.location.hostname);
    // var email_filter = document.getElementById(':nh');

    email_filter = document.querySelectorAll("div.ZF-Av");
    console.log(email_filter);
    console.log(email_filter);
    console.log(email_filter);
    console.log(email_filter);

    genUsedEmailsFilterArray();

    activateFilters();
    setTimeout(() => {
      activateFilters();
    }, 1000);
  }, []);

  const activateFilters = () => {
    console.log("activate filters is live");
    // var button = document.querySelector(".gb_bf") as HTMLButtonElement;
    // button.click();
  };

  useEffect(() => {
    const observer = new MutationObserver((mutationsList, observer) => {
      console.log("mutation observer is running");
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const addedNode = mutation.addedNodes[i] as Element;
            if (
              addedNode.tagName === "DIV" &&
              addedNode.classList.contains("ZF-Av")
            ) {
              // Do something with the div
              console.log("Found the target div!");
              // Stop observing mutations since the div has been found
              observer.disconnect();
              return;
            }
          }
        }
      }
    });
    if (targetNode) {
      observer.observe(targetNode, { childList: true, subtree: true });
    }
  }, [targetNode]);

  useEffect(() => {
    console.log("this is the outcome of the isAuthenticated thingee");
    console.log(isAuthenticated);

    setAuthenticated(isAuthenticated);
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  console.log("THIS IS THE USER OKAY");
  console.log(user);

  // return(
  //   <div>
  //       { isLoading ? <>Loading</>: !authenticated ? <>Sign in</> : <>You are already signed in</> }
  //   </div>
  // )
  console.log("334242323234");

  if (gmailCheck.includes("mail.google.com")) {
    console.log("HJKHASKJDhKJAHSDJKHSJKSAHDJKASHDKAHj");
    console.log("HJKHASKJDhKJAHSDJKHSJKSAHDJKASHDKAHj");
    console.log("HJKHASKJDhKJAHSDJKHSJKSAHDJKASHDKAHj");
    console.log("HJKHASKJDhKJAHSDJKHSJKSAHDJKASHDKAHj");
    console.log("HJKHASKJDhKJAHSDJKHSJKSAHDJKASHDKAHj");
    console.log("HJKHASKJDhKJAHSDJKHSJKSAHDJKASHDKAHj");
    console.log(email_filter);
    console.log(email_filter);
    console.log(email_filter);

    return (
      <div className={styles.master_styles}>
        <div
          className={waiter && !dismiss ? styles.tester_after : styles.tester}
        >
          <div className={styles.container}>
            <button
              className={styles.x_button}
              onClick={() => setDismiss(!dismiss)}
            >
              {" "}
              <FontAwesomeIcon icon={faXmark} />
            </button>
            {/* <AuthenticationButton/> */}
            <img className={styles.image_container} src={img} />
            <button className={styles.settings_button} onClick={settingsButton}>
              {" "}
              <FontAwesomeIcon icon={faGear} />
            </button>
            Use this in a filter to remove all Flytrap created emails:
            <br />
            {/* {emailFilterString} */}
            <h4 className={styles.email_filter_wrapper}>
              <div className={styles.copy_filters}>
                Copy to Clipboard
                {/* {"{ "} */}
                <h4 className={styles.span_indent}>
                  {usedEmails.map((email, index) => {
                    return (
                      <React.Fragment key={index}>
                        {index == 0 && (
                          <span style={{ left: "-10px", position: "relative" }}>
                            {"{"}
                            <br />
                          </span>
                        )}
                        {"To:"}
                        {email}{" "}
                        {index == usedEmails.length - 1 && (
                          <span style={{ left: "-10px", position: "relative" }}>
                            <br />
                            {"}"}
                          </span>
                        )}
                      </React.Fragment>
                    );
                  })}
                  <br />
                </h4>
              </div>
              {/* &#125; */}
            </h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.master_styles}>
      {/* <GmailAuth/> */}
      <div
        className={
          emailOnPage && waiter && !dismiss
            ? styles.tester_after
            : styles.tester
        }
      >
        {/* <header> */}
        <div className={styles.container}>
          <button
            className={styles.x_button}
            onClick={() => setDismiss(!dismiss)}
          >
            {" "}
            <FontAwesomeIcon icon={faXmark} />
          </button>
          {/* <AuthenticationButton/> */}
          <img className={styles.image_container} src={img} />
          <button className={styles.settings_button} onClick={settingsButton}>
            {" "}
            <FontAwesomeIcon icon={faGear} />
          </button>

          {/* <br></br> */}

          {/* {authenticated ? (
            <div>
              <button onClick={() => logout()}>Log out</button>
            </div>
          ) : (
            <button onClick={() => loginWithRedirect()}>Log in</button>
          )} */}

          {emailOnFile ? (
            settingsOpen ? (
              editBlockedDomains ? (
                <div>
                  <EditBlockedDomains
                    setEditBlockedDomains={setEditBlockedDomains}
                    editBlockedDomains={editBlockedDomains}
                    blockedDomains={blockedDomains}
                  />
                </div>
              ) : (
                <div className={styles.container}>
                  {/* <div style={{ fontSize: "1.7vw", position: "relative" }}>
                    Settings
                  </div> */}
                  {/* <br></br> */}

                  <div style={{ fontSize: "1.3vw", position: "relative" }}>
                    Change base email?
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderBottom: "1px solid black",
                    }}
                  >
                    <input
                      className={styles.example}
                      id="no_fill_email_input"
                      placeholder={email}
                      onChange={(e) => {
                        setTempEmail(e.target.value);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          registerEmail();
                        }
                      }}
                    />
                  </div>
                  {/* <br></br> */}
                  <div
                    className={styles.response_prompt}
                    style={{
                      color: promptWarn ? "red" : "black",
                      transition: promptWarn ? "0s" : "2s",
                    }}
                  >
                    {responsePrompt}
                  </div>
                  <button
                    className={styles.fill_button}
                    onClick={() => setEditBlockedDomains(true)}
                  >
                    Manage Domains
                  </button>

                  <a
                    href="https://mail.google.com/mail/u/0/#settings/filters"
                    target="_blank"
                    className={styles.inbox_link}
                  >
                    <button
                      className={styles.fill_button}
                      style={{ width: "95%" }}
                    >
                      Manage Inbox
                    </button>
                  </a>

                  {/* <br></br> */}
                  <button
                    className={styles.fill_button}
                    onClick={registerEmail}
                  >
                    Save Changes
                  </button>
                </div>
              )
            ) : (
              <div className={styles.container}>
                {/* <div style={{ fontSize: "1.7vw", position: "relative" }} >Email form on the page!</div>
                <br></br> */}

                {/* <div style={{ fontSize: "1.3vw", position: "relative" }}>
                  Fill email forms?
                </div> */}
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    height: "40px",
                    borderBottom: "1px solid black",
                  }}
                >
                  <div className={styles.example_fader} />
                  <input className={styles.example} placeholder={subVal} />

                  <button
                    className={styles.other_button}
                    onClick={copyToClipboard}
                  >
                    <icons.FaCopy />
                  </button>
                </div>
                {/* <br></br> */}

                {/* <div style={{ position: "relative", display: "flex", flexDirection: "row", justifyContent: "center", width: "80%", left: "10%" }}>
                  <div style={{ fontSize: "1.3vw" }} >
                    or hit the puzzle in the input to fill.
                  </div>
                  <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>

                    <img className={styles.page_fill_button_logo_inline} src={logo} onClick={fill} />
                  </div>
                </div> */}

                {/* <br></br> */}
                <div
                  style={{
                    fontSize: "1vw",
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    margin: ".5vw",
                  }}
                >
                  <button
                    className={styles.fill_button}
                    onClick={() => execFill()}
                  >
                    Fill!
                  </button>
                  <button className={styles.block_button} onClick={block}>
                    Don't show
                  </button>
                </div>
              </div>
            )
          ) : (
            <div className={styles.container}>
              <div style={{ fontSize: "1.7vw", position: "relative" }}>
                Let's get you set up!
              </div>
              {/* <br></br> */}

              <div style={{ fontSize: "1.3vw", position: "relative" }}>
                What email do you normally sign up with?
              </div>
              {/* <br></br> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  borderBottom: "1px solid black",
                }}
              >
                <input
                  className={styles.example}
                  id="no_fill_email_input"
                  onChange={(e) => {
                    setTempEmail(e.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      registerEmail();
                    }
                  }}
                />
              </div>
              {/* <br></br> */}
              <div
                className={styles.response_prompt}
                style={{
                  color: promptWarn ? "red" : "black",
                  transition: promptWarn ? "0s" : "2s",
                }}
              >
                {responsePrompt}
              </div>
              {/* <br></br> */}
              <button className={styles.fill_button} onClick={registerEmail}>
                Register main email
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoreApp;

// export default withAuthenticationRequired(CoreApp, {
//   onRedirecting: () => <AuthenticationButton />,
//   // onError: (error:) => <ErrorMessage>{error.message}</ErrorMessage>,
// });
