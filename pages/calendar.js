import React from 'react'
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { makeStyles } from '@material-ui/core/styles'

const resos = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('resos')) : []

const useStyles = makeStyles((theme) => ({
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
}))

export default function Cal() {
  const localizer = momentLocalizer(moment)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            Total resos: <b>{resos.length}</b>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Calendar
              localizer={localizer}
              events={resos}
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