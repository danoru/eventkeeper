function GuestList(props) {
  const { items } = props;

  return (
    <div>
      <h3>Guest List</h3>
      <div>
        <ul>
          {items?.map((item) => (
            <li key={item._id}>
              <p>{item.item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GuestList;
