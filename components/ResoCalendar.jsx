import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'


const toEventModel = epicData => {
  return [].concat(resoToEventModel(epicData.resos), availabilityToEventModel(epicData.availability))
}

const availabilityToEventModel = availabilities => availabilities.map(resortAvailabiliyDataToEventModel).flat()

const resortAvailabiliyDataToEventModel = availability => availability.data.NoInventoryDays.map(item => ({
  start: moment(item),
  end: moment(item),
  allDay: true,
  title: availability.name,
  color: 'red'
}))

const resoToEventModel = resos => resos.map(item => ({
  start: moment(item.date),
  end: moment(item.date),
  allDay: true,
  title: item.place,
  color: 'blue'
}))

export default function ResoCalendar(props) {

  const localizer = momentLocalizer(moment)

  return (
    <Calendar
      localizer={localizer}
      events={toEventModel(props.data)}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      eventPropGetter={(event, start, end, isSelected) => ({ style: { backgroundColor: event.color } })}
    />
  )
}