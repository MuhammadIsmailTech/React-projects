import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Divider, Button, Typography, Stack, Box, Paper, TablePagination } from "@mui/material";
import { useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const IngredientsDialog = ({ recipe, handleClose, open }) => {

  const { label, ingredients, url } = recipe.recipe;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedIngredients = ingredients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
        }
      }}
    >
      <DialogTitle sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: 2.5
      }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h6" sx={{ fontWeight: '700', mb: 0.5 }}>
              📋 {label.length > 25 ? label.substr(0, 25) + "..." : label}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              {ingredients.length} ingredients
            </Typography>
          </Box>
          <Button 
            onClick={handleClose} 
            variant="contained" 
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)',
              }
            }}
          >
            ✕
          </Button>
        </Stack>
      </DialogTitle>
      <Divider />

      {/* Ingredients Count */}
      <Box sx={{ px: 3, py: 2, background: 'rgba(102, 126, 234, 0.05)', }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <CheckCircleIcon sx={{ color: '#667eea', fontSize: 20 }} />
          <Typography variant="body2" sx={{ color: '#666', fontWeight: '500' }}>
            Total ingredients: {ingredients.length}
          </Typography>
        </Stack>
      </Box>

      {/* Ingredients Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 0, boxShadow: 'none', border: 'none' }}>
        <Table aria-label="ingredients table">
          <TableHead>
            <TableRow sx={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)' }}>
              <TableCell sx={{ fontWeight: '700', color: '#667eea', borderBottom: '2px solid rgba(102, 126, 234, 0.2)' }}>
                Ingredient
              </TableCell>
              <TableCell 
                align="right"
                sx={{ fontWeight: '700', color: '#667eea', borderBottom: '2px solid rgba(102, 126, 234, 0.2)' }}
              >
                Weight (g)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedIngredients.map((ingredient, i) => (
              <TableRow
                key={i}
                sx={{ 
                  '&:hover': {
                    background: 'rgba(102, 126, 234, 0.05)',
                  },
                  '&:last-child td, &:last-child th': { border: 0 },
                  borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                }}
              >
                <TableCell component="th" scope="row" sx={{ py: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: '500', color: '#1a1a2e' }}>
                    {ingredient.text}
                  </Typography>
                </TableCell>
                <TableCell 
                  align="right"
                  sx={{ py: 2 }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: '600',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {ingredient.weight.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {ingredients.length > 5 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={ingredients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              background: 'rgba(102, 126, 234, 0.05)',
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                color: '#667eea',
                fontWeight: '600',
              }
            }}
          />
        )}
      </TableContainer>

      <Divider />
      <DialogActions sx={{ p: 3 }}>
        <Button
          variant="outlined"
          sx={{
            borderColor: '#667eea',
            color: '#667eea',
            textTransform: 'none',
            fontWeight: '600',
            borderRadius: '8px',
          }}
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          variant="contained"
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            textTransform: 'none',
            fontWeight: '600',
            borderRadius: '8px',
          }}
          onClick={() => window.open(url)}
        >
          Full Recipe →
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IngredientsDialog;
