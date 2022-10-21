function SnackList(props) {
  const { items } = props;

  return (
    <div>
      <h3>Snacks</h3>
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

export default SnackList;
