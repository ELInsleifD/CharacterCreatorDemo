import { useRouter } from "next/router";
import CharDetails from "../../components/CharDetails";


export default function ChatacterDetails (props) {

    const router = useRouter()

    async function deleteFunc(){
        const res = await fetch(`http://localhost:5000/character/delete/${props.chars.id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        router.push('/')
    }


    return (
        <CharDetails
        img={props.chars.imgurl}
        charname={props.chars.charname}
        age={props.chars.age}
        bio={props.chars.bio}
        deleteFunc={deleteFunc}
        id={props.chars.id}
        />
    )
}

export async function getStaticPaths(){

    const res = await fetch("http://localhost:5000/characters")
    const chars = await res.json()

    const paths = chars.map(elem => {
        return {
            params: {
                charid: elem._id.toString()
            }
        }
    })

    return {
        paths: paths,
        fallback: false
    }

}

export async function getStaticProps(context) {
    const charid = context.params.charid
    
    const res = await fetch(`http://localhost:5000/character/${charid}`)
    const chars = await res.json()

    return {
        props: {
            chars: {
                ID: chars._id,
                id: chars._id.toString(),
                charname: chars.charname,
                imgurl: chars.imgurl,
                bio: chars.bio,
                age: chars.age
                }
        }
    }
}