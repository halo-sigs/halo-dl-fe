import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'
import { filesize } from "filesize";

/* eslint-disable */
import 'bootstrap/dist/css/bootstrap.css'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Home() {
  const { data, error } = useSWR('https://dl.halo.run/api', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return (
    <div className={styles.loading_container}>
      <div className={styles.spinner}></div>
      <div>Loading Data...</div>
    </div>
  )

  // Filter beta items, key containes "beta" or "alpha"
  const beta_items = data.filter(item => item.key.includes("beta") || item.key.includes("alpha"))
  const release_items = data.filter(item => !item.key.includes("beta") && !item.key.includes("alpha") && item.key.includes("jar"))
  const config_items = data.filter(item => item.key.includes("config"))

  return (
    <div className={styles.container}>
      <div className="container">
        <Head>
          <title>Halo Download Mirror</title>
          <meta name="description" content="Halo Download Mirror" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css"
            integrity="sha256-eZrrJcwDc/3uDhsdt61sL2oOBY362qM3lon1gyExkL0=" crossOrigin="anonymous" />
          <link rel="shortcut icon" href="/favicon.png" />
          <script async defer data-website-id="2b41f81a-37e0-48fe-875b-3907e1913667" src="https://analytics.halo.run/umami.js"></script>
        </Head>

        <main className={styles.main}>
          <div className="py-4 fw-bold">
            <h1 className={styles.title}>
              Halo Download Mirror
            </h1>
            <h5 className="text-muted">Maintained by NovaKwok</h5>
          </div>

          <div className="row">
            <div className="col-4 col-md-4 col-sm-12">
              <h5>Releases</h5>

              <ul className="list-group">
                {release_items.map((item) => (
                  <a href={"https://dl.halo.run/" + item.key}>
                    <li className="list-group-item">
                      {item.key}
                      <span className="badge bg-primary rounded-pill float-end">{filesize(item.size)}</span>
                      </li>
                  </a>
                ))}
              </ul>

            </div>

            <div className="col-4 col-md-4 col-sm-12">
              <h5>Pre-Releases</h5>
              <ul className="list-group">
                {beta_items.map((item) => (
                  <a href={"https://dl.halo.run/" + item.key}>
                    <li className="list-group-item">
                      {item.key}
                      <span className="badge bg-primary rounded-pill float-end">{filesize(item.size)}</span>
                      </li>
                  </a>
                ))}
              </ul>
            </div>

            <div className="col-4 col-md-4 col-sm-12">
              <h5>Configs</h5>
              <ul className="list-group">
                {config_items.map((item) => (
                  <a href={"https://dl.halo.run/" + item.key}>
                    <li className="list-group-item">
                      {item.key}
                      <span className="badge bg-primary rounded-pill float-end">{filesize(item.size)}</span>
                      </li>
                  </a>
                ))}
              </ul>
            </div>
            
          </div>

          <center>
            <footer className={styles.footer}>
              Crafted with {' '}
              <span className="text-danger"><i className="fa fa-heart" aria-hidden="true"></i></span> by Nova Kwok & Tuki in Shanghai.
              <br />
              This service is serverless, hosted on Cloudflare, built with Workers, Cloudflare Pages and R2.
              <br />
              <i className="fa fa-github" aria-hidden="true"></i>: <a href="https://github.com/halo-sigs/halo-dl-fe">halo-dl-fe</a>
              &nbsp;and&nbsp;
              <a href="https://github.com/halo-sigs/halo-dl-api">halo-dl-api</a>
            </footer>
          </center>
        </main>

      </div>
    </div>

  )
}


export default Home;
