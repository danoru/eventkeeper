function DrinkList(props) {
  const { items } = props;

  return (
    <div>
      <h3>Drinks</h3>
      <div>
        <ul>
          {items
            ?.filter((item) => item.itemEntry.itemType === "drink")
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
