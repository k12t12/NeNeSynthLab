import styles from "../../assets/bar.module.css"
export default function BarComponent({onStop, onStart, onClose, children, onVolumeChange, volume}) {
    return (<div className={styles.bar}>
    <div className={styles.nameLayer}>
    <button onClick={onStart}> ▶︎  </button>
    <button onClick={onStop}> ⏸︎ </button>
    <div className={styles.handle}>{children}</div>
    <button onClick={onClose}> ✖︎ </button>
    </div><div className={styles.volumeControlLayer}>
    <div style={{marginBottom: "4px"}}>gain</div>
    <span> </span>
    <input type="range" id="volume"  value={volume} min="0" max="1" step="0.001"  onChange={onVolumeChange} style={{  width: "100px", backgroundColor:"black"}}/>
    </div>
        </div>)
}