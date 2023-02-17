import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab, Typography, Box, useMediaQuery } from '@mui/material';

import { setItems } from '../../state';
import Item from '../../components/Item';

const ShoppingList = () => {

  const dispatch = useDispatch();
  
  const items = useSelector((state) => state.cart.items);
  
  const isNotMobile = useMediaQuery("(min-width:600px)");
  const [value, setValue] = useState('New Arrivals');

  const handleChange = (e, newValue) => setValue(newValue);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const getItems = async () => {
    const items = await fetch (
      'http://localhost:1337/api/items?populate=image',
      {method: 'GET'}
    );

    const itemsJSON = await items.json();
    dispatch(setItems(itemsJSON.data));
  }

  useEffect(() => {
    getItems();
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  const topRatedItems = items.filter ((item) => item.attributes.category === 'Top Rated');
  const newArrivialItems = items.filter ((item) => item.attributes.category === 'New Arrivals');
  const betSellerItems = items.filter ((item) => item.attributes.category === 'Best Sellers');

  return (
    <Box width='80%' margin='80px auto'>
        <Typography variant='h3' textAlign='center'>
          Our Featured <b>Products</b>
        </Typography>
        <Tabs 
          textColor='primary' indicatorColor='primary' value={value} onChange={handleChange} 
          centered TabIndicatorProps={{ sx: { display: isNotMobile ? 'block' : 'none' }}} sx={{ m: '25px', '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }}
        >
          {isNonMobile && (
            <Tab label='ALL' value='All' />
          )}
          <Tab label='NEW ARRIVALS' value='New Arrivals' />
          <Tab label='TOP RATED' value='Top Rated' />
          <Tab label='BEST SELLERS' value='Best Sellers' />
        </Tabs>
        <Box margin='0 auto' display='grid' gridTemplateColumns='repeat(auto-fill, 300px)' justifyContent='space-around' rowGap='20px' columnGap='1.33%'>
          {value === 'All' && items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
          {value === 'New Arrivals' && newArrivialItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
          {value === 'Top Rated' && topRatedItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
          {value === 'Best Sellers' && betSellerItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        </Box>
    </Box>
  )
}

export default ShoppingList
