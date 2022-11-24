import classes from './CharDetails.module.css'
import Link from "next/link"

export default function CharDetails (props) {



    return (
        <div className={classes.container}>
            <div className={classes.left}>
                
                <img src={props.img} />
            </div>
            <div className={classes.middle}>
                <h2>{props.charname}</h2>
                <h3>Character age: {props.age}</h3>
                <p>{props.bio}</p>
            </div>
            <div className={classes.right}>
                <button className={classes.delete} onClick={props.deleteFunc}>delete</button>
                    <button className={classes.update}><Link href={`/update/${props.id}`}>update</Link></button>
            </div>
        </div>
    )
}