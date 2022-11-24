import { useRouter } from "next/router";
import UpdateChar from "../../components/UpdateChar";

export default function UpdatePage(props){

    const router = useRouter()

    async function updtFuncHandler(enteredData){

        const response = await fetch(`http://localhost:5000/character/update/hide/${props.charid.id}`,{
            method:'PUT',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        console.log(props.charid.id);

        router.push('/')
    }

    return (
        <UpdateChar
        updtFunc={updtFuncHandler}
         />
    )
}

export async function getStaticPaths(){

    const res = await fetch("http://localhost:5000/characters")
    const chars = await res.json()

    const paths = chars.map(elem => {
        return {
            params: {
                id: elem._id.toString()
            }
        }
    })

    return {
        paths: paths,
        fallback: false
    }

}

export async function getStaticProps(context) {
    const id = context.params.id
    
    const res = await fetch(`http://localhost:5000/character/${id}`)
    const chars = await res.json()

    return {
        props: {
            charid: {
                id: chars._id.toString()
        }
        }
    }
}