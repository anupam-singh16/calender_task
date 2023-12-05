import { Box, Button, Container, CssBaseline, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import BasicTable from "./Table";

const Calender = () => {
    const [selectedTimeZone, setSelectedTimeZone] = useState();

    const [currentWeekStart, setCurrentWeekStart] = useState(new Date());



    const getWeekBounds = (startDate) => {
        const startOfWeek = new Date(startDate);
        const endOfWeek = new Date(startDate);
        const day = startDate.getDay();

        startOfWeek.setDate(startDate.getDate() - (day === 0 ? 6 : day - 1));

        endOfWeek.setDate(startOfWeek.getDate() + 4);

        return { startOfWeek, endOfWeek };
    };

    const renderWeekDays = (startDate, endDate) => {
        const weekDaysWithDates = [];
        const formatter = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });

        for (let i = 0; i < 5; i++) {
            const currentDay = new Date(startDate);
            currentDay.setDate(startDate.getDate() + i);

            const formattedDate = formatter.format(currentDay);
            weekDaysWithDates.push(
                <div key={i}>
                    {formattedDate}
                </div>
            );
        }

        return weekDaysWithDates;
    };

    const goToNextWeek = () => {
        const nextWeekStart = new Date(currentWeekStart);
        nextWeekStart.setDate(currentWeekStart.getDate() + 7);
        setCurrentWeekStart(nextWeekStart);
    };

    const goToPreviousWeek = () => {
        const previousWeekStart = new Date(currentWeekStart);
        previousWeekStart.setDate(currentWeekStart.getDate() - 7);
        setCurrentWeekStart(previousWeekStart);
    };

    const { startOfWeek, endOfWeek } = getWeekBounds(currentWeekStart);
    const currentWeekDays = renderWeekDays(startOfWeek, endOfWeek);


    function TimeCheckboxGenerator() {
        const handleTimeZoneChange = (event) => {
            setSelectedTimeZone(event.target.value);
        };



        return (
            <div>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Time-Zone</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Time-Zone"
                        value={selectedTimeZone}
                        onChange={handleTimeZoneChange}
                    >
                        <MenuItem value="Asia/Kolkata">India Standard Time (IST)</MenuItem>
                        <MenuItem value="America/New_York">Eastern Time (ET)</MenuItem>
                    </Select>
                </FormControl>

            </div>

        );
    }


    

    function getCurrentDate() {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ];
        
          const currentDate = new Date();
          const month = months[currentDate.getMonth()];
          const day = currentDate.getDate();
          const year = currentDate.getFullYear();
        
          return `${month} ${day} ${year}`;
    }




    return (
        <div>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ bgcolor: '#f3d89f', height: 'fit-content', width: '100%' }} >
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        justifyContent={'space-between'}
                        padding={5}
                    >
                        <Button variant="contained" color="success"  onClick={goToPreviousWeek} >
                            Prev Week
                        </Button>
                        <h4 style={{
                            textDecoration: "underline  blue"
                        }} >{getCurrentDate()}</h4>
                        <Button variant="contained" color="success"  onClick={goToNextWeek} >
                            Next Week
                        </Button>
                    </Stack>
                    <Stack

                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        padding={5}
                    >
                        <InputLabel style={{ textAlign: 'start'}}   id="demo-simple-select-label">Example</InputLabel>
                        {TimeCheckboxGenerator()}
                    </Stack>


                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        padding={5}
                    >
                        <BasicTable days={currentWeekDays} selectedTimeZone={selectedTimeZone} />
                    </Stack>


                </Box>
            </Container>
        </div>
    );
}

export default Calender;