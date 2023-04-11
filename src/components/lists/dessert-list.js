import { useRouter } from "next/router";

function DessertList(props) {
  const { items } = props;

  const router = useRouter();

  const eventId = router.query.eventId;

  return (
    <div>
      <h3>Desserts</h3>
      <div>
        <ul>
          {items
            ?.filter(
              (item) =>
                item.itemEntry.itemType === "dessert" &&
                item.itemEntry.eventId === eventId
            )
            .map((item) => (
              <li key={item._id}>
                <p>{item.itemEntry.item}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default DessertList;
