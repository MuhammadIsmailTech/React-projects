import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Switch,
  IconButton,
  Tooltip,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Header = ({ toggleTheme }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static"
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Toolbar sx={{ py: 1.5, px: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5
            }}
          >
            <Box
              sx={{
                background: 'rgba(255, 255, 255, 0.2)',
                p: 1,
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <MenuBookIcon sx={{ fontSize: 28, color: 'white' }} />
            </Box>
            <Box>
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #fff 0%, #f0f0f0 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '0.5px'
                }}
              >
                RecipeHub
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '11px',
                  letterSpacing: '1px'
                }}
              >
                DISCOVER DELICIOUS MEALS
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              px: 2,
              py: 0.5,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <Tooltip title="Light Mode">
              <LightModeIcon sx={{ fontSize: 20, color: 'white' }} />
            </Tooltip>
            <Switch 
              onChange={() => toggleTheme()}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: 'white',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            />
            <Tooltip title="Dark Mode">
              <DarkModeIcon sx={{ fontSize: 20, color: 'white' }} />
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
