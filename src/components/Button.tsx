type Props = {
    disabled?: boolean
    text: string
    className?: string
    onClick?: () => void
}

const Button = ({ disabled, text, className, onClick }: Props) => {
    return (
        <button
            type="submit"
            disabled={disabled}
            onClick={onClick}
            className={`rounded-lg bg-[#4880FF] text-white p-[10px] text-[20px hover:bg-[#568AFF] duration-300 ${className}`
}
            >
              {text}
            </button>
    )
}

export default Button