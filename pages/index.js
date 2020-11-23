import Head from 'next/head'
import styles from '../styles/Home.module.css'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'

import { useState } from 'react'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))


function Home() {

  const [resos, setResos] = useState([])
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const localizer = momentLocalizer(moment)
  const classes = useStyles()

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form className={classes.form}
          noValidate
          onSubmit={(e) => { e.preventDefault(); loadResos(setResos, email, password) }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onInput={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onInput={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Fetch!
          </Button>
        </form>

        <Calendar
          localizer={localizer}
          events={resos}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />

      </main>
    </div>
  )

}

const loadResos = async (setResos, username, password) => {
  const response = await fetch('/api/epic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  }).then(res => res.json())
  const dates = response.dates
  console.log(response.dates)

  setResos(dates.map(reso => ({
    start: moment(reso.date),
    end: moment(reso.date),
    allDay: true,
    title: reso.place
  })))
}

export default Home