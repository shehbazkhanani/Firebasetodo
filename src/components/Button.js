const Button = (props) => {
    return (
        <>
        <button className={props.classes} onClick={props.click} > {props.addValue}  </button>
        </> 
    )
}
export default Button;