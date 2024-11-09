type Props = {
    disabled?: boolean
    text: string
    className?: string
}

const Button = ({ disabled, text, className }: Props) => {
    return (
        <button
            type="submit"
            disabled={disabled}
            className={`rounded-lg bg-[#4880FF] text-white p-[10px] text-[20px hover:bg-[#568AFF] duration-300 h-fit ${className}`
}
            >
              {text}
            </button>
    )
}

export default Button