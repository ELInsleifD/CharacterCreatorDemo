import React from "react"
import CharCard from "./CharCard"
import classes from "./CharList.module.css"

export default function CharList (props) {
    return (
        <div className={classes.container}>
            <ul className={classes.list}>
                {props.charList.map(element => (
                    <CharCard 
                    key={element.id}
                    id={element.id}
                    charname={element.charname}
                    imgurl={element.imgurl}
                    />
                ))}
            </ul>
        </div>
    )
}