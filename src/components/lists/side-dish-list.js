function SideDishList(props) {
  const { items } = props;

  return (
    <div>
      <h3>Side Dishes</h3>
      <div>
        <ul>
          {items
            ?.filter((item) => item.itemEntry.itemType === "side-dish")
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

export default SideDishList;
