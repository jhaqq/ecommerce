import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Box, Typography, useTheme, Button, Tabs, Tab, Divider } from '@mui/material';
import { Add, Remove, FavoriteBorderOutlined, ConstructionOutlined, ConnectingAirportsOutlined } from '@mui/icons-material';

import { Icon, Item } from '../../scenes'
import { shades } from '../../theme'
import { addToCart, increaseCount } from '../../state';

const ItemDetails = () => {

    const dispatch = useDispatch();
    const { itemid } = useParams();
    const [value, setValue] = useState('description');
    const [count, setCount] = useState(1);
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);
    const [inCart, setInCart] = useState(false);

    const numberId = Number(itemid);

    const handleChange = (e, newValue) => setValue(newValue);

    const cart = useSelector((state) => state.cart.cart);

    const getItem = async () => {
        const item = await fetch (
            `http://localhost:2000/api/items/${itemid}?populate=image`,
            {method: 'GET'}
        );
        const itemJSON = await item.json();
        setItem(itemJSON.data);
    }

    useEffect(() => {
        cart.length > 0 && (
            cart.map((target) => target.id === item.id ? setInCart(true) : null)
        );
    }, [cart.length]);

    //TODO: change so this is filtered by category
    const getItems = async () => {
        const items = await fetch (
            'http://localhost:2000/api/items?populate=image',
            {method: 'GET'}
        );
        const itemsJSON = await items.json();
        setItems(itemsJSON.data);
    }

    useEffect(() => {
        getItem();
        getItems();
    }, [itemid]);

    return (
      <Box width='80%' m='80px auto'>
        <Box display='flex' flexWrap='wrap' columnGap='40px'>
            {/* IMAGES */}
            <Box flex='1 1 40%' mb='40px'>
                <img src={`http://localhost:2000${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`} alt={item?.name} width='100%' height='100%' style={{ objectFit: 'contain' }} />
            </Box>
            {/* ACTIONS */}
            <Box flex='1 1 50%' mb='40px'>
                <Box display='flex' justifyContent='space-between'>
                    <Box>Home/Item</Box>
                    <Box>Prev/Next</Box>
                </Box>
                <Box m='65px 0 25px 0'>
                    <Typography variant='h3'>{item?.attributes?.name}</Typography>
                    <Typography>{item?.attributes?.price}</Typography>
                    <Typography mt='20px'>{item?.attributes?.longdesc}</Typography>
                </Box>
                <Box display='flex' alignItems='center' minHeight='50px'>
                    <Box display='flex' alignItems='center' border={`1.5px solid ${shades.neutral[300]}`} mr='20px' p='2px 5px'>
                        <Icon icon={<Remove />} action={() => setCount(Math.max(count - 1, 1))} />
                        <Typography sx={{ p: '0 5px' }}>{count}</Typography>
                        <Icon icon={<Add />} action={() => setCount((prevCount) => prevCount + 1)} />
                    </Box>
                    {!inCart ? (
                        <Button 
                            sx={{
                                backgroundColor: "#222222",
                                color: "white",
                                borderRadius: 0,
                                minWidth: "150px",
                                padding: "10px 40px",
                            }} 
                            onClick={() => dispatch(addToCart({ item: { ...item, count }}))}>ADD TO CART</Button>
                    ) : (
                        <Button 
                            sx={{
                                backgroundColor: "#222222",
                                color: "white",
                                borderRadius: 0,
                                minWidth: "150px",
                                padding: "10px 40px",
                            }} 
                            onClick={() => increaseCount({})}>ADD TO CART</Button>
                    )}
                </Box>
                <Box>
                    <Box m='20px 0 5px 0' display='flex'>
                        <FavoriteBorderOutlined />
                        <Typography sx={{ ml: '5px' }}>ADD TO WISH LIST</Typography>
                    </Box>
                    <Typography>{item?.attributes?.category}</Typography>
                </Box>
            </Box>
        </Box>
        {/* INFO */}
        <Box>
            <Tabs value={value} onChange={handleChange}>
                <Tab label='DESCRIPTION' value='description' />
                <Tab label='REVIEWS' value='reviews'/>
            </Tabs>
        </Box>
        <Box display='flex' flexWrap='wrap' gap='15px'>
            {value === 'description' && (
                <div>{item?.attributes?.longdesc}</div>
            )}
            {value === 'reviews' && (
                <div>Reviews</div>
            )}
        </Box>
        <Divider />
        {/* RELATED ITEMS */}
        <Box mt="50px" width="100%">
            <Typography variant="h3" fontWeight="bold">
                Related Products
            </Typography>
            <Box
                mt="20px"
                display="flex"
                flexWrap="wrap"
                columnGap="1.33%"
                justifyContent="space-between"
            >
                {
                    numberId < 11 ? (
                        items.slice(numberId, numberId + 4).map((item, i) => (<Item key={`${item.name}-${item.id}`} item={item} />))
                    ) : (
                        items.slice(0,4).map((item, i) => (<Item key={`${item.name}-${i}`} item={item} /> ))
                    )
                }
            </Box>
        </Box>
      </Box>
    )
}

export default ItemDetails
