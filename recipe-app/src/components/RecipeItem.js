import { useState } from "react";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
  Stack,
  Chip,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import IngredientsDialog from "./IngredientsDialog";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

const RecipeItem = ({ recipe, isLoaded }) => {

  const { image, label, cuisineType, url } = recipe.recipe;

  const [open, setOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <IngredientsDialog
        recipe={recipe}
        open={open}
        handleClose={handleClose}
      />

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '1px solid rgba(102, 126, 234, 0.1)',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 28px rgba(102, 126, 234, 0.25)',
              border: '1px solid rgba(102, 126, 234, 0.3)',
            }
          }}
        >
          {/* Image Container */}
          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            {!isLoaded ? (
              <Skeleton
                sx={{ height: 200 }}
                animation="wave"
                variant="rectangular"
              />
            ) : (
              <>
                <CardMedia
                  component="img"
                  alt={label}
                  height="200"
                  image={image}
                  draggable="false"
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                />
                {/* Overlay Actions */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                    }
                  }}
                >
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Add to Favorites">
                      <IconButton
                        onClick={toggleFavorite}
                        sx={{
                          background: 'white',
                          color: isFavorite ? '#e74c3c' : '#667eea',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.9)',
                            transform: 'scale(1.1)',
                          }
                        }}
                      >
                        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Share Recipe">
                      <IconButton
                        sx={{
                          background: 'white',
                          color: '#667eea',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.9)',
                            transform: 'scale(1.1)',
                          }
                        }}
                      >
                        <ShareIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
              </>
            )}
          </Box>

          {/* Content */}
          <CardContent sx={{ flexGrow: 1, pb: 1 }}>
            <Typography 
              gutterBottom 
              variant="h6" 
              component="div"
              sx={{
                fontWeight: '700',
                mb: 1,
                color: '#1a1a2e',
                minHeight: '50px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {!isLoaded ? (
                <Skeleton animation="wave" width="100%" />
              ) : (
                <>{label.length > 40 ? label.substr(0, 40) + "..." : label}</>
              )}
            </Typography>

            {!isLoaded ? (
              <Skeleton animation="wave" sx={{ height: 30, width: '70%' }} />
            ) : (
              <Chip 
                icon={<RestaurantMenuIcon />}
                label={"Cuisine: " + cuisineType} 
                sx={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                  color: '#667eea',
                  fontWeight: '600',
                  mb: 2
                }}
              />
            )}
          </CardContent>

          {/* Action Buttons */}
          <Stack spacing={1.5} sx={{ p: 2, pt: 0 }}>
            {!isLoaded ? (
              <>
                <Skeleton animation="wave" sx={{ height: 40, borderRadius: 1 }} />
                <Skeleton animation="wave" sx={{ height: 40, borderRadius: 1 }} />
              </>
            ) : (
              <>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setOpen(true)}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    textTransform: 'none',
                    fontWeight: '600',
                    py: 1,
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(102, 126, 234, 0.3)',
                    }
                  }}
                >
                  View Ingredients
                </Button>

                <Button 
                  href={url} 
                  target="_blank" 
                  fullWidth 
                  variant="outlined"
                  sx={{
                    borderColor: '#667eea',
                    color: '#667eea',
                    textTransform: 'none',
                    fontWeight: '600',
                    py: 1,
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(102, 126, 234, 0.1)',
                      borderColor: '#667eea',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  Full Recipe
                </Button>
              </>
            )}
          </Stack>
        </Card>
      </Grid>
    </>
  );
};

export default RecipeItem;
