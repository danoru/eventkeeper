import { useRouter } from "next/router";

function DrinkList(props) {
  const { items } = props;
  const router = useRouter();

  const eventId = router.query.eventId;

  return (
    <div>
      <h3>Drinks</h3>
      <div>
        <ul>
          {items
            ?.filter(
              (item) =>
                item.itemEntry.itemType === "drink" &&
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

export default DrinkList;
