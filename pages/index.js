import AttendanceRegistration from "../components/input/attendance-registration";
import DrinkList from "../components/lists/drink-list";
import FoodList from "../components/lists/food-list";
import Image from "next/image";
import RSVPList from "../components/lists/rsvp-list";

function HomePage() {
  return (
    <div>
      <div>
        <h1>Cody's Corner Halloween Party!</h1>
        <h2>Saturday, October 22nd, 2022</h2>
      </div>
      <AttendanceRegistration />
      <Image src="/halloween-flyer.jpeg" width="500" height="500" />
      <div>
        <FoodList />
        <DrinkList />
        <RSVPList />
      </div>
    </div>
  );
}

export default HomePage;
