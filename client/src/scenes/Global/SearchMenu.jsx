import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Divider, IconButton, Typography, TextField, useMediaQuery } from '@mui/material';
import { Close, Add, Remove, StraightSharp } from '@mui/icons-material';
import styled from '@emotion/styled';

import { Icon } from '../'
import { shades } from '../../theme';

import { 
    setIsSearchOpen, setItems,
} from '../../state';

const FlexBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const SearchResult = ({ image, name, price }) => {
    return (

        <Box display='flex' zIndex={20} backgroundColor='rgb(255,230,234)' width='100%' height='100px' alignItems='center' sx={{ border: `1px solid ${shades.secondary[100]}` }}>
            <img src={image} alt='productimg' width='75px' height='100%'/>
            <Box color='black' display='flex' justifyContent='center' alignItems='center' textAlign='center' width='80%'>
                <Typography variant='h4' color='black'>{`${name}, $${price}`}</Typography>
            </Box>
        </Box>
        
    );
}


const SearchMenu = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchItems, setSearchItems] = useState([]);
    
    const isNonMobile = useMediaQuery('(min-width: 600px)');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const items = useSelector((state) => state.cart.items);
    const isSearchOpen = useSelector((state) => state.cart.isSearchOpen);

    const getItems = async () => {
        const items = await fetch (
          'http://localhost:2000/api/items?populate=image',
          {method: 'GET'}
        );
    
        const itemsJSON = await items.json();
        dispatch(setItems(itemsJSON.data))
      }
    
      const filterTopRated = (items) => {
        const filteredItems = items?.filter(
            item => item?.attributes?.category === 'Top Rated'
        ); 
        setSearchItems(filteredItems);
      }
      
      useEffect(() => {
          getItems();
          filterTopRated(items);
      }, []) //eslint-disable-line react-hooks/exhaustive-deps 
      
      useEffect(() => {
          if(searchTerm) {
              const filteredItems = items?.filter(
                  item => item?.attributes?.name?.toLowerCase().includes(searchTerm.toLowerCase())
              );
              setSearchItems(filteredItems);
          }
      
          else {
              filterTopRated(items);
          }
      }, [searchTerm, isSearchOpen]);


    return (
        <Box display={isSearchOpen ? 'flex' : 'none'} position='fixed' zIndex={10}  width='100%' height='100%' flexDirection='column' alignItems='center' backgroundColor='rgba(0,0,0,.4)'>
            <Box width='100%' height='15%' backgroundColor='rgb(255,230,234)' position='absolute'></Box>
            <Box
                display='flex'
                justifyContent='flex-start'
                alignItems='center'
                width='100%'
                height='100%'
                flexDirection='column'
                backgroundColor='transparent'
                position='relative'
            >
                <Box display='flex' justifyContent='center' alignItems='flex-start' sx={{ width: isNonMobile ? '500px' : '95%', margin: '10px 0', padding: '5px 0', borderRadius: '15px' }} flexDirection='column' position='absolute'>
                    <Box display='flex' width='100%' sx={{ marginBottom: '20px' }}>
                        <Box width='90%' backgroundColor='rgb(255,230,234)' display='flex' sx={{ marginTop: '10px' }}>
                            <TextField 
                            
                                size='small' 
                                variant='filled'
                                inputProps={{ 
                                    style: {
                                        height: '10px'
                                    }
                                }}
                                fullWidth 
                                label='Search...'
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Box>
                        <Box width='10%' sx={{ marginTop: '10px' }}>
                            <Icon icon={<Close />} action={() => dispatch(setIsSearchOpen({}))} />
                        </Box>
                    </Box>
                    <Box width={isNonMobile ? '450px' : '100%'} display='flex' alignItems='center' justifyContent='center' backgroundColor='rgb(255,230,234)' flexDirection='column' borderRadius='5px' sx={{ border: `1px solid ${shades.secondary[100]}` }}>
                        {!searchTerm && (
                            <Typography color={shades.secondary[400]} variant='h6' sx={{ marginLeft: '10px' }}>Top Rated</Typography>
                            )}
                        {searchItems.map((item, index) => (
                            <SearchResult 
                                key={index}
                                image={`http://localhost:2000${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                                name={item?.attributes?.name}
                                price={item?.attributes?.price}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default SearchMenu;
