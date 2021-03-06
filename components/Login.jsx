import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'

import { useState } from 'react'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function Login(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const classes = useStyles()

  const router = useRouter()

  return (
    <Container maxWidth="sm">
      <form className={classes.form}
        onSubmit={e => { e.preventDefault(); props.setLoading(true); loadResos(router, email, password) }}>
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
          Login
          </Button>
      </form>
    </Container>
  )

}

const loadResos = async (router, username, password) => {
  const response = await fetch('/api/epic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  }).then(res => res.json())

  const resos = response.resos
  localStorage.setItem('epicData', JSON.stringify(response))
  router.push('/calendar')
}