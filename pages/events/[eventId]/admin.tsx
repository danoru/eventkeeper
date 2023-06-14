import { useRouter } from "next/router";
import { useState } from "react";

import AdminItem from "../../../src/components/input/admin-item";

function AdminPage() {
  const router = useRouter();
  const eventLink = "/events/" + router.query.eventId;

  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  function submitFormHandler(e: any) {
    e.preventDefault;
    if (password === "sparks23") {
      setLoggedIn(true);
    } else {
      alert("Incorrect password.");
    }
  }

  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
  };

  if (!loggedIn) {
    return (
      <div>
        <form onSubmit={submitFormHandler}>
          <input
            type="text"
            placeholder="Enter Password"
            onChange={passwordHandler}
          />
          <button type="submit">Submit</button>
        </form>
        <div>
          <a href={eventLink} style={{ textDecorationLine: "none" }}>
            Back to Event
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Host Recommendations</h1>
        <AdminItem />
      </div>
      <div>
        <a href={eventLink} style={{ textDecorationLine: "none" }}>
          Back to Event
        </a>
      </div>
    </div>
  );
}

export default AdminPage;
