import { useState } from 'react';
import { toast } from 'react-toastify';
import Calendar from '../Calendar/Calendar';
import styles from './BookingForm.module.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bookingDate: '',
    comment: '',
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    setFormData({
      ...formData,
      bookingDate: `${day}.${month}.${year}`,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.bookingDate) {
      toast.error('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      toast.success('Your booking has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        bookingDate: '',
        comment: '',
      });
      setSelectedDate(null);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className={styles.bookingFormContainer}>
      <h2 className={styles.formTitle}>Book your car now</h2>
      <p className={styles.formSubtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="name"
            placeholder="Name*"
            className={styles.formInput}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            className={styles.formInput}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <div className={styles.datePickerContainer}>
            <input
              type="text"
              name="bookingDate"
              placeholder="Booking date*"
              className={styles.formInput}
              value={formData.bookingDate}
              onClick={toggleCalendar}
              readOnly
              required
            />
            <span className={styles.calendarIcon} onClick={toggleCalendar}>
              <svg width="18" height="18">
                <use href="/src/images/sprite.svg#icon-calendar"></use>
              </svg>
            </span>

            {showCalendar && (
              <Calendar
                selectedDate={selectedDate}
                onSelectDate={handleDateSelect}
                onClose={() => setShowCalendar(false)}
              />
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <textarea
            name="comment"
            placeholder="Comment"
            className={styles.formTextarea}
            value={formData.comment}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
