import io from 'socket.io-client';
import EventEmitter from "events";
import QuestionMark from '@mui/icons-material/QuestionMark';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ClearIcon from '@mui/icons-material/Clear';

const socket = io(process.env.REACT_APP_BACK_END_URL ||  "ws://localhost:8000");

const ICONS = [undefined, (<RadioButtonUncheckedIcon></RadioButtonUncheckedIcon>), (<ClearIcon></ClearIcon>)]

const Board = {

    getIcon: (icon) => {
        if(isNaN(icon)) {
            return (<QuestionMark></QuestionMark>);
        }
        else {
            return ICONS[icon];
        }
    },

    getUUID: () => {
        return sessionStorage.getItem("tic-tac-toe-user-id");
    },

    move : (i, j) => {
        let uuid = Board.getUUID();
        socket.emit('move', {
            uuid, i, j
        });
        
    },

    startNewGame : (callback) => {
        let uuid = Board.getUUID();
        socket.emit('new-game', {uuid}, (response) => {
            callback(response);
        });
    },

    register : (callback) => {
        
        let uuid = Board.getUUID();
        socket.emit('register', {uuid}, (response) => {
            sessionStorage.setItem("tic-tac-toe-user-id", response.uuid);
            callback(response);
        });
    },

    leaveGame : (callback) => {
        let uuid = Board.getUUID();
        socket.emit("leave", {uuid}, callback);
    },

    moveEmitter : () => {
        let returnEventEmitter = new EventEmitter();

        socket.on('game-update', (arg) => {
            returnEventEmitter.emit('game-update', arg);
        })

        return returnEventEmitter;
    },

    getSocket: () => {
        return socket;
    }
};

export default Board;