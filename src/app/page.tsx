import { Header } from "@/components/Header";
import {Engineer} from "@/components/engineer";
export default function Home (){
    return(
        <div className="flex ">
            <Header/>
            <Engineer/>
        </div>
    );
}