import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Head from "next/head";
import Layout, { siteTitle } from './components/Layout';
import utilStyles from "../styles/utils.module.css";
import styles from "../styles/Home.module.css"
import { getPostsData } from "../lib/post"





const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SSGの場合
export async function getStaticProps() {
  const allPostData = getPostsData();
  console.log(allPostData);

  return {
    props: {
      allPostData,
    },
  };
}
type PostData = {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
};

// // SSRの場合
// export async fuction getServerSideProps(context) {
//   return {
//     props: {

//     }
//   }
// }




export default function Home({ allPostData }: { allPostData: PostData[] }) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
          <section className={utilStyles.headingMd}>
            <p>
              わたしはエンジニアになるために学習をしている者です。
            </p>
          </section>

          <section>
            <h2>📝エンジニアのブログ</h2>
            <div className={styles.grid}>
              {allPostData.map(({id, title, date, thumbnail}) => (
                <article key={id}>
                  <Link href={`/posts/${id}`}>
                  <Image
                      src={`${thumbnail}`}
                      alt="プロフィール"
                      width={600}
                      height={350}
                      className={styles.thumbnailImage}
                    />
                  </Link>
                  <Link href={`/posts/${id}`} className={utilStyles.boldText}>
                    {title}
                  </Link>
                  <br />
                  <small className={utilStyles.lightText}>{date}</small>
                </article>
              ))}
              
              
            </div>
          </section>

       </Layout>
       
   
     
      {/* <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/posts/firstPost"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </Link>
        </div>
      </main> */}
    </div>
  );
}
