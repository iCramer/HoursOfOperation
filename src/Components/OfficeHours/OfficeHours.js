import React, { useState, useEffect } from 'react';
import './OfficeHours.css';
import Toggle from '../Toggle/Toggle';

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const hoursOfTheDay = Array.from({length: 24}, (x, i) => i);
const hours = weekdays.map( day => {
  return  {day: day, isOpen: false, openTime: 0, closeTime: 0};
});

const OfficeHours = () => {
  const [officeHours, setOfficeHours] = useState(hours);
  const [officeHoursBackup, setOfficeHoursBackup] = useState(hours);
  const [editMode, setEditMode] = useState(false);

  const formatTime = time => {
    if (time === 0) return '12:00 AM';
    else if (time === 12) return '12:00 PM';
    else if (time < 12) return `${time}:00 AM`;
    else return `${time - 12}:00 PM`;
  };

  const toggleIsOpen = (evt, day) => {
    const newHours = [...officeHours];
    const editDay = newHours.find(x => x.day === day.day);
    editDay.isOpen = evt.target.checked;
    setOfficeHours(newHours);
  }

  const editHours = (evt, day, fieldName) => {
    const newHours = [...officeHours];
    const editDay = newHours.find(x => x.day === day.day);
    editDay[fieldName] = +evt.target.value;
    setOfficeHours(newHours);
  }

  const startEdit = () => {
    setOfficeHoursBackup(JSON.parse(JSON.stringify(officeHours)));
    setEditMode(true);
  }

  const cancelEdit = () => {
    setOfficeHours(officeHoursBackup);
    setEditMode(false);
  }

  return (
    <>
      <header>
        <h1>Hours of Operation</h1>
        <span>
          {!editMode && (
            <button onClick={() => startEdit()} className="link-btn">Edit</button>
          )}
          {editMode && (
            <>
              <button onClick={() => cancelEdit()} className="link-btn">Cancel</button>
              <button onClick={() => setEditMode(false)}>Save</button>
            </>
          )}
        </span>
      </header>
      <p>Manage standard hours of operation when providers are available to provide care.
      Patients will be informed if they submit an exam outside of these hours.</p>
      <div className="hours-by-day">
        {officeHours && officeHours.length && officeHours.map(day =>
          <div className="day" key={day.day}>
            <span>{day.day}</span>
            <span>
              {editMode && (
                <Toggle checked={day.isOpen} onChange={(evt) => toggleIsOpen(evt, day)}>
                  {day.isOpen ? 'OPEN' : 'CLOSED'}
                </Toggle>
              )}
              {!editMode && (
                <span>{day.isOpen ? 'OPEN' : 'CLOSED'}</span>
              )}
            </span>
            {day.isOpen && (
              <span>
                {!editMode && (
                  <span>{formatTime(day.openTime)} - {formatTime(day.closeTime)}</span>
                )}
                {editMode && (
                  <>
                    <span className="select-wrapper">
                      <select value={day.openTime} onChange={(evt) => editHours(evt, day, 'openTime')}>
                        {hoursOfTheDay && hoursOfTheDay.length && hoursOfTheDay.map(hour =>
                          <option value={hour} key={'open' + hour}>{formatTime(hour)}</option>
                        )}
                      </select>
                      <span className="select-caret"></span>
                    </span>
                    <span>   -   </span>
                    <span className="select-wrapper">
                      <select value={day.closeTime} onChange={(evt) => editHours(evt, day, 'closeTime')}>
                        {hoursOfTheDay && hoursOfTheDay.length && hoursOfTheDay.map(hour =>
                          <option value={hour} key={'close' + hour}>{formatTime(hour)}</option>
                        )}
                      </select>
                      <span className="select-caret"></span>
                    </span>
                  </>
                )}
                {+day.openTime > +day.closeTime && (
                  <span className="error">Open time cannot be later than close time</span>
                )}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default OfficeHours;
