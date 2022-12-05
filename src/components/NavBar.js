import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Board from '../logic/Board';

export default function ButtonAppBar({icon}) {

  return (
    <Box sx={{ flexGrow: 1, textAlign:'center'}}>
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tic Tac Toe PvP
          </Typography>
          {Board.getIcon(icon)}
        </Toolbar>
      </AppBar>
    </Box>
  );
}