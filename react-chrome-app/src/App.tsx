import styles from './App.module.css'
import { useEffect, useState } from 'react';
import * as icons from 'react-icons/fa';
// import { isConditionalExpression } from 'typescript';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


let normalName: string;

declare var window: any;

const chrome = window.chrome;

let logo: any;

let allInputs: any;

let allEmailInputs: HTMLInputElement[] = [];

let permanentArray: Array<string> = [];

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
  // const [allInputs, setAllInputs] = useState()
  console.log("this bitch be the perma array")
  console.log(permanentArray)


  //everytime that someone uses the fill function, add it to a local storage value
  //so that they can search on it in their inbox
  //option to autoblock anything that is sent to that specific domain


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

    if (domainElements.length === 2) {
      normalName = domainElements[0];
    } else if (domainElements.length > 2) {
      normalName = domainElements[1];
    } else {
      normalName = "We couldn't find a name :("
    }

    allInputs = (Array.from(document.querySelectorAll('input')))

    chrome.runtime.sendMessage({ type: 'getLogo' }, (response: any) => {
      logo = response.logo
    })


    chrome.runtime.sendMessage({ type: 'getEmail' }, (response: any) => {
      console.log(response)
      if (response.email !== '') {
        console.log("first if was invoked")
        configEmailDetails(response.email)
      } else {
        console.log("second if was invoked")
        setEmailOnFile(false)
      }
    })

    pageContainsEmailFields(allInputs)

    // fill()
  }, [window.location.href])


  const configEmailDetails = (email: string) => {
    console.log("///////////////////////////")
    setEmail(email)

    setEmailOnFile(true)
    setEmailFront(email.substring(0, email.toUpperCase().indexOf("@")))
    console.log(email.substring(0, email.toUpperCase().indexOf("@")))
    console.log(normalName)

    setEmailBack(email.substring(email.toUpperCase().indexOf("@"), email.length))
    console.log(email.substring(email.toUpperCase().indexOf("@"), email.length))

    setSubVal(`${email.substring(0, email.toUpperCase().indexOf("@"))}+${normalName}${email.substring(email.toUpperCase().indexOf("@"), email.length)}`)
    // console.log(`${emailFront}+${normalName}${emailBack}`)
    console.log("///////////////////////////")
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
            setEmailOnPage(true)
            input.value = subVal
            allEmailInputs.push(input)
            // return true
          }
        } else {
          setEmailOnPage(true)
          input.value = subVal
          allEmailInputs.push(input)
          // return true
        }
      }
      // return false
    })
    console.log("this is the all email inputs object")
    console.log(allEmailInputs)
  };


  const inputChecker = (checkVal: string, searchVal: string) => {
    return checkVal.toUpperCase().indexOf(searchVal.toUpperCase()) !== -1
  }

  async function fill() {

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

          targetElement.style.transition = '2s';
        }, 1);
      }
    }



    console.log("SUBVAL WITHIN THE FILL FUNCTION:  " + subVal)
    // await waiter();
    const inputElements = document.querySelectorAll('input');

    inputElements.forEach(input => {
      // if input.name or placeholder AND type == text
      if ((inputChecker(input.name, 'EMAIL') || inputChecker(input.placeholder, 'EMAIL') || inputChecker(input.type, 'EMAIL')) && input.id !== 'no_fill_email_input') {
        setEmailOnPage(true)
        console.log("this is the type of the input field")
        console.log(typeof input)
        input.value = subVal
        permanentArray.push(subVal)
      }
    });
    setDismiss(true)
  }

  useEffect(() => {
    setInterval(() => {
      setWaiter(true)
      // fill()
    }, 10);
  }, [])

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
      setResponsePrompt("huh that doesn't look like a valid email format")
      return false
    }

    chrome.runtime.sendMessage({ type: 'setEmail', email: tempEmail });

    return true


  }

  const registerEmail = () => {
    if (validEmailCheck(tempEmail)) {
      configEmailDetails(tempEmail)
    }
  }

  // console.log(email)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(subVal)
  }


  return (
    <div className={styles.master_styles}>
      <div className={emailOnPage && waiter && !dismiss ? styles.tester_after : styles.tester} >
        {/* <header> */}
        <div className={styles.container}>
          <button className={styles.x_button} onClick={() => setDismiss(!dismiss)}> <FontAwesomeIcon icon={faXmark} /></button>
          <img className={styles.image_container} src={logo} />
          <br></br>

          {emailOnFile ? (

            <div className={styles.container}>
              <div style={{ fontSize: "1.7vw", position: "relative" }} >Email form on the page!</div>
              <br></br>

              <div style={{ fontSize: "1.3vw", position: "relative" }} >Do you want to fill email forms?</div>
              <br></br>

              <div style={{ position: "relative", display: "flex", flexDirection: "row", justifyContent: "space-around", borderBottom: "1px solid black" }}>
                <div className={styles.example_fader} />
                <input className={styles.example}
                  value={subVal}
                />

                <button className={styles.other_button} onClick={copyToClipboard}><icons.FaCopy /></button>
              </div>
              <br></br>

              <button className={styles.fill_button} onClick={fill}>Fill away!</button>
            </div>
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
                  }}
                />
              </div>
              <br></br>
              {responsePrompt}
              <br></br>
              <button className={styles.fill_button} onClick={registerEmail}>Register main email</button>
            </div>)}
        </div>
      </div>
    </div>
  )
}

export default App
