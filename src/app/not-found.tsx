import Image from "next/image"
import Logo from "../../public/images/404Icon.png"
import styles from "../app/styles/not-found.module.css"
export default function NotFound() {
    return (
        <div className={styles.messageContainer}>
            <Image src={Logo} alt="logo" width={370} height={262} />
            <div style={{ textAlign: "center" }}>
                <p className={styles.message}>404</p>
                <p className={styles.message2}>Not found Page</p>
            </div>
        </div >
    )
}