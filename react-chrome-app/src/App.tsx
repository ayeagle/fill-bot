import styles from './App.module.css'
import { useEffect, useState } from 'react';
import { isConditionalExpression } from 'typescript';

let normalName: string;

declare var window: any;

const chrome = window.chrome;


// let sharedData = {
//   email: null,
// };

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


  //everytime that someone uses the fill function, add it to a local storage value
  //so that they can search on it in their inbox
  //option to autoblock anything that is sent to that specific domain


  //NEED TO IMPLEMENT A USEEFFECT TO GRAB THE EMAIL DETAILS ON PAGE LOAD
  //BECAUSE RIGHT NOW THE EMAIL IS ONLY POPULATED CORRECTLY IF YOU
  //ENTER IT ON THAT EXACT PAGE LOAD, BUT NOT IN BETWEENs

  useEffect(() => {

    if (domainElements.length === 2) {
      normalName = domainElements[0];
    } else if (domainElements.length > 2) {
      normalName = domainElements[1];
    } else {
      normalName = "We couldn't find a name :("
    }


    chrome.runtime.sendMessage({ type: 'getEmail' }, (response: any) => {
      console.log(response)
      if (response.data.email !== undefined) {
        console.log("first if was invoked")
        setEmail(response.data.email)
      } else {
        console.log("second if was invoked")
        setEmailOnFile(false)
      }
    })

    fill()
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



  // function waiter() {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve('resolved');
  //     }, 1000);
  //   });
  // }


  const inputChecker = (checkVal: string, searchVal: string) => {
    return checkVal.toUpperCase().indexOf(searchVal.toUpperCase()) !== -1
  }

  async function fill() {

    console.log("SUBVAL WITHIN THE FILL FUNCTION:  " + subVal)
    // await waiter();
    const inputElements = document.querySelectorAll('input');

    inputElements.forEach(input => {
      // if input.name or placeholder AND type == text
      if ((inputChecker(input.name, 'EMAIL') || inputChecker(input.placeholder, 'EMAIL') || inputChecker(input.type, 'EMAIL')) && input.id !== 'no_fill_email_input') {
        setEmailOnPage(true)
        input.value = subVal
      }
    });
  }

  useEffect(() => {
    setInterval(() => {
      // fill()
    }, 2000);
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

    //checkEmail
    if (validEmailCheck(tempEmail)) {
      configEmailDetails(tempEmail)
      // localStorage.setItem('email', tempEmail)
      // console.log("this is the local storage value of email")
      // console.log(localStorage.getItem('email'))
      // fill()

    }
  }
  console.log(email)


  return (
    <div className={emailOnPage ? styles.tester_after : styles.tester} >
      {/* <header> */}
      <div className={styles.container}>

        {emailOnFile ? (

          <div className={styles.container}>
            <div style={{ fontSize: "1.7vw", position: "relative" }} >Email form on the page!</div>
            <br></br>

            <div style={{ fontSize: "1.3vw", position: "relative" }} >Do you want to fill it with:</div>
            <br></br>
            <input className={styles.example}
              value={subVal}
            />
            <br></br>

            <button className={styles.fill_button}>Hell yeah!</button>
          </div>
        ) : (
          <div className={styles.container}>
            <div style={{ fontSize: "1.7vw", position: "relative" }} >Let's get you set up!</div>
            <br></br>

            <div style={{ fontSize: "1.3vw", position: "relative" }} >What email do you normally sign up with?</div>
            <br></br>
            <input className={styles.example}
              id='no_fill_email_input'
              onChange={(e) => {
                setTempEmail(e.target.value)
              }}
            />
            <br></br>

            {responsePrompt}
            <br></br>

            <button className={styles.fill_button} onClick={registerEmail}>Register as main email!</button>
          </div>)}

      </div>
      {/* <h2>Hello From React App 👋</h2> */}
      {/* </header> */}
    </div>
  )
}

export default App
