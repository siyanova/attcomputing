import { PropsWithChildren } from "react"
import { Header } from "./Header"



const Bg = ({ children }: PropsWithChildren) => {
    return(
        <div className="flex w-full h-screen">
        <Header />
        {children}
        </div>
    )
}

export default Bg