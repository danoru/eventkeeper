import { useRouter } from "next/router";
import AdminItem from "../../../src/components/input/admin-item";

function AdminPage() {
  const router = useRouter();
  const eventLink = "/events/" + router.query.eventId;

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
