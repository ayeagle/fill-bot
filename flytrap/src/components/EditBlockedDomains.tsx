import styles from "./CoreApp.module.css";
import { useEffect, useState } from "react";

type EditBlockedDomainsProps = {
  setEditBlockedDomains: any;
  editBlockedDomains: boolean;
  blockedDomains: Array<string>;
};

export default function EditBlockedDomains({
  setEditBlockedDomains,
  editBlockedDomains,
  blockedDomains,
}: EditBlockedDomainsProps) {
  const [editBDChecks, setEditBDChecks] = useState(Array(10).fill(false));

  useEffect(() => {
    //check if the blocked domains exists
    //check if the blocked domains exists

    chrome.runtime.sendMessage({ type: "setDBVals" }, (response: any) => {
      blockedDomains = response.blockedDomains;
      // usedEmails = response.usedEmails;
    });
  }, []);

  const saveBlockedDomains = () => {
    let temp: string[] = [];
    console.log(editBDChecks);
    console.log(blockedDomains);
    console.log(blockedDomains.length);

    for (let i = 0; i < blockedDomains.length; i++) {
      if (!editBDChecks[i]) {
        temp.push(blockedDomains[i]);
      }
    }

    console.log(temp);

    blockedDomains = temp;

    chrome.runtime.sendMessage(
      { type: "addBlockedDomains", blockedDomains: blockedDomains },
      (response: any) => {
        blockedDomains = response.blockedDomains;
      }
    );
    setEditBlockedDomains(false);
  };
  return (
    <div>
      <div style={{ fontSize: "1.5vw" }}>Blocked Domains</div>

      <div className={styles.domain_container}>
        {blockedDomains.map((domain, index) => {
          // const temp = editBDChecks
          // temp[index] = true
          // // setEditBDChecks(temp)

          console.log("the domain render is going");

          return (
            <div className={styles.domain_unit_container}>
              <input
                type="checkbox"
                defaultChecked={true}
                className={styles.domain_units}
                onChange={(e) => {
                  console.log("the onchange is going");
                  let temp = editBDChecks;
                  // console.log(temp)
                  // console.log(temp[index])
                  // console.log(editBDChecks)
                  // console.log(editBDChecks[index])
                  temp[index] = !temp[index];
                  setEditBDChecks(temp);
                }}
              />
              <div className={styles.domain_units}>{domain}</div>
            </div>
          );
        })}
      </div>
      {/* <br /> */}
      <button className={styles.fill_button} onClick={saveBlockedDomains}>
        Save Changes
      </button>
    </div>
  );
}
