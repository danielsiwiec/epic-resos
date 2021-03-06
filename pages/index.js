import Login from '../components/Login'

import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

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

export default function Home() {

  const [loading, setLoading] = useState(false)
  const classes = useStyles()

  return (
    <div>
      {loading && <Backdrop open={loading}>
        <h2>Hang tight! This might take around 30 seconds</h2><CircularProgress />
      </Backdrop>}

      {!loading &&
        <div className={classes.root}>
          <h1>Epic Resos that don't suck</h1>
          <Login setLoading={setLoading} />
        </div>}
    </div>
  )

}