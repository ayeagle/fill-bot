import styles from './App.module.css'
import { useEffect, useState } from 'react';
import * as icons from 'react-icons/fa';
// import { isConditionalExpression } from 'typescript';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


let normalName: string;

declare var window: any;

const chrome = window.chrome;

let logo: any;
let img: any;

let allInputs: any;

let allEmailInputs: HTMLInputElement[] = [];

let usedEmails: Array<string> = [];

//still need to actually write the permanent array
//somewhere that is... permanent lol


function App() {

  const domainElements = location.hostname.split(".");
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

  useEffect(() => {
    if (promptWarn) setPromptWarn(false)
  }, [promptWarn])
  console.log("PROMPT WARN: " + promptWarn)
  // const [allInputs, setAllInputs] = useState()
  //console.log("this bitch be the perma array")
  //console.log(usedEmails)


  //everytime that someone uses the fill function, add it to a local storage value
  //so that they can search on it in their inbox
  //option to autoblock anything that is sent to that specific domain


  //options for do not show absolute positioned menu
  //options for do not show logo piece button


  //NEED TO IMPLEMENT A USEEFFECT TO GRAB THE EMAIL DETAILS ON PAGE LOAD
  //BECAUSE RIGHT NOW THE EMAIL IS ONLY POPULATED CORRECTLY IF YOU
  //ENTER IT ON THAT EXACT PAGE LOAD, BUT NOT IN BETWEENs


  //add logic to not fire if there is also a password form on the page
  //add the ability to hit "enter" to move forward
  // add animations for copied to clipboard
  //

  //add animations for the copy button
  //add the ability to change your base email
  //fighure out some goddamned permanent storage lol

  useEffect(() => {

    chrome.runtime.sendMessage({ type: 'setDBVals' }, (response: any) => {
      usedEmails = response.usedEmails
    });


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
    // fill()
  }, [window.location.href, waiter])


  const configEmailDetails = (email: string) => {
    // //console.log("///////////////////////////")
    setEmail(email)

    setEmailOnFile(true)
    setEmailFront(email.substring(0, email.toUpperCase().indexOf("@")))
    // //console.log(email.substring(0, email.toUpperCase().indexOf("@")))
    // //console.log(normalName)

    setEmailBack(email.substring(email.toUpperCase().indexOf("@"), email.length))
    // //console.log(email.substring(email.toUpperCase().indexOf("@"), email.length))

    setSubVal(`${email.substring(0, email.toUpperCase().indexOf("@"))}+${normalName}${email.substring(email.toUpperCase().indexOf("@"), email.length)}`)
    // //console.log(`${emailFront}+${normalName}${emailBack}`)
    //console.log("///////////////////////////")
  }

  const executeFill = () => {
    fill()
  }

  const execPageContainsEmailFields = (input: any) => {

    setEmailOnPage(true)
    input.value = subVal
    allEmailInputs.push(input)

    // Create the visual element (e.g., a button)
    var page_fill_button = document.createElement("button");
    // page_fill_button.innerHTML = "Go!";
    page_fill_button.classList.add(styles.page_fill_button)
    page_fill_button.addEventListener("click", function (event) {
      executeFill()
      event.preventDefault(); //this works for links
      event.stopPropagation(); //this does not work
    });

    var page_fill_button_logo = document.createElement("img");
    page_fill_button_logo.src = logo
    page_fill_button_logo.classList.add(styles.page_fill_button_logo)

    page_fill_button.appendChild(page_fill_button_logo);

    // Add the button to the input field
    if (input.parentNode) {
      // Add the button to the input field
      input.parentNode.insertBefore(page_fill_button, input.nextSibling);
    }

  }

  const pageContainsEmailFields = (inputsArray: Array<any>) => {

    inputsArray.forEach((input, index) => {
      // if input.name or placeholder AND type == text
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
          // return true
        }
      }
      // return false
    })
    //console.log("this is the all email inputs object")
    //console.log(allEmailInputs)
  };



  const inputChecker = (checkVal: string, searchVal: string) => {
    return checkVal.toUpperCase().indexOf(searchVal.toUpperCase()) !== -1
  }


  async function fill() {
    let exists = false;

    console.log("this is the subval in the fill function")
    console.log(subVal)

    for (let i = 0; i < usedEmails.length; i++) {
      //console.log("this is the value of i: " + i)
      //console.log(usedEmails[i])
      if (usedEmails[i] === subVal) {
        exists = true
        break
      }
    }

    if (!exists) {
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
        setEmailOnPage(true)
        input.value = subVal
      }
    });
    setDismiss(true)
  }

  useEffect(() => {
    setInterval(() => {
      setWaiter(true)
      // fill()
    }, 2000);
  }, [waiter])






  const validEmailCheck = (email: string) => {
    const checker = (val: string) => {
      return email.toUpperCase().indexOf(val)
    }

    if (checker("@") === -1
      || (
        checker("@GMAIL.COM") === -1
        && checker("@YAHOO.COM") === -1
        && checker("@HOTMAIL.COM") === -1
      )
    ) {
      setResponsePrompt("invalid email")
      setPromptWarn(true)
      return false
    }

    chrome.runtime.sendMessage({ type: 'setEmail', email: tempEmail });

    return true


  }

  const registerEmail = () => {
    //console.log(tempEmail)
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

  // //console.log(email)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(subVal)
  }


  return (
    <div className={styles.master_styles}>
      <div className={emailOnPage && waiter && !dismiss ? styles.tester_after : styles.tester} >
        {/* <header> */}
        <div className={styles.container}>
          <button className={styles.x_button} onClick={() => setDismiss(!dismiss)}> <FontAwesomeIcon icon={faXmark} /></button>
          <img className={styles.image_container} src={img} />
          <button className={styles.settings_button} onClick={() => setSettingsOpen(!settingsOpen)}> <FontAwesomeIcon icon={faGear} /></button>

          <br></br>

          {emailOnFile ? (




            settingsOpen ? (
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
                <br></br>
                <button className={styles.fill_button} onClick={registerEmail}>Save Changes</button>

              </div>




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

                <button className={styles.fill_button} onClick={fill}>Fill away!</button>
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

export default App
