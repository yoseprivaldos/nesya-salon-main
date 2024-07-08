/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { formatDate } from "@fullcalendar/core";
import idLocale from "@fullcalendar/core/locales/id";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import Header from "../../components/dashboard/Header";
import {
  useCreateScheduleMutation,
  useGetAllScheduleQuery,
  useDeleteScheduleMutation,
} from "../../redux/api/api";
import { useLocation } from "react-router-dom";

const CalendarPage = () => {
  const location = useLocation();
  const theme = useTheme();
  const {
    data: schedules,
    error,
    isLoading,
    refetch,
  } = useGetAllScheduleQuery();
  const [createSchedule] = useCreateScheduleMutation();
  const [deleteSchedule] = useDeleteScheduleMutation();
  const [currentEvents, setCurrentEvents] = useState([]);
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    date: "",
    startTime: "",
    endTime: "",
    type: "",
    notes: "",
  });
  const [todayDate, setTodayDate] = useState(new Date()); // State to hold today's date

  useEffect(() => {
    if (schedules) {
      // data kalender (semua event)
      const events = schedules.map((schedule) => {
        let title = "";
        if (schedule.type === "reservation" && schedule.reservation) {
          title = schedule.reservation.reservationName;
        } else {
          title = schedule.notes;
        }
        return {
          id: schedule._id,
          title: title,
          start:
            new Date(schedule.date).toISOString().split("T")[0] +
            "T" +
            schedule.startTime,
          end:
            new Date(schedule.date).toISOString().split("T")[0] +
            "T" +
            schedule.endTime,
          type: schedule.type,
        };
      });
      setCurrentEvents(events);
      // Data untuk list "Jadwal Hari Ini" (hanya event hari ini)
      const today = new Date();
      const options = {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      const todayString = today.toLocaleDateString("id-ID", options);
      const todaysEvents = schedules
        .filter((schedule) => {
          const scheduleDate = new Date(schedule.date)
            .toLocaleDateString("id-Id")
            .split("T")[0];
          return scheduleDate === todayString;
        })
        .map((schedule) => {
          let title = "";
          if (schedule.type === "reservation" && schedule.reservation) {
            title = schedule.reservation.reservationName;
          } else {
            title = schedule.notes;
          }
          return {
            id: schedule._id,
            title: title,
            start:
              new Date(schedule.date).toISOString().split("T")[0] +
              "T" +
              schedule.startTime,
            end:
              new Date(schedule.date).toISOString().split("T")[0] +
              "T" +
              schedule.endTime,
          };
        });
      setTodaysEvents(todaysEvents);
      setTodayDate(today); // Set today's date in state
    }
  }, [schedules]);

  const handleDateClick = (selected) => {
    setNewEvent((prev) => ({
      ...prev,
      date: selected.startStr,
      startTime: "",
      endTime: "",
      type: "",
      notes: "",
    }));
    setOpen(true);
  };

  const handleEventClick = async (selected) => {
    if (
      window.confirm(
        `Apakah kamu yakin menghapus jadwal '${selected.event.title}'`
      )
    ) {
      try {
        // Temukan event yang sesuai berdasarkan ID
        const clickedEvent = currentEvents.find(
          (event) => event.id === selected.event.id
        );

        if (clickedEvent) {
          // Cek jika event bertipe "reservation"
          if (clickedEvent.type === "reservation") {
            alert(
              "Kamu tidak bisa menghapus reservasi dari sini, lakukan melalui pembatalan reservasi"
            );
            return;
          }
          // Lakukan penghapusan event di sini
          await deleteSchedule(selected.event.id).unwrap();
          await refetch();
          alert(`Jadwal '${selected.event.title}' berhasil dihapus`);
        }
      } catch (error) {
        console.log("Failed to delete schedule", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      const eventData = {
        ...newEvent,
        date: new Date(newEvent.date),
      };
      await createSchedule(eventData).unwrap();
      setOpen(false);
      setNewEvent({
        date: "",
        startTime: "",
        endTime: "",
        type: "",
        notes: "",
      });
    } catch (error) {
      console.error("Failed to create schedule:", error);
    }
  };

  const selectAllow = (selectInfo) => {
    const selectedDate = new Date(selectInfo.startStr);
    return selectedDate >= todayDate; // Allow selection if selected date is today or in the future
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="JADWAL SALON" />

      <Box display="flex">
        <Box
          flex="1 1 20%"
          backgroundColor={theme.palette.background.alt}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Jadwal Hari ini</Typography>
          <List
            sx={{
              maxHeight: "calc(110vh - 300px)",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none", // Internet Explorer 10+
              "scrollbar-width": "none", // Firefox
            }}
          >
            {todaysEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                      {" - "}
                      {formatDate(event.end, {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box flex="1 1 80%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next,today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            events={currentEvents}
            select={handleDateClick}
            eventClick={handleEventClick}
            locale={idLocale}
            selectAllow={selectAllow} // Pass the selectAllow function
          />
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Buat Jadwal Baru</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Silakan isi detail untuk jadwal baru.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="date"
            label="Tanggal"
            type="date"
            fullWidth
            value={newEvent.date.split("T")[0]}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="startTime"
            label="Waktu Mulai"
            type="time"
            fullWidth
            value={newEvent.startTime}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="endTime"
            label="Waktu Selesai"
            type="time"
            fullWidth
            value={newEvent.endTime}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="type"
            label="Tipe"
            select
            fullWidth
            value={newEvent.type}
            onChange={handleInputChange}
          >
            <MenuItem value="holiday">Holiday</MenuItem>
            <MenuItem value="break">Break</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            name="notes"
            label="Catatan"
            type="text"
            fullWidth
            value={newEvent.notes}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button onClick={handleSave} color="primary">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CalendarPage;
