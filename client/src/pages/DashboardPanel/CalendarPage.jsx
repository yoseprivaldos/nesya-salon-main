import { useState } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import Header from "../../components/dashboard/Header";

const CalendarPage = () => {
  const theme = useTheme();
  const [currentEvent, setCurrentEvent] = useState([]);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter e new tittle for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(`Kamu yakin menghapus jadwal? '${selected.event.title}'`)
    ) {
      selected.event.remove();
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Jadwal Salon" />

      <Box display="flex"></Box>
    </Box>
  );
};

export default CalendarPage;
