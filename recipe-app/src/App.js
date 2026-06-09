import Header from "./components/Header";
import Searchbar from "./components/Searchbar";
import RecipeContainer from "./components/RecipeContainer";
import axios from "axios";
import { useEffect, useState } from "react";
import { Typography, Container, Box, CircularProgress, Stack } from "@mui/material";
import Menu from "./components/Menu";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const [recipes, setRecipes] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [recipeList, setRecipeList] = useState([]);
  const [mealTypes, setMealTypes] = useState(null);

  const [darkMode, setDarkMode] = useState(false);

  const getRecipes = async (search, healthLabel) => {
    setIsLoaded(false);
    const uri = `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=beff2f47&app_key=${process.env.REACT_APP_API_KEY}&health=${healthLabel}`;
    try {
      await axios.get(uri).then((res) => {
        setRecipes(res.data.hits);
        setRecipeList(res.data.hits);
        setMealTypes([
          ...new Set(res.data.hits.map((elem) => elem.recipe.mealType[0])),
          "All",
        ]);
        setIsLoaded(true);
      });
    } catch (error) {
      console.log(error);
      setIsLoaded(true);
    }
  };

  const filterRecipes = (mealType) => {
    if (mealType === "All") {
      setRecipeList(recipes);
    } else {
      const filteredRecipe = recipes.filter((elem) => {
        return elem.recipe.mealType[0] === mealType;
      });
      setRecipeList(filteredRecipe);
    }
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#667eea",
        light: "#8b9ef0",
        dark: "#5568d3",
      },
      secondary: {
        main: "#764ba2",
        light: "#8d5db8",
        dark: "#5a3680",
      },
      background: {
        default: darkMode ? "#1a1a2e" : "#f5f7fa",
        paper: darkMode ? "#16213e" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#e0e0e0" : "#1a1a2e",
        secondary: darkMode ? "#b0b0b0" : "#666666",
      },
    },
    typography: {
      fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', sans-serif",
      h5: {
        fontWeight: '700',
        letterSpacing: '0.5px',
      },
      h6: {
        fontWeight: '600',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: '600',
            borderRadius: '8px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  });

  useEffect(() => {
    getRecipes("pasta", "vegan");
  }, [])

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        background: darkMode 
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}>
        <Header toggleTheme={toggleTheme} />
        <Searchbar getRecipes={getRecipes} />

        {!mealTypes && undefined}

        {mealTypes && (
          <Menu
            mealTypes={mealTypes}
            filterRecipes={filterRecipes}
            isLoaded={isLoaded}
          />
        )}

        {!recipes && isLoaded === false && (
          <Container maxWidth="sm">
            <Stack 
              direction="column" 
              alignItems="center" 
              justifyContent="center"
              sx={{ mt: 8, minHeight: '300px' }}
              spacing={2}
            >
              <CircularProgress 
                size={60}
                sx={{
                  color: '#667eea',
                }}
              />
              <Typography 
                variant="h5" 
                align="center"
                sx={{
                  color: darkMode ? '#e0e0e0' : '#1a1a2e',
                  fontWeight: '600',
                }}
              >
                🍽️ Fetching delicious pasta recipes...
              </Typography>
            </Stack>
          </Container>
        )}

        {recipes && isLoaded && (
          <RecipeContainer
            recipeList={recipeList.length === 0 ? recipes : recipeList}
            isLoaded={isLoaded}
          />
        )}

      </Box>
    </ThemeProvider>
  );
}

export default App;
