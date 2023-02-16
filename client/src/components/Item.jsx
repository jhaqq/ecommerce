import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IconButton, Box, Typography, useTheme, Button } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

import Icon from '../components/Icon'
import { shades } from '../theme'
import { addToCart } from '../state';
const Item = ({ item, width }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const [hovered, setHovered] = useState(false);

    const { 
        palette: { neutral },
     } = useTheme();

    const { category, price, name, image } = item.attributes;

    const { 
        data: {
            attributes: {
                formats: {
                    medium: { url },
                }
            }
        }
    } = image;

    return (
        <Box width={width}>
            <Box position='relative' onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)}>
                <img src={`http://localhost:2000${url}`} alt={item.name} width='300px' height='400px' onClick={() => navigate(`/item/${item.id}`)} style={{ cursor: 'pointer' }}/>
                <Box display={hovered ? 'block' : 'none'} position='absolute' bottom='10%' left='0' width='100%' padding='0 5%'>
                    <Box display='flex' justifyContent='space-between'>
                        <Box display='flex' alignItems='center' backgroundColor={shades.neutral[100]} borderRadius='3px'>
                            <Icon icon={<Remove />} action={() => setCount(Math.max(count - 1, 1))} />
                            <Typography color={shades.primary[300]}>{count}</Typography>
                            <Icon icon={<Add />} action={() => setCount((prevCount) => prevCount + 1)} />
                        </Box>
                        <Button onClick={() => dispatch(addToCart({ item: { ...item, count } }))} sx={{ backgroundColor: shades.primary[300], color: 'white' }}>
                            Add to cart
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Box mt='3px'>
                <Typography variant='subtitle2' color={neutral.dark}>
                    {category
                        // .replace(/[A-Z])/g, ' $1')
                        // .replace(/^./, (str) => str.toUpperCase())
                    }
                </Typography>
                <Typography>{name}</Typography>
                <Typography fontWeight='bold'>${price}</Typography>
            </Box>

        </Box >
    )
}

export default Item
