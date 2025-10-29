import styles from "../../assets/drumMachine.module.css"

export default function PatternLineComponent({sequence, handler, name, currentStep}) {

    return (
        <div className={styles.pattern}>
            <label className={styles.patternName}> {name}</label>
                    {
                        sequence.map((x, ind)=>(
                            <div key = {ind}>
                            <input checked={x ? (true) : (false) }
                             style = {{borderRadius: ind%4 == 0 ? "40%" : "0%", borderWidth: ind == currentStep ? "3px" : "1px"}}
                              onChange={(e) => {handler(e.target.checked, ind)}} type="checkbox" />
                            </div>
                         )
                        )
                    } 
                    </div>


    )


}