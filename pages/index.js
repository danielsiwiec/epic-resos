import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Login from '../components/Login'

import CircularProgress from '@material-ui/core/CircularProgress'
import { useState } from 'react'


function Home() {

  const [loading, setLoading] = useState(false)

  return (
    <div className={styles.container}>
      <Head>
        <title>Epic Reso Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading && <CircularProgress />}
      {!loading && <Login setLoading={setLoading} />}
    </div>
  )

}

export default Home