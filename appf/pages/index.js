import Link from "next/link"
import { Fragment } from "react"
import CharList from "../components/CharList"

export default function MainPage (props) {

    if (props.chars== null)  {
        return (
            <Fragment> 
                <h1>No characters created</h1><br />
                <button><Link href='/new-char'>Create New</Link></button>
            </Fragment>
        )
    }else{

    return (

        <CharList
        charList={props.chars}
         />
         
    )
    }
}

export async function getStaticProps() {
    
    const res = await fetch("http://localhost:5000/characters")
    const chars = await res.json()

    return {
        props: {
            chars: chars.map(element => ({
                id: element._id.toString(),
                charname: element.charname,
                imgurl: element.imgurl,
                bio: element.bio,
                age: element.age
            }))
        },
        revalidate: 20
    }
}