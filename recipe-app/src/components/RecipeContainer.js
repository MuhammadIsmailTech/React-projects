import React from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import RecipeItem from "./RecipeItem";

const RecipeContainer = ({ recipeList, isLoaded }) => {

  return (
    <Container maxWidth="lg" sx={{ py: 6, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{
            fontWeight: '800',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1
          }}
        >
          🍴 Recipes Found
        </Typography>
        <Typography 
          variant="body2" 
          sx={{
            color: '#666',
            fontSize: '14px'
          }}
        >
          Discover {recipeList?.length || 0} delicious recipes
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {recipeList.map((recipe, i) => (
          <RecipeItem recipe={recipe} isLoaded={isLoaded} key={i}/>
        ))}
      </Grid>
    </Container>
  );
};

export default RecipeContainer;
