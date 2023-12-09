// SellerItems.js
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

const SellerItems = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Fetch the items data from your backend 
        const fetchItems = async () => {
            try {
                const response = await fetch('/datasets/selleritems.json');
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    return (
        <MasonryLayout>
            {items.map((item, index) => (
                <Card key={index}>
                    <ItemImage src={item.image} alt={item.title} />
                    <InfoContainer>
                        <Title>{item.title}</Title>
                        <PriceSection>
                            <Price>${item.price}</Price>
                            <OriginalPrice>${item.originalPrice}</OriginalPrice>
                            <Discount>{item.discount}% off</Discount>
                        </PriceSection>
                        <Shipping>{item.shipping}</Shipping>
                        <Rating>
                            {Array(Math.floor(item.rating)).fill(<Star>★</Star>)} ({item.reviewCount})
                        </Rating>
                    </InfoContainer>
                </Card>
            ))}
        </MasonryLayout>
    );
};

// Styled components

const MasonryLayout = styled.div`
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 1rem;
        margin-top: 1.6rem;
      `;

const Card = styled.div`
        display: flex;
        flex-direction: column;
        background: #fff;
        margin-bottom: 1rem;
        padding: 1.5rem;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        transition: transform 0.3s ease-in-out;
      
        &:hover {
          transform: translateY(-5px);
        }
      `;

const ItemImage = styled.div`
        background-image: url(${props => props.src});
        background-size: cover;
        background-position: center;
        height: 200px; // Set a fixed height for all images
      `;

const InfoContainer = styled.div`
        padding: 0.5rem;
      `;

const Title = styled.h2`
        font-size: 1rem;
        font-weight: bold;
        margin: 0.5rem 0;
      `;

const PriceSection = styled.div`
        display: flex;
        align-items: baseline;
        justify-content: space-between;
      `;

const Price = styled.span`
        color: #E60023;
        font-weight: bold;
      `;

const OriginalPrice = styled.span`
        text-decoration: line-through;
        color: #777;
      `;

const Discount = styled.span`
        color: #E60023;
        font-weight: bold;
      `;

const Shipping = styled.span`
        display: block;
        color: #2C2C2C;
        margin-bottom: 0.5rem;
      `;

const Rating = styled.div`
        display: flex;
        align-items: center;
      `;

const Star = styled.span`
        color: #FFD700;
      `;

export default SellerItems;