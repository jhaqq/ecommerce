import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import { Close, Add, Remove } from '@mui/icons-material';
import styled from '@emotion/styled';

import { Icon } from '../'
import { shades } from '../../theme';

import { 
    increaseCount,
    decreaseCount,
    removeFromCart,
    setIsCartOpen,
} from '../../state';

const FlexBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CartMenu = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);
    const isSearchOpen = useSelector((state) => state.cart.isSearchOpen);

    const totalPrice = cart.reduce((total, item) => {
        return total + item.count * item.attributes.price;
    }, 0)

    return (
        <Box
            display={isCartOpen && !isSearchOpen ? 'block' : 'none'}
            backgroundColor='rgba(0,0,0,.4)'
            position='fixed'
            zIndex={5}
            width='100%'
            height='100%'
            left='0'
            top='0'
            overflow='auto'
        >
            {/* MODAL */}
            <Box position='fixed' right='0' bottom='0' width='max(400px, 30%)' height='100%' backgroundColor='white'>
                <Box padding='30px' overflow='auto' height='100%'>
                    {/* HEADER */}
                    <FlexBox mb='15px'>
                        <Typography variant='h3'>SHOPPING BAG ({cart.length})</Typography>
                        <Icon icon={<Close />} action={() => dispatch(setIsCartOpen({}))} />
                    </FlexBox>
                
                    {/* CART LIST */}
                    <Box>
                        {cart.map((item) => (
                            <Box key={`${item.attributes.name}-${item.id}`}>
                                <FlexBox p='15px 0'>
                                    <Box flex='1 1 40%'>
                                        <img 
                                            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                                            alt={item?.name}
                                            width='123px'
                                            height='164px'
                                        />
                                    </Box>
                                    <Box flex='1 1 60%'>
                                        {/* DETAILS */}
                                        <FlexBox mb='5px'>
                                            <Typography fontWeight='bold'>
                                                {item?.attributes?.name}
                                            </Typography>
                                            <Icon icon={<Close />} action={() => dispatch(removeFromCart)} />
                                        </FlexBox>
                                        <Typography>{item?.attributes?.shortDesc}</Typography>
                                        {/* ITEM AMOUNT */}
                                        <FlexBox m='15px 0'>
                                            <Box display='flex' alignItems='center' border={`1.5px solid ${shades.neutral[500]}`}>
                                                <Icon icon={<Remove />} action={() => dispatch(decreaseCount({ id: item.id }))} />
                                            </Box>
                                            <Typography>{item.count}</Typography>
                                            <Box display='flex' alignItems='center' border={`1.5px solid ${shades.neutral[500]}`}>
                                                <Icon icon={<Add />} action={() => dispatch(increaseCount({ id: item.id }))} />
                                            </Box>
                                            {/* PRICE */}
                                            <Typography fontWeight='bold'>${item.attributes.price}</Typography>
                                        </FlexBox>
                                    </Box>
                                </FlexBox>
                                <Divider />
                            </Box>
                        ))}
                    </Box>
                    {/* ACTIONS */}
                    <Box m='20px 0'>
                        <FlexBox m='20px 0'>
                            <Typography fontWeight='bold'>SUBTOTAL</Typography>
                            <Typography fontWeight='bold'>${totalPrice}</Typography>
                        </FlexBox>
                        <Button 
                            sx={{ backgroundColor: shades.primary[400], color: 'white', borderRadius: 0, minWidth: '100%', padding: '20px 40px', margin: '20px 0'}}
                            onClick={() => {
                                navigate('/checkout');
                                dispatch(setIsCartOpen({}));
                            }}
                        >
                            CHECKOUT
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default CartMenu;
