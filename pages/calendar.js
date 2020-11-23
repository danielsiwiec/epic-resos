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

class Cal extends React.Component {
  constructor(props) {
    super(props)
    this.localizer = momentLocalizer(moment)
    this.state = {
      resos: []
    }
  }

  componentDidMount() {
    this.setState({ resos: JSON.parse(localStorage.getItem('resos')) })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              Total resos: <b>{this.state.resos.length}</b>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Calendar
                localizer={this.localizer}
                events={this.state.resos}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Cal)