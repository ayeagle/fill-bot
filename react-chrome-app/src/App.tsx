import styles from './App.module.css'
import { useEffect } from 'react';


function App() {

  const domainElements = location.hostname.split(".");

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
      if (inputChecker(input.name, 'EMAIL') || inputChecker(input.placeholder, 'EMAIL') || inputChecker(input.type, 'EMAIL')) {
        input.value = 'alexyeagle+lemondade@gmail.com';
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

  console.log("I guess we're live out here huuuuhhhhh")


  // alert("ASSUUUUHHHHH")

  return (
    <div className={styles.tester} >
      <header>
        <div>Working on the styles</div>
        {/* <h2>Hello From React App 👋</h2> */}
      </header>
    </div>
  );
}

export default App;
