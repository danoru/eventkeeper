import AttendanceRegistration from "../components/input/attendance-registration";
import EventList from "../components/lists/event-list";
import Image from "next/image";

function HomePage() {
  return (
    <div>
      {/* <AttendanceRegistration /> */}
      <div>
        <h1>Cody's Corner Halloween Party!</h1>
        <h2>Saturday, October 22nd, 2022</h2>
      </div>
      <Image src="/halloween-flyer.jpeg" width="500" height="500" />
      <div>
        <EventList />
      </div>
    </div>
  );
}

export default HomePage;
