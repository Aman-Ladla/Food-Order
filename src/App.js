import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
    const [cartOpen, setCartOpen] = useState(false);

    const cartOpenHandler = () => {
        setCartOpen(true);
    };

    const cartCloseHandler = () => {
        setCartOpen(false);
    };

    return (
        <CartProvider>
            <Header onCartOpen={cartOpenHandler} />
            {cartOpen && <Cart onCartClose={cartCloseHandler} />}
            <Meals></Meals>
        </CartProvider>
    );
}

export default App;
