import { useLocation, useNavigate } from "react-router-dom"
import { getAuth, signWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from 'fierbase/firestore'
import { db } from '../firebase.config'
import { toast } from "react-toastify" 
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const onGoogleClick = async () => {
    try {
        const auth = getAuth()
        const provider = GoogleAuthProvider()
        const result = await signWithPopup(auth,provider)
        const user = result.user

        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
            await setDoc(doc(db,'users',user.uid),{
                name: user.displayName,
                email: user.email,
                timestamp: serverTimestamp()
            })
        }
        navigate('/')
    } catch (error) {
        toast.error('An error has occurred!')
    }
  }

    return (
        <div>
            <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with</p>
            <button className="socialIconDiv" onClick={onGoogleClick}>
                <img className="socialIconImg" src={googleIcon} alt='google'/>
            </button>
        </div>
    )
}

export default OAuth