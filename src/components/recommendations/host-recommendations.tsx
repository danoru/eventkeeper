import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function HostRecommendations() {
  const router = useRouter();
  const eventId = router.query.eventId;

  const [showItems, setShowItems] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (showItems) {
      fetch("/api/" + eventId + "/rsvp")
        .then((response) => response.json())
        .then((data) => {
          setItems(data.attendance);
        });
    }
  }, [showItems]);

  const checkRecommendation = () => {
    if (
      items?.filter(
        (item: any) =>
          item.itemEntry.itemType === "recommendation" &&
          item.itemEntry.eventId === eventId
      ).length === 0
    ) {
      return <div></div>;
    } else {
      return (
        <div>
          <h3>Host Recommendations</h3>
          <div>
            <ul
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "0.5% 30%",
              }}
            >
              {items
                ?.filter(
                  (item: any) =>
                    item.itemEntry.itemType === "recommendation" &&
                    item.itemEntry.eventId === eventId
                )
                .map((item: any) => (
                  <li style={{}} key={item._id}>
                    <p>{item.itemEntry.item}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      );
    }
  };

  return <div>{checkRecommendation()}</div>;
}

export default HostRecommendations;
