import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { toast } from "react-toastify"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from '../firebase.config'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg' 
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignUp() {
    const [showPassword, setShowPassword] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name,email, password } = formData

    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth()

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            const user = userCredential.user
            
            updateProfile(auth.currentUser, {
                displayName: name,
            })

            const formDataCopy = {...formData}
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

            await setDoc(doc(db, 'users', user.uid), formDataCopy)

            navigate('/')
        } catch (error) {
            toast.error('Something went wrong...')
        }
    }
 
    return (
      <>
          <div className="pageContainer">
            <header>
                <p className="pageHeader">Welcome!</p>
            </header>
            <form onSubmit={onSubmit}>
                <input 
                    type='name'
                    className='nameInput'
                    placeholder='Name'
                    id='name'
                    value={name}
                    onChange={onChange}
                />
                <input 
                    type='email'
                    className='emailInput'
                    placeholder='Email'
                    id='email'
                    value={email}
                    onChange={onChange}
                />
                <div className="passwordInputDiv">
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        className='passwordInput'
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={onChange}
                    />
                    <img 
                        src={visibilityIcon}
                        alt="show password"
                        className="showPassword"
                        onClick={() => setShowPassword((prevState) => !prevState)}
                    />
                </div>
                <div className="signUpBar">
                    <p className="signUpText">
                        Sign Up
                    </p>
                    <button type='submit' className="signInButton">
                        <ArrowRightIcon fill="#ffffff" width='34px'/>
                    </button>
                </div>
            </form>
            
            {/* Google OAuth */}

            <Link to='/sign-in' className='registerLink'>
                Are you registered? - Sign In 
            </Link>
          </div>
      </>
    )
  }
  
  export default SignUp