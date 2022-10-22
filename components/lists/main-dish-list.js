function MainDishList(props) {
  const { items } = props;

  return (
    <div>
      <h3>Main Dishes</h3>
      <div>
        <ul>
          {items
            ?.filter((item) => item.itemEntry.itemType === "main-dish")
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

export default MainDishList;
