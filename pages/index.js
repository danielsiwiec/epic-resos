import Head from 'next/head'
import styles from '../styles/Home.module.css'

import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'

import { useState } from 'react'
import { useRouter } from 'next/router'

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

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const classes = useStyles()

  const router = useRouter()

  return (
    <div className={styles.container}>
      <Head>
        <title>Epic Reso Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading && <CircularProgress />}
      {!loading &&
        <Container maxWidth="md">
          <form className={classes.form}
            noValidate
            onSubmit={(e) => { e.preventDefault(); loadResos(setLoading, router, email, password) }}>
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
        </Container>
      }

    </div>
  )

}

const loadResos = async (setLoading, router, username, password) => {
  setLoading(true)
  const response = await fetch('/api/epic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  }).then(res => res.json())

  const dates = response.dates
  localStorage.setItem('resos', JSON.stringify(dates.map(reso => ({
    start: moment(reso.date),
    end: moment(reso.date),
    allDay: true,
    title: reso.place
  }))))
  router.push('/calendar')
}

export default Home