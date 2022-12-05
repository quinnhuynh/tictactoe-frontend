

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { getListSubheaderUtilityClass, Stack } from '@mui/material';
import Board from '../logic/Board';
import Cell from './Cell';
import ButtonAppBar from './NavBar';

export default function BoardComponent() {

    const [currentGameState, setCurrentGameState] = React.useState({});
    
    let getUser = () => {
        let icon = undefined;
        if(currentGameState?.game) {
            icon = currentGameState.game.players
            .indexOf(currentGameState.uuid) + 1;
        }
        return icon;
    }

    useEffect(() => {
        Board.register((response) => {
            setCurrentGameState(response);
        });
    });

    let move = (i, j) => {
        Board.move(i, j);
    }

    let start = () => {
        Board.startNewGame((response) => {
            setCurrentGameState(response);
        });
    }

    let leave = () => {
        Board.leaveGame((response) => {
            setCurrentGameState(response);
        });
    }

    let getPlayerText = () => {
        let player = currentGameState?.uuid;
        let opponent;
        if(!currentGameState.game) {
            return undefined;
        }
        else {
            opponent = currentGameState.game.players
            .find((e) => e !== player);
        }
        console.log(player + " " + opponent);
        if(opponent) {
            return <Typography>{`${player} vs ${opponent}`}</Typography>;
        }
        else {
            return undefined;
        }
    }

    let getTextForLabel = () => {
        let uuid = Board.getUUID();
        let player = currentGameState.game.player;
        let winner = currentGameState.game.winner;
        let currentPlayer = currentGameState.game.players[player - 1];
        if (winner === null) {
            return (<Typography sx={{
                color: 'blue'
            }}>YOU TIE</Typography>);
        }
        else if (winner) {
            return (currentGameState.game.players[winner - 1] === uuid)
                ? (<Typography sx={{
                    color: 'red'
                }}>YOU WIN</Typography>)
                : (<Typography sx={{
                    color: 'green'
                }}>YOU LOSE</Typography>);
        }
        return (<Typography>{(currentPlayer === uuid) ? "YOUR TURN!" : "OPPONENT'S TURN!"}</Typography>);
    }

    let moveEmitter = Board.moveEmitter();

    moveEmitter.on('game-update', (response) => {
        setCurrentGameState(response);
    });

    let game = currentGameState?.game;
    let queuePosition = currentGameState?.queuePosition;

    let returnComponent = [];

    returnComponent
    .push(<ButtonAppBar key='nav-bar' icon={getUser()}></ButtonAppBar>)

    if (game) {
        returnComponent.push (
            <Box key='game-board' sx={{ justifyContent: 'center' }}>
                <Stack sx={{ with: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    {/* {getPlayerText()} */}
                    {getTextForLabel()}
                    <Button sx={{ width: '30%' }} onClick={leave} variant="contained" color="error" >LEAVE CURRENT GAME</Button>
                </Stack>
                <Stack sx={{ with: '100%', justifyContent: 'center' }}>
                    <Stack sx={{ with: '100%' }} >
                        {game.boardList.map((row, i) => {
                            return (
                                <Stack direction='row' key={'row-' + i} justifyContent='center'>
                                    {row.map((e, j) => {
                                        return (
                                            <Cell key={'cell-' + i + '-' + j} element={e} move={() => move(i, j)}>
                                            </Cell>
                                        )
                                    })}
                                </Stack>
                            );
                        })}
                    </Stack>
                </Stack>

            </Box>
        );
    }
    else if (queuePosition) {
        returnComponent.push (
            <Stack key = 'queue'sx={{ width: '100%', justifyContent: 'center' }}>
                <Typography>You are in queue. Good luck!</Typography>
            </Stack>

        );
    }
    else {
        returnComponent.push (
            <Stack key = 'start-game' sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Button sx={{ width: '30%' }} onClick={start} variant='contained'>NEW GAME</Button>
            </Stack>
        );
    }

    return (
        <div>
            {returnComponent}
        </div>
    )

}