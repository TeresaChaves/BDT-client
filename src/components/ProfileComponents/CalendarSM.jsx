function CalendarSM({ hours, blackBackgroung }) {
  return (
    <>
      <div className="calendar-container--sm">
        <div
          className="calendar_detail--sm"
          style={{ backgroundColor: blackBackgroung ? "black" : "white" }}>
          <span
            className="day_calendar--sm"
            style={{ color: blackBackgroung ? "white" : "black" }}>
            MIE
          </span>
          <br />
          <span
            className="hours_calendar--sm"
            style={{ color: blackBackgroung ? "white" : "black" }}>
            17:00
          </span>
        </div>
        <div
          className="calendar_detail--sm"
          style={{ backgroundColor: blackBackgroung ? "black" : "white" }}>
          <span
            className="day_calendar--sm"
            style={{ color: blackBackgroung ? "white" : "black" }}>
            {hours}
          </span>
          <br />
          <span
            className="calendar_detail-text_hours"
            style={{ color: blackBackgroung ? "white" : "black" }}>
            HORAS
          </span>
        </div>
      </div>
    </>
  );
}
export default CalendarSM;
