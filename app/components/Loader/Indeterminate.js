import styles from "./Indeterminate.module.css"

const Indeterminate = ({ type = "bar", text = "" }) => {
  if (type === "circle") {
    return (
      <div className="relative">
        <div className={styles.ring}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 27,
            left: 26,
          }}
        >
          {text}
        </div>
      </div>
    )
  }

  return <div className={styles["progress-line"]}></div>
}

export default Indeterminate
