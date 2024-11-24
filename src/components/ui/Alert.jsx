// import { useState } from "react";
import Card from "./Card";
function Alert() {
  // TODO: project name
  // TODO: user name
  // TODO: refactor Create Project to use new modal setup and not a dialog
  // const [isAlert, setIsAlert] = useState(false);
  const handleAlert = async () => {
    //dialog.current.close();
    console.log("alert");

    // setIsAlert(false);
    // const data = {
    //   isNotified: "true",
    // };

    // try {
    //   await fetch("url", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Origin: origin,
    //       Authorizaton: "Bearer " + token,
    //     },
    //     body: JSON.stringify(data),
    //   });
    // } catch (e) {
    //   console.error(e);
    // }
  };

  return (
    <Card>
      <form method="dialog" onSubmit={handleAlert}>
        <h1>Projects Updated</h1>
        <p>Project XXX has been shared with you by YYYY</p>
        <div className="form-btn__container">
          <button method="dialog" type="submit" className="card-btn">
            Okay
          </button>
        </div>
      </form>
    </Card>
  );
}

export default Alert;
