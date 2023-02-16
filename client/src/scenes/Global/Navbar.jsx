import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Box, IconButton, TextField } from '@mui/material';
import { PersonOutline, ShoppingBagOutlined, MenuOutlined, SearchOutlined } from '@mui/icons-material';

import { Icon, SearchMenu } from '../'
import { shades } from '../../theme'
import { setIsCartOpen, setIsSearchOpen, setShowAuth } from '../../state';
import { useEffect } from 'react';

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const isSearchOpen = useSelector((state) => state.cart.isSearchOpen);
  const showAuth = useSelector((state) => state.cart.showAuth);

  return (
    <Box
      display={!showAuth ? 'flex' : 'none'}
      alignItems='center'
      width='100%'
      height='60px'
      backgroundColor='rgba(255,255,255,.95)'
      color='black'
      position='fixed'
      top='0'
      left='0'
      zIndex='1'
    >
      <Box
        width='80%'
        margin='auto'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
          <Box onClick={() => navigate('/')} sx={{ cursor: 'pointer' }} color={shades.secondary[500]}>
            ECOMMER
          </Box>
          {!isSearchOpen && (
            <Box
                display='flex'  
                justifyContent='center'
                columnGap='20px'
                zIndex='2'
              >
                <Icon icon={<SearchOutlined />} action={() => dispatch(setIsSearchOpen({}))} />
                <IconButton sx={{ color: 'black' }} onClick={() => {navigate('/auth')}}>
                  <PersonOutline />
                </IconButton>
                <Badge badgeContent={cart.length} color='secondary' invisible={cart.length === 0} sx={{ '& .MuiBadge-badge': { right: 5, top: 5, padding: '0 4px', height: '14px', minWidth: '13px' } }}>
                  <Icon icon={<ShoppingBagOutlined />} action={() => dispatch(setIsCartOpen({}))} />
                </Badge>
            </Box>
          )}
      </Box>
    </Box>
  )
}

export default Navbar
