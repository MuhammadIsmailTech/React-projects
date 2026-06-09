import React, { useState } from 'react'
import { Container, Button, Stack, Skeleton, Box, Chip } from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalBreakfastIcon from '@mui/icons-material/LocalBreakfast';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalDinnerIcon from '@mui/icons-material/LocalDinner';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const getMealIcon = (mealType) => {
  const icons = {
    'breakfast': <LocalBreakfastIcon sx={{ mr: 1 }} />,
    'brunch': <RestaurantIcon sx={{ mr: 1 }} />,
    'lunch': <LunchDiningIcon sx={{ mr: 1 }} />,
    'dinner': <LocalDinnerIcon sx={{ mr: 1 }} />,
    'snack': <FavoriteBorderIcon sx={{ mr: 1 }} />,
    'teatime': <LocalBreakfastIcon sx={{ mr: 1 }} />,
    'all': <RestaurantIcon sx={{ mr: 1 }} />
  };
  return icons[mealType.toLowerCase()] || <RestaurantIcon sx={{ mr: 1 }} />;
};

const Menu = ({ mealTypes, filterRecipes, isLoaded }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const handleFilter = (mealType) => {
    setActiveFilter(mealType);
    filterRecipes(mealType);
  };

  return (
    <Box sx={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4,
      mb: 3,
      boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.1)'
    }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              color: 'white',
              fontSize: '18px',
              fontWeight: '600',
              mb: 2,
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            Filter by Meal Type
          </Box>
        </Box>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {!isLoaded ? (
            <>
              <Skeleton animation="wave" sx={{ height: 45, width: 120, borderRadius: 3 }} />
              <Skeleton animation="wave" sx={{ height: 45, width: 120, borderRadius: 3 }} />
              <Skeleton animation="wave" sx={{ height: 45, width: 120, borderRadius: 3 }} />
            </>
          ) : (
            mealTypes.sort().map((mealType, i) => (
              <Button
                key={i}
                onClick={() => handleFilter(mealType)}
                startIcon={getMealIcon(mealType)}
                sx={{
                  background: activeFilter === mealType 
                    ? 'rgba(255, 255, 255, 0.95)' 
                    : 'rgba(255, 255, 255, 0.15)',
                  color: activeFilter === mealType ? '#667eea' : 'white',
                  fontWeight: activeFilter === mealType ? '700' : '500',
                  borderRadius: '20px',
                  px: 3,
                  py: 1.2,
                  textTransform: 'capitalize',
                  fontSize: '14px',
                  border: activeFilter === mealType ? '2px solid white' : 'none',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.3)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
                  }
                }}
              >
                {mealType}
              </Button>
            ))
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Menu
