import { Button } from "@mui/material"
import Board from "../logic/Board";

export default function Cell({ element, move }) {

    let icon = Board.getIcon(element);

    return (
        <div style={{ position: 'relative', width: '30%', paddingBottom: '30%' }}>
            <Button
                aria-label="save"
                variant="contained"
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: 0,
                    border: "1px solid",
                    borderColor: "primary.main",
                    "& .MuiButton-startIcon": { margin: 0 }
                }}
                startIcon={icon}
                onClick={() => move()}
            ></Button>
        </div>

    )
}