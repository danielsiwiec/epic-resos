import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

import ResoCalendar from '../components/ResoCalendar'

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

class Cal extends React.Component {
  constructor(props) {
    super(props)
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
          <Grid item xs={12} md={1} />
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <ResoCalendar data={epicData} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <h2>Reso summary</h2>
            <Paper className={classes.paper}>
              Total: <b>{epicData.resos.length}</b>
            </Paper>
            <h3>By resort</h3>
            {Object.entries(groupByPlace(epicData.resos)).map(([key, value]) => <Paper key={key} className={classes.paper}>{key}: {value}</Paper>)}
            <h3>Legend</h3>
            <Paper className={classes.paper}>
              <h4 style={{ color: 'blue' }}>Booked by you</h4>
              <h4 style={{ color: 'red' }}>Full</h4>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Cal)