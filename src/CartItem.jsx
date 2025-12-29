import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../CartSlice";

function CartItem() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div>
      <h2>Shopping Cart</h2>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map(item => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>Price: ₹{item.price}</p>

          <button
            onClick={() =>
              dispatch(updateQuantity({
                id: item.id,
                quantity: item.quantity - 1
              }))
            }
            disabled={item.quantity <= 1}
          >
            -
          </button>

          <span> {item.quantity} </span>

          <button
            onClick={() =>
              dispatch(updateQuantity({
                id: item.id,
                quantity: item.quantity + 1
              }))
            }
          >
            +
          </button>

          <button onClick={() => dispatch(removeItem(item.id))}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total Amount: ₹{calculateTotalAmount()}</h3>
    </div>
  );
}

export default CartItem;
