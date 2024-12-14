import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";

const name = "Shin code";
export const siteTitle = "Next.js blog";

function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="favicon.ico" />
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <Image
                        src="/images/profile.png"
                        className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
                        alt="Profile"
                        width={144}
                        height={144}
                    />
                    <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                        <Image
                            src="/images/profile.png"
                            className={`${utilStyles.borderCircle}`}
                            alt="Profile"
                            width={144}
                            height={144}
                        />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                )}
                
            </header>
            <main>{children}</main>
            {!home && (
                <div>
                    <Link href="/">←ホームへ戻る</Link>
                </div>
            )}
        </div>
    );
}

export default Layout;
