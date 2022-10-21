import AttendanceRegistration from "../components/input/attendance-registration";
import EventList from "../components/lists/event-list";
import Image from "next/image";
import NewItem from "../components/input/new-item";

function HomePage() {
  return (
    <div>
      {/* <AttendanceRegistration /> */}
      <div>
        <h1>Cody's Corner Halloween Party!</h1>
        <h2>Saturday, October 22nd, 2022</h2>
      </div>
      <Image src="/halloween-flyer.jpeg" width="450" height="450" />
      <NewItem />
      <EventList />
    </div>
  );
}

export default HomePage;
