import { useRef } from "react";

function NewItem(props) {
  const { eventId } = props;

  const itemInputRef = useRef();
  const itemTypeInputRef = useRef();

  function submitFormHandler() {
    // event.preventDefault();

    const enteredItem = itemInputRef.current.value;
    const enteredItemType = itemTypeInputRef.current.value;

    const reqBody = { item: enteredItem, itemType: enteredItemType };

    fetch("/api/" + eventId + "/rsvp", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <div>
      <form onSubmit={submitFormHandler}>
        <label htmlFor="item">Add Item to Event List</label>
        <select htmlFor="item-type" id="item-type" ref={itemTypeInputRef}>
          {/* <option value="main-dish" id="main-dish">
            Main Dish
          </option>
          <option value="side-dish" id="side-dish">
            Side Dish
          </option>
          <option value="snack" id="snack">
            Snack
          </option>
          <option value="dessert" id="dessert">
            Dessert
          </option>
          <option value="drink" id="drink">
            Drink
          </option> */}
          <option value="guest-name" id="guest-name">
            Guest Name
          </option>
        </select>
        <input
          type="text"
          id="item"
          placeholder="Add New Item/Guest"
          ref={itemInputRef}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default NewItem;
