import React, { useState } from 'react'
import { Box, InputBase, Divider, Typography, IconButton } from '@mui/material';
import { MarkEmailReadOutlined } from '@mui/icons-material';
import Icon from '../../components/Icon';

const Subscribe = () => {

    const [email, setEmail] = useState('');

    return (
        <Box width='80%' margin='80px auto' textAlign='center'>
            <Icon icon={<MarkEmailReadOutlined fontSize='large'/>} />
            <Typography variant='h3'>Subscribe to our Newsletter</Typography>
            <Typography>and receive a $20 coupon on your first order when you checkout.</Typography>
            <Box p='2px 4px' m='15px auto' display='flex' alignItems='center' width='75%' backgroundColor='#f2f2f2'>
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} value={email} />
                <Divider />
                <Typography sx={{ p: '10px', ':hover': { cursor: 'pointer' } }}>Subscribe</Typography>
            </Box>
        </Box>
    )
}

export default Subscribe
