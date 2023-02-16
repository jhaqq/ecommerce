import React from 'react'
import { useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Box, IconButton, Typography, uesMediaQuery, useMediaQuery } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

import images from '../../assetsMain'
import { shades } from '../../theme';


const MainCarousel = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isSearchOpen = useSelector((state) => state.cart.isSearchOpen);

    return (
        <Carousel 
            
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            renderArrowPrev={(onClickHandler, hasPrev, label) => (
                    <IconButton
                        onClick={onClickHandler}
                        sx={{ 
                            position:'absolute',
                            top:'50%',
                            left:'0',
                            color:'white',
                            padding:'5px',
                            zIndex: isNonMobile ? '10' : '0'
                        }}
                    >
                        <NavigateBefore sx={{ fontSize: 40 }}/>
                    </IconButton>
            )}
            renderArrowNext={(onClickHandler, hasNext, label) => (
                <IconButton
                    
                    onClick={onClickHandler}
                    sx={{ 
                        position:'absolute',
                        top:'50%',
                        right:'0',
                        color:'white',
                        padding:'5px',
                        zIndex: isNonMobile ? '10' : '-10'
                    }}
                >
                    <NavigateNext sx={{ fontSize: 40 }}/>
                </IconButton>
            )}
        >
            {images.map((img, index) => (
                <Box key={`carousel-image-${index}`}>
                    <img src={img} alt='img' style={{ width: '100%', height: '700px', objectFit: 'cover', backgroundAttachment: 'fixed' }}/>
                    <Box
                        color="white"
                        padding="20px"
                        borderRadius="1px"
                        textAlign="left"
                        backgroundColor="rgb(0, 0, 0, 0.4)"
                        position="absolute"
                        top="46%"
                        left={isNonMobile ? "10%" : "0"}
                        right={isNonMobile ? undefined : "0"}
                        margin={isNonMobile ? undefined : "0 auto"}
                        maxWidth={isNonMobile ? undefined : "240px"}
          >
                        <Typography color={shades.secondary[200]}>--NEW ITEMS</Typography>
                        <Typography variant='h1'>Summer Sale</Typography>
                        <Typography fontWeight='bold' color={shades.secondary[300]} sx={{ textDecoration: 'underline' }}>Discover More</Typography>
                    </Box>
                </Box>
            ))}
        </Carousel>
    )
}

export default MainCarousel;
