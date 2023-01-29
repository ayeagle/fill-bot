import styles from './App.module.css'
import { useEffect, useState } from 'react';


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

  useEffect(() => {
    const emailCheck = localStorage.getItem('email')
    if (emailCheck) {
      setEmail(emailCheck)
      setEmailOnFile(true)
    } else {
      setEmailOnFile(false)
    }

    console.log("this is the local storage value of email")
    console.log(localStorage.getItem('email'))
  }, [])

  let normalName: string;

  console.log("Below is the normal name")

  if (domainElements.length === 2) {
    normalName = domainElements[0];
  } else if (domainElements.length > 2) {
    normalName = domainElements[1];
  } else {
    normalName = "We couldn't find a name :("
  }

  console.log(normalName)




  function waiter() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 1000);
    });
  }


  //function to check for if it contains a certain string
  const inputChecker = (checkVal: string, searchVal: string) => {
    console.log("this is the checkval : " + checkVal)
    return checkVal.toUpperCase().indexOf(searchVal.toUpperCase()) !== -1
  }

  async function fill() {

    await waiter();
    const inputElements = document.querySelectorAll('input');




    inputElements.forEach(input => {
      // if input.name or placeholder AND type == text
      if ((inputChecker(input.name, 'EMAIL') || inputChecker(input.placeholder, 'EMAIL') || inputChecker(input.type, 'EMAIL')) && input.id !== 'no_fill_email_input') {
        setEmailOnPage(true)
        // input.value = 'alexyeagle+lemondade@gmail.com';
        setSubVal(`${emailFront}+${normalName}${emailBack}`)
        input.value = subVal;
        console.log(input)
        console.log(normalName)
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('change'));
        // input.dispatchEvent(new Event('input'));
      }
    });

  }

  useEffect(() => {
    setInterval(() => {
      fill()
      console.log(location.hostname)

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
    setEmailFront(email.substring(0, email.toUpperCase().indexOf("@")))
    setEmailBack(email.substring(email.toUpperCase().indexOf("@"), email.length))

    return true;


  }


  const registerEmail = () => {

    //checkEmail
    if (validEmailCheck(tempEmail)) {
      setEmail(tempEmail)
      setEmailOnFile(true)
      localStorage.setItem('email', tempEmail)
      console.log("this is the local storage value of email")
      console.log(localStorage.getItem('email'))
      fill()
      
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
