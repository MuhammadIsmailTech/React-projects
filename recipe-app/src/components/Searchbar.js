import { useState } from "react";
import { Container, Stack, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TuneIcon from '@mui/icons-material/Tune';

const Searchbar = ({ getRecipes }) => {
  const [search, setSearch] = useState("Pasta");
  const [healthLabel, setHealthLabel] = useState("vegan");

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getRecipes(search, healthLabel);
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: 4, mb: 5 }}>
      <Box sx={{
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
        borderRadius: '16px',
        p: 3,
        border: '1px solid rgba(102, 126, 234, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          {/* Search Input */}
          <Paper
            component="form"
            sx={{
              p: "12px 16px",
              display: "flex",
              alignItems: "center",
              flex: 1,
              borderRadius: '12px',
              background: 'white',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 4px 16px rgba(102, 126, 234, 0.15)',
                borderColor: 'rgba(102, 126, 234, 0.4)'
              },
              '&:focus-within': {
                boxShadow: '0 4px 16px rgba(102, 126, 234, 0.2)',
                borderColor: '#667eea'
              }
            }}
            onSubmit={(e) => e.preventDefault()}
          >
            <InputBase
              sx={{ 
                ml: 1, 
                flex: 1,
                '& input': {
                  fontSize: '15px',
                  fontWeight: '500',
                }
              }}
              placeholder="Search recipes, ingredients, cuisine..."
              inputProps={{ "aria-label": "search recipes" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <IconButton
              type="submit"
              sx={{ 
                p: "8px",
                color: '#667eea',
                '&:hover': {
                  background: 'rgba(102, 126, 234, 0.1)'
                }
              }}
              aria-label="search"
              onClick={() => getRecipes(search, healthLabel)}
            >
              <SearchIcon />
            </IconButton>
          </Paper>

          {/* Health Label Filter */}
          <Paper sx={{
            p: "12px 16px",
            borderRadius: '12px',
            background: 'white',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(102, 126, 234, 0.2)',
            transition: 'all 0.3s ease',
            minWidth: { xs: '100%', sm: '220px' },
            '&:hover': {
              boxShadow: '0 4px 16px rgba(102, 126, 234, 0.15)',
              borderColor: 'rgba(102, 126, 234, 0.4)'
            }
          }}>
            <FormControl fullWidth sx={{ minWidth: 200 }}>
              <InputLabel 
                id="health-select-label"
                sx={{
                  '&.Mui-focused': {
                    color: '#667eea'
                  }
                }}
              >
                Diet Type
              </InputLabel>
              <Select
                labelId="health-select-label"
                value={healthLabel}
                label="Diet Type"
                onChange={(e) => setHealthLabel(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  }
                }}
                startAdornment={<TuneIcon sx={{ mr: 1, color: '#667eea' }} />}
              >
                <MenuItem value="vegan">🌱 Vegan</MenuItem>
                <MenuItem value="vegetarian">🥕 Vegetarian</MenuItem>
                <MenuItem value="paleo">🍗 Paleo</MenuItem>
                <MenuItem value="dairy-free">🥛 Dairy-Free</MenuItem>
                <MenuItem value="gluten-free">🌾 Gluten-Free</MenuItem>
                <MenuItem value="wheat-free">🚫 Wheat-Free</MenuItem>
                <MenuItem value="low-sugar">🍬 Low-Sugar</MenuItem>
                <MenuItem value="egg-free">🥚 Egg-Free</MenuItem>
                <MenuItem value="peanut-free">🥜 Peanut-Free</MenuItem>
                <MenuItem value="soy-free">🫘 Soy-Free</MenuItem>
                <MenuItem value="fish-free">🐟 Fish-Free</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Stack>
      </Box>
    </Container>
  );
};

export default Searchbar;
