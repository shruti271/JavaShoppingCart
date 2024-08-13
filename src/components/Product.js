import React, { useState } from 'react';

const Product = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);

  const ImageUpload = async (event) => {
    
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
    
      const imageURL = URL.createObjectURL(event.target.files[0]);
      setImagePreview(imageURL);

      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'image-id': "img_"+product.id+"."+event.target.files[0].name.split('.').pop(),
            'product':JSON.stringify(product)
          },
        });
  
        if (response.ok) {
          const result = await response.json();
           console.log("okk");
        } else {
          console.log("hsuf");
        }
      } catch (error) {
        
        console.error('Error:', error);
      }   
  };

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value, 10))));
  };

  const handleIncrease = () => {
    setQuantity(prevQuantity => Math.min(product.stock, prevQuantity + 1));
  };

  const handleDecrease = () => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  return (
    <div className="product">
      <div className="product-description">
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Stock: {product.stock}</p>
        </div>
        <input type='file' onChange={ImageUpload} ></input>
        <div className='product-image'>                 
          <img height={100} width={100} src={imagePreview?imagePreview:"http://localhost:5000/productImages/"+product.imageId} />                    
        </div>
      </div>
      <div className="quantity-controls">
        <button onClick={handleDecrease} disabled={quantity <= 1}>-</button>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
          max={product.stock}
        />
        <button className={(product.stock <= 0 || product.stock < quantity) ? 'disabled-class' : 'enabled-class'}
          onClick={handleIncrease} disabled={quantity >= product.stock}>+</button>
      </div>
      <button
        className={(product.stock <= 0 || product.stock < quantity) ? 'disabled-class' : 'enabled-class'}
        onClick={() => addToCart(product, quantity)}
        disabled={product.stock === 0}
      >
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default Product;
