import { useRouter } from "next/router";
import NewCharComp from "../../components/NewCharComp";


export default function NewCharPage (){

    const router = useRouter()

    async function addFuncHandler(enteredData){

        const response = await fetch('http://localhost:5000/char/create',{
            method:'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        router.push('/')
    }

    return (
        <NewCharComp
        addFunc={addFuncHandler}
         />
    )
}