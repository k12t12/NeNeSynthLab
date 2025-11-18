import styles from "../../assets/bar.module.css"
export default function BarComponent({onStop, onStart, onClose, children, onVolumeChange, volume, isPlaying}) {
    return (
    <div className={styles.bar}>
    
    <div className={styles.nameLayer}>
    <button onClick={onStart}> ▶︎  </button>
    <button onClick={onStop}> ⏸︎ </button>
    
    <div className={styles.handle}>{children}</div>
    <button onClick={onClose}> ✖︎ </button>
    
    </div><div className={styles.volumeControlLayer}>
    <div style={{marginBottom: "4px"}}>gain</div>
    <span> </span>
    <input type="range" id="volume"  value={volume} min="0" max="1" step="0.01"  onChange={onVolumeChange} style={{  width: "120px", backgroundColor:"black"}}/>

    <div className={styles.indicator}> { isPlaying ? "♾︎" : ""} </div>
    </div>
        </div>)
}