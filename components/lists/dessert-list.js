function DessertList(props) {
  const { items } = props;

  return (
    <div>
      <h3>Desserts</h3>
      <div>
        <ul>
          {items
            ?.filter((item) => item.itemEntry.itemType === "dessert")
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
