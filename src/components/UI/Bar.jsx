import styles from "../../assets/bar.module.css"
export default function BarComponent({onStop, onStart, onClose, children}) {
    return (<div className={styles.bar}>
    <button onClick={onStart}> ▶︎  </button>
    <button onClick={onStop}> ⏸︎ </button>
 
    <div className={styles.handle}>{children}</div>
    <button onClick={onClose}> ✖︎ </button>

        </div>)
}