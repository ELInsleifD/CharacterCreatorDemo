import { useRouter } from "next/router"
import classes from "./CharCard.module.css"

export default function CharCard (props){

    const router = useRouter()

    function btnHandler(){
        router.push('/' + props.id)
    }

    return (
        <li className={classes.element}>
            <div className={classes.container}>
                <div className={classes.text}>
                <h2>{props.charname}</h2>
                <img src={props.imgurl} />
            </div>
            <div className={classes.buttonBox}>
                <button onClick={btnHandler}>Show details</button>
            </div>
            </div>
        </li>
    )
}