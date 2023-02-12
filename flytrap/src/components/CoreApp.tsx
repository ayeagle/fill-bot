import styles from './CoreApp.module.css'
import { useEffect, useState } from 'react';
import * as icons from 'react-icons/fa';
// import { isConditionalExpression } from 'typescript';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthenticationButton from './AuthenticationButton';
import { useLocation } from 'react-router-dom';

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

console.log("COREapp has loaded")



export default function CoreApp() {

  const location = useLocation();
  const domainElements = location.pathname.split(".");

  const [emailOnPage, setEmailOnPage] = useState(false);
  const [emailOnFile, setEmailOnFile] = useState(true)
  const [email, setEmail] = useState('')
  const [tempEmail, setTempEmail] = useState('')
  const [emailFront, setEmailFront] = useState('')
  const [emailBack, setEmailBack] = useState('')
  const [responsePrompt, setResponsePrompt] = useState('')
  const [subVal, setSubVal] = useState('')
  const [waiter, setWaiter] = useState(false)
  const [dismiss, setDismiss] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const [promptWarn, setPromptWarn] = useState(false)
  const [editBlockedDomains, setEditBlockedDomains] = useState(false)
  // const [editBDChecks, setEditBDChecks] = useState<boolean[]>([]);
  const [editBDChecks, setEditBDChecks] = useState(Array(10).fill(false))

  useEffect(() => {
    if (promptWarn) setPromptWarn(false)
  }, [promptWarn])
  console.log("PROMPT WARN: " + promptWarn)
  // const [allInputs, setAllInputs] = useState()
  //console.log("this bitch be the perma array")
  //console.log(usedEmails)

  //options for do not show logo piece button

  // add animations for copied to clipboard
  //login stuff

  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////

  const copyToClipboard = () => {
    navigator.clipboard.writeText(subVal)
  }
  //////////////////////////////////////////
  //////////////////////////////////////////

  const inputChecker = (checkVal: string, searchVal: string) => {
    console.log("inputChecker");
    return checkVal.toUpperCase().indexOf(searchVal.toUpperCase()) !== -1
  }
  //////////////////////////////////////////
  //////////////////////////////////////////

  const doesExist = (checkArray: any, value: any) => {
    for (let i = 0; i < checkArray.length; i++) {
      if (checkArray[i] === value) {
        return true
      }
    }
    return false
  }
  //////////////////////////////////////////
  //////////////////////////////////////////

  useEffect(() => {
    setInterval(() => {
      setWaiter(true)
      // fill()
    }, 100);
  }, [waiter])
  //////////////////////////////////////////
  //////////////////////////////////////////

  const validEmailCheck = (email: string) => {
    console.log("validEmailCheck");
    const checker = (val: string) => {
      return email.toUpperCase().indexOf(val)
    }
    if (checker("@") === -1 || (checker("@GMAIL.COM") === -1 && checker("@YAHOO.COM") === -1 && checker("@HOTMAIL.COM") === -1)) {
      setResponsePrompt("invalid email")
      setPromptWarn(true)
      return false
    }
    chrome.runtime.sendMessage({ type: 'setEmail', email: tempEmail });
    return true
  }
  //////////////////////////////////////////
  //////////////////////////////////////////

  const registerEmail = () => {
    console.log("registerEmail");
    let emailVal: string;
    if (tempEmail === '') {
      emailVal = email
    } else {
      emailVal = tempEmail
    }
    if (validEmailCheck(emailVal)) {
      configEmailDetails(emailVal)
      setSettingsOpen(false)
    }
  }
  //////////////////////////////////////////
  //////////////////////////////////////////

  const pageContainsEmailFields = (inputsArray: Array<any>) => {
    console.log("pageContainsEmailFields");
    inputsArray.forEach((input, index) => {
      if (
        (
          inputChecker(input.name, 'EMAIL')
          || inputChecker(input.placeholder, 'EMAIL')
          || inputChecker(input.type, 'EMAIL')
        ) && input.id !== 'no_fill_email_input'
      ) {
        if (inputsArray.length > index + 1) {
          if (!inputChecker(inputsArray[index + 1].name, 'PASSWORD')
            && !inputChecker(inputsArray[index + 1].placeholder, 'PASSWORD')
            && !inputChecker(inputsArray[index + 1].type, 'PASSWORD')) {
            execPageContainsEmailFields(input)
          }
        } else {
          execPageContainsEmailFields(input)
        }
      }
    })
  };
  //////////////////////////////////////////
  //////////////////////////////////////////

  const execPageContainsEmailFields = (input: any) => {
    console.log("execPageContainsEmailFields");
    setEmailOnPage(true)
    input.value = subVal
    allEmailInputs.push(input)
    console.log("SUBVAL WHEN COMPONENT IS GENERATED")
    console.log(subVal)
    console.log(secSubVal)
    var page_fill_button = document.createElement("button");
    page_fill_button.classList.add(styles.page_fill_button)
    page_fill_button.addEventListener("click", function (event) {
      fill(subVal)
      event.preventDefault(); //this works for links
      event.stopPropagation(); //this does not work
    });

    var page_fill_button_logo = document.createElement("img");
    page_fill_button_logo.src = logo
    page_fill_button_logo.classList.add(styles.page_fill_button_logo)

    page_fill_button.appendChild(page_fill_button_logo);

    if (input.parentNode) {
      input.parentNode.insertBefore(page_fill_button, input.nextSibling);
    }
  }
  //////////////////////////////////////////
  //////////////////////////////////////////

  const configEmailDetails = (email: string) => {
    console.log("configEmailDetails");
    setSubVal(`${email.substring(0, email.toUpperCase().indexOf("@"))}+${normalName}${email.substring(email.toUpperCase().indexOf("@"), email.length)}`)
    // secSubVal = `${email.substring(0, email.toUpperCase().indexOf("@"))}+${normalName}${email.substring(email.toUpperCase().indexOf("@"), email.length)}`
    setEmail(email)
    setEmailOnFile(true)
    setEmailFront(email.substring(0, email.toUpperCase().indexOf("@")))
    setEmailBack(email.substring(email.toUpperCase().indexOf("@"), email.length))
  }
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////


  useEffect(() => {

    //check if the blocked domains exists
    //check if the blocked domains exists


    chrome.runtime.sendMessage({ type: 'setDBVals' }, (response: any) => {
      blockedDomains = response.blockedDomains
      usedEmails = response.usedEmails
    });

    if (doesExist(blockedDomains, normalName)) {
      setDismiss(true)
      return
    }

    if (domainElements.length === 2) {
      normalName = domainElements[0];
    } else if (domainElements.length > 2) {
      normalName = domainElements[1];
    } else {
      normalName = "We couldn't find a name :("
    }

    allInputs = (Array.from(document.querySelectorAll('input')))

    chrome.runtime.sendMessage({ type: 'getLogo' }, (response: any) => {
      console.log(response)
      img = response.img
      logo = response.logo
    })

    if (waiter) {
      console.log("waiter");
      chrome.runtime.sendMessage({ type: 'getEmail' }, (response: any) => {
        // console.log(response)
        if (response.email !== '') {
          //console.log("first if was invoked")
          configEmailDetails(response.email)
        } else {
          //console.log("second if was invoked")
          setEmailOnFile(false)
        }
      })
      pageContainsEmailFields(allInputs)
    }
  }, [window.location.href, waiter])


  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////

  async function fill(subVal: any) {
    console.log("fill");

    if (!doesExist(usedEmails, subVal)) {
      chrome.runtime.sendMessage({ type: 'addUsedEmail', usedEmail: subVal }, (response: any) => {
        usedEmails = response.usedEmails
      });
    }

    if (allEmailInputs.length > 0 && allEmailInputs[0] != null) {
      const targetElement = document.getElementById(allEmailInputs[0].id);
      if (targetElement != null) {
        targetElement.scrollIntoView();
        const origBackgroundColor = targetElement.style.backgroundColor;
        const origColor = targetElement.style.color;

        targetElement.style.backgroundColor = 'rgb(76, 115, 255)';
        targetElement.style.color = 'white';

        setTimeout(() => {
          targetElement.style.backgroundColor = origBackgroundColor;
          targetElement.style.color = origColor;

          targetElement.style.transition = '3s';
        }, 1);
      }
    }

    const inputElements = document.querySelectorAll('input');
    inputElements.forEach(input => {
      if ((inputChecker(input.name, 'EMAIL') || inputChecker(input.placeholder, 'EMAIL') || inputChecker(input.type, 'EMAIL')) && input.id !== 'no_fill_email_input') {
        // setEmailOnPage(true)
        input.value = subVal
      }
    });
    setDismiss(true)
  }

  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////

  const block = () => {

    

    if (!doesExist(blockedDomains, normalName)) {

      blockedDomains.push(normalName)

      chrome.runtime.sendMessage({ type: 'addBlockedDomains', blockedDomains: blockedDomains }, (response: any) => {
        blockedDomains = response.blockedDomains
      });
    }

    console.log("this domain has been blocked")
    console.log(blockedDomains)

    setDismiss(true)

  }


  //////////////////////////////////////////
  //////////////////////////////////////////
  const settingsButton = () => {
    if (settingsOpen) {
      setResponsePrompt('')
    }
    setSettingsOpen(!settingsOpen)
  }

  const saveBlockedDomains = () => {
    setEditBlockedDomains(false)

    let temp: string[] = [];
    console.log(editBDChecks)
    console.log(blockedDomains)
    console.log(blockedDomains.length)

    for (let i = 0; i < blockedDomains.length; i++) {
      if (!editBDChecks[i]) {
        temp.push(blockedDomains[i])
      }
    }

    console.log(temp)

    blockedDomains = temp;

    chrome.runtime.sendMessage({ type: 'addBlockedDomains', blockedDomains: blockedDomains }, (response: any) => {
      blockedDomains = response.blockedDomains
    });

    // setEditBDChecks(temp)

    //edit local domain list

    //send new domain list back


    // if (settingsOpen) {
    //   setResponsePrompt('')
    // }
    // setSettingsOpen(!settingsOpen)
  }
  //////////////////////////////////////////
  //////////////////////////////////////////



  return (
    <div className={styles.master_styles}>
      <div className={emailOnPage && waiter && !dismiss ? styles.tester_after : styles.tester} >
        {/* <header> */}
        <div className={styles.container}>
          <button className={styles.x_button} onClick={() => setDismiss(!dismiss)}> <FontAwesomeIcon icon={faXmark} /></button>
          <AuthenticationButton/>
          <img className={styles.image_container} src={img} />
          <button className={styles.settings_button} onClick={settingsButton}> <FontAwesomeIcon icon={faGear} /></button>

          <br></br>

          {emailOnFile ? (

            settingsOpen ? (

              editBlockedDomains ? (
                <div>
                  <div style={{ fontSize: "1.5vw" }}>Blocked Domains</div>

                  <div className={styles.domain_container}>
                    {blockedDomains.map((domain, index) => {
                      // const temp = editBDChecks
                      // temp[index] = true
                      // // setEditBDChecks(temp)  

                      console.log("the domain render is going")

                      return (
                        <div className={styles.domain_unit_container}>
                          <input
                            type="checkbox"
                            defaultChecked={true}
                            className={styles.domain_units}

                            onChange={(e) => {
                              console.log("the onchange is going")
                              let temp = editBDChecks
                              // console.log(temp)
                              // console.log(temp[index])
                              // console.log(editBDChecks)
                              // console.log(editBDChecks[index])
                              temp[index] = !temp[index]
                              setEditBDChecks(temp)
                            }}
                          />
                          <div className={styles.domain_units}>{domain}</div>
                        </div>
                      )
                    })}
                  </div>
                  <br />
                  <button className={styles.fill_button} onClick={saveBlockedDomains}>Save Changes</button>
                </div>





              ) : (
                <div className={styles.container}>
                  <div style={{ fontSize: "1.7vw", position: "relative" }} >Settings</div>
                  <br></br>

                  <div style={{ fontSize: "1.3vw", position: "relative" }} >Change base email?</div>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", borderBottom: "1px solid black" }}>

                    <input className={styles.example}
                      id='no_fill_email_input'
                      placeholder={email}
                      onChange={(e) => {
                        setTempEmail(e.target.value)
                      }}
                      onKeyDown={event => {
                        if (event.key === 'Enter') {
                          registerEmail()
                        }
                      }}
                    />


                  </div>
                  <br></br>
                  <div className={styles.response_prompt} style={{ color: promptWarn ? "red" : "black", transition: promptWarn ? "0s" : "2s" }}>{responsePrompt}</div>
                  <button className={styles.fill_button} onClick={() => setEditBlockedDomains(true)}>Manage Domains</button>

                  <br></br>
                  <button className={styles.fill_button} onClick={registerEmail}>Save Changes</button>

                </div>

              )


            ) : (




              <div className={styles.container}>
                {/* <div style={{ fontSize: "1.7vw", position: "relative" }} >Email form on the page!</div>
                <br></br> */}

                <div style={{ fontSize: "1.3vw", position: "relative" }} >Fill email forms?</div>
                <div style={{ position: "relative", display: "flex", flexDirection: "row", justifyContent: "space-around", borderBottom: "1px solid black" }}>
                  <div className={styles.example_fader} />
                  <input className={styles.example}
                    placeholder={subVal}
                  />

                  <button className={styles.other_button} onClick={copyToClipboard}><icons.FaCopy /></button>
                </div>
                <br></br>

                <div style={{ position: "relative", display: "flex", flexDirection: "row", justifyContent: "center", width: "80%", left: "10%" }}>
                  <div style={{ fontSize: "1.3vw" }} >
                    or hit the puzzle in the input to fill.
                  </div>
                  <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>

                    <img className={styles.page_fill_button_logo_inline} src={logo} onClick={fill} />
                  </div>
                </div>

                <br></br>
                <div style={{ fontSize: "1vw", position: "relative", display: "flex", flexDirection: "row", justifyContent: "center", margin: ".5vw" }}>

                  <button className={styles.fill_button} onClick={fill}>Fill away!</button>
                  <button className={styles.block_button} onClick={block}>Don't show again</button>
                </div>

              </div>
            )



          ) : (




            <div className={styles.container}>
              <div style={{ fontSize: "1.7vw", position: "relative" }} >Let's get you set up!</div>
              <br></br>

              <div style={{ fontSize: "1.3vw", position: "relative" }} >What email do you normally sign up with?</div>
              <br></br>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", borderBottom: "1px solid black" }}>

                <input className={styles.example}
                  id='no_fill_email_input'
                  onChange={(e) => {
                    setTempEmail(e.target.value)
                  }
                  }
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      registerEmail()
                    }
                  }}
                />
              </div>
              <br></br>
              <div className={styles.response_prompt} style={{ color: promptWarn ? "red" : "black", transition: promptWarn ? "0s" : "2s" }}>{responsePrompt}</div>
              <br></br>
              <button className={styles.fill_button} onClick={registerEmail}>Register main email</button>
            </div>)}
        </div>
      </div>
    </div>
  )
}
