import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TimeCheckboxGenerator from './TimeCheckboxGenerator';




const  BasicTable = ({ days, selectedTimeZone }) => {

    function getCurrentFormattedDate() {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
        const currentDate = new Date();
        const dayName = days[currentDate.getDay()];
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString();
    
        return `${dayName}, ${month}/${day}`;
    }
    
    const formattedDate = getCurrentFormattedDate();
    console.log(formattedDate);  
    
 

  


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Weeks</TableCell>
                        <TableCell align="left"></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {days?.map((row, i) => (
                        <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" style={{
                                color: row?.props?.children === formattedDate ? "red" : "black",
                            }} >
                               {row?.props?.children}
                            </TableCell>
                            <TableCell align="left">
                            <TimeCheckboxGenerator selectedTimeZone={selectedTimeZone} day={days} apiDate={row?.props?.children} />
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default BasicTable