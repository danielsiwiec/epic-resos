import React from 'react'
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
})

const groupByPlace = resos => {
  return resos.reduce((acc, reso) => { acc[reso.place] ? acc[reso.place]++ : acc[reso.place] = 1; return acc }, {})
}

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

class Cal extends React.Component {
  constructor(props) {
    super(props)
    this.localizer = momentLocalizer(moment)
    this.state = {
      epicData: {
        resos: [],
        availability: []
      }
    }
  }

  componentDidMount() {
    const epicData = JSON.parse(localStorage.getItem('epicData'))
    this.setState({ epicData })
  }

  render() {
    const { classes } = this.props
    const epicData = this.state.epicData

    return (
      <div className={classes.root}>
        <h1>Resos</h1>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <h2>Reso summary</h2>
            <Paper className={classes.paper}>
              Total: <b>{epicData.resos.length}</b>
            </Paper>
            <h3>By resort</h3>
            {Object.entries(groupByPlace(epicData.resos)).map(([key, value]) => <Paper key={key} className={classes.paper}>{key}: {value}</Paper>)}
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Calendar
                localizer={this.localizer}
                events={toEventModel(epicData)}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                eventPropGetter={(event, start, end, isSelected) => ({ style: { backgroundColor: event.color } })}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Cal)