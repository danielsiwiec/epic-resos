import React from 'react'
import moment from 'moment'
import Container from '@material-ui/core/Container'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

export default class Cal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      resos: []
    }
  }

  componentDidMount() {
    this.setState({ resos: JSON.parse(localStorage.getItem('resos')) })
  }

  render() {
    const localizer = momentLocalizer(moment)

    return (
      <Container maxWidth="md">
          <Calendar
            localizer={localizer}
            events={this.state.resos}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
      </Container>
    )
  }

}