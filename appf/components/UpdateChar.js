import { useRef } from 'react'
import classes from './UpdateChar.module.css'

export default function UpdateChar (props){
    
    const nameInputRef = useRef()
    const urlInputRef = useRef()
    const bioInputRef = useRef()
    const ageInputRef = useRef()

    function submitHandler(event) {
        event.preventDefault()

        const enteredName = nameInputRef.current.value
        const enteredUrl = urlInputRef.current.value
        const enteredBio = bioInputRef.current.value
        const enteredAge = ageInputRef.current.value

        const formData = {
            charname : enteredName,
            imgurl : enteredUrl,
            bio : enteredBio,
            age : enteredAge,
        }

        props.updtFunc(formData)
    }

    return (
        <div className={classes.container}>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.inputArea}>
                <input type='text' required ref={nameInputRef} placeholder='Enter name' />
                <input type='url' required ref={urlInputRef} placeholder='Enter image url' />
                <input type='text' required ref={ageInputRef} placeholder='Enter age' />
                </div>
                <textarea rows='10' required ref={bioInputRef}></textarea>
                <div className={classes.btnBox}>
                    <button>Add character</button>
                </div>
            </form>
        </div>
    )
}