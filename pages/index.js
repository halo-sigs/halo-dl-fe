import { filesize } from "filesize";
import Head from "next/head";
import { BarLoader } from "react-spinners";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Home() {
  const { data, error } = useSWR("https://dl.halo.run/api", fetcher);

  if (error) return <div>Failed to load</div>;

  if (!data)
    return (
      <div className="flex justify-center py-10">
        <BarLoader color="#36d7b7" />
      </div>
    );

  // Filter beta items, key containes "beta" or "alpha"
  const beta_items = data
    .filter(
      (item) =>
        (item.key.includes("beta") || item.key.includes("alpha")) &&
        !item.key.includes("halo-1")
    )
    .sort((a, b) => b.key.localeCompare(a.key));

  const release_items = data
    .filter(
      (item) =>
        !item.key.includes("beta") &&
        !item.key.includes("alpha") &&
        item.key.includes("jar") &&
        !item.key.includes("pro") &&
        !item.key.includes("v") &&
        !item.key.includes("halo-1")
    )
    .sort((a, b) => b.key.localeCompare(a.key));
  const pro_items = data
    .filter(
      (item) =>
        item.key.includes("pro") &&
        !item.key.includes("beta") &&
        !item.key.includes("alpha") &&
        item.key.includes("jar")
    )
    .sort((a, b) => b.key.localeCompare(a.key));

  const config_items = data.filter((item) => item.key.includes("config"));

  const combinedItems = [
    { title: "Releases（正式版）", items: release_items },
    { title: "Releases（专业版）", items: pro_items },
    { title: "Releases（预发布版）", items: beta_items },
    { title: "Configs（配置文件）", items: config_items },
  ];

  return (
    <div>
      <Head>
        <title>Halo 资源下载</title>
        <meta name="description" content="Halo Download Mirror" />
        <link rel="shortcut icon" href="/favicon.png" />
        <script
          async
          defer
          data-website-id="2b41f81a-37e0-48fe-875b-3907e1913667"
          src="https://analytics.halo.run/umami.js"
        ></script>
      </Head>
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10">
        <main>
          <h1 className="text-2xl font-semibold">Halo 资源下载</h1>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {combinedItems.map((group) => (
              <div>
                <h5 className="text-lg font-medium">{group.title}</h5>

                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li className="hover:ring-1 transition-all rounded -mx-2 px-2 py-1">
                      <a
                        className="flex justify-between items-center gap-1"
                        href={"https://dl.halo.run/" + item.key}
                        title={item.key}
                      >
                        <span className="text-sm line-clamp-1 flex-1 shrink text-zinc-900">
                          {item.key}
                        </span>
                        <span className="flex-none text-xs text-zinc-500">
                          {filesize(item.size)}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <center>
            <footer className="mt-10 text-zinc-900">
              Crafted with{" "}
              <svg
                className="align-middle text-red-600 size-5 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037.033l.034-.03a6 6 0 0 1 4.733-1.44l.246.036a6 6 0 0 1 3.364 10.008l-.18.185l-.048.041l-7.45 7.379a1 1 0 0 1-1.313.082l-.094-.082l-7.493-7.422A6 6 0 0 1 6.979 3.074z"
                  />
                </g>
              </svg>{" "}
              by{" "}
              <a
                className="font-medium hover:text-zinc-600"
                href="https://nova.moe"
              >
                Nova Kwok
              </a>{" "}
              &{" "}
              <a
                className="font-medium hover:text-zinc-600"
                href="https://tuki.moe"
              >
                Tuki Deng
              </a>{" "}
              in Shanghai.
              <br />
              This service is serverless, hosted on Cloudflare, built with
              Workers, Cloudflare Pages and R2.
              <br />
              <i className="fa fa-github" aria-hidden="true"></i>:{" "}
              <a href="https://github.com/halo-sigs/halo-dl-fe">halo-dl-fe</a>
              &nbsp;and&nbsp;
              <a href="https://github.com/halo-sigs/halo-dl-api">halo-dl-api</a>
            </footer>
          </center>
        </main>
      </div>
    </div>
  );
}

export default Home;
