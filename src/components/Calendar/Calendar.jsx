import { useState, useEffect, useRef } from "react";
import styles from "./Calendar.module.css";

const Calendar = ({ selectedDate, onSelectDate, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? new Date(selectedDate) : new Date()
  );
  const calendarRef = useRef(null);

  const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const prevMonthDays = [];
    let firstDayOfWeek = firstDay.getDay() || 7; 
    firstDayOfWeek--; 

   
    if (firstDayOfWeek > 0) {
      const prevMonth = new Date(year, month, 0);
      const prevMonthLastDay = prevMonth.getDate();

      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        prevMonthDays.push({
          date: new Date(year, month - 1, prevMonthLastDay - i),
          isCurrentMonth: false,
        });
      }
    }

    const currentMonthDays = [];
    for (let day = 1; day <= lastDay.getDate(); day++) {
      currentMonthDays.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
      });
    }

    const nextMonthDays = [];
    const totalDaysShown = 42; 
    const remainingDays =
      totalDaysShown - prevMonthDays.length - currentMonthDays.length;

    for (let day = 1; day <= remainingDays; day++) {
      nextMonthDays.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
      });
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  const goToPrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (date) => {
    onSelectDate(date);
    onClose();
  };

  const isDateSelected = (date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedMonth = `${
    monthNames[currentMonth.getMonth()]
  } ${currentMonth.getFullYear()}`;

  const days = getDaysInMonth();

  return (
    <div className={styles.calendarContainer} ref={calendarRef}>
      <div className={styles.calendarHeader}>
        <button className={styles.navButton} onClick={goToPrevMonth}>
          &#10094;
        </button>
        <div className={styles.monthTitle}>{formattedMonth}</div>
        <button className={styles.navButton} onClick={goToNextMonth}>
          &#10095;
        </button>
      </div>

      <div className={styles.weekdaysContainer}>
        {weekdays.map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.daysGrid}>
        {days.map((day, index) => (
          <button
            key={index}
            className={`${styles.dayButton} 
              ${day.isCurrentMonth ? "" : styles.otherMonth}
              ${isDateSelected(day.date) ? styles.selected : ""}
              ${isToday(day.date) ? styles.today : ""}`}
            onClick={() => handleDateClick(day.date)}
            disabled={!day.isCurrentMonth}
          >
            {day.date.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
