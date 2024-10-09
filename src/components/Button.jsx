import './Button.css'

const Button = ({ text, icon = '', onPress, linerRight = false, primary = true }) => {
    return (
        <button
            className={`button ${primary ? 'primary-button' : 'secondary-button'} ${linerRight ? 'button-linear-right' : 'button-linear-left'}`}
            onClick={onPress}
        >
            <div className="icon-container">
                <span className="material-symbols-outlined button-icon">{icon}</span>
            </div>
            <span className="button-text">{text}</span>
        </button>
    )
}

export default Button;