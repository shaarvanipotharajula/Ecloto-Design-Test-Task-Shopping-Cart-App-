import React, { useState, useEffect } from "react";
import "./App.css";


    const PRODUCTS = [
        { id: 1, name: "Laptop", price: 500 },
        { id: 2, name: "Smartphone", price: 300 },
        { id: 3, name: "Headphones", price: 100 },
        { id: 4, name: "Smartwatch", price: 150 },
      ];
      
      const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
      const THRESHOLD = 1000;

      const App = () =>{
        const [cart, setCart] = useState([]);

        useEffect(()=>{
            updateFreeGift();
        }, [cart]);

        const addToCart = (product) => {
            setCart((prevCart)=>{
                const existingItem = prevCart.find((item)=> item.id === product.id);
                if(existingItem){
                    return prevCart.map((item)=>
                    item.id === product.id ?{ ...item, quantity: item.quantity + 1} : item);
                }
                return [...prevCart, { ...product, quantity: 1}];
            });
        };

        const updateQuantity = (id, quantity) =>{
            setCart((prevCart)=>
            prevCart
            .map((item) => (item.id === id ? { ...item, quantity } : item))
            .filter((item)=> item.quantity > 0)
        );
        };

        const removeFromCart = (id) => {
            setCart((prevCart) => prevCart.filter((item) => item.id !== id));
        };

        const updateFreeGift = () => {
            const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const hasGift = cart.some((item) => item.id === FREE_GIFT.id);

            if(subtotal >= THRESHOLD && !hasGift){
                setCart((prevCart) => [...prevCart, { ...FREE_GIFT, quantity: 1}]);
            } else if (subtotal < THRESHOLD && hasGift){
                setCart((prevCart) => prevCart.filter((item) => item.id !== FREE_GIFT.id));
            }
        };

        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const remaining = THRESHOLD - subtotal > 0 ? THRESHOLD - subtotal : 0;
        const progress = Math.min((subtotal / THRESHOLD) * 100, 100);

        return (
            <div className="container">
                <h2 className="title">Shopping Cart</h2>

            {/* Product List */}    
            <div className="products">
                {PRODUCTS.map((product) =>(
                    <div key ={product.id} className="product-card">
                        <span className="product-name">{product.name}</span>
                        <span className="product-price">{product.price}</span>
                        <button className="add-btn" onClick={() => addToCart(product)}>
                            Add to Cart
                        </button>
                    </div>    

                ))}
            </div>

            {/* Cart Summary */}
            <div className="cart">
                <h3>Cart Summary</h3>
                <div className="cart-details">
                    <span className="subtotal">Subtotal: <strong>{subtotal}</strong></span>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{width: `${progress}% `}}></div>
                    </div>
                    {remaining > 0 ? (
                        <p className="progress-text">Add {remaining} more to get a Free Wireless Mouse!</p>
                    ) : (
                        <p className="progress-text">You get a free Wireless Mouse!</p>
                    )}
                </div>

                {/* Cart Items */}
                {cart.length > 0 ? (
                    <div className="cart-items">
                        {cart.map((item) =>(
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-details">
                                    <span className="cart-item-name">{item.name}</span>
                                    <span className="cart-item-price">{item.price} * {item.quantity} = {item.price * item.quantity}</span>
                                </div>
                                <div className="cart-actions">
                                    {item.id !== FREE_GIFT.id ? (
                                        <>
                                        <button className="quantity-btn decrement" onClick={()=> updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span className="cart-quantity">{item.quantity}</span>
                                        <button className="quantity-btn increment" onClick={()=> updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        <button className="remove-btn" onClick={()=> removeFromCart(item.id)}>Remove</button>
                                        </>
                                    ) : (
                                        <span className="free-gift-label">FREE GIFT</span>
                                    )}
                                </div>
                                </div>
                        ))}
                        </div>
                ) : (
                    <div className="empty-cart">
                        <p>Your cart is empty</p>
                        <span>Add some products to see them here!</span>
                    </div>
                )}
            </div>
            </div>


        );
      };
      export default App;
      