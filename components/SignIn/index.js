import { Formik } from 'formik'
import Image from 'next/image'
import styles from './styles'
import * as Yup from 'yup'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setUser } from 'store/reducers/userSlice'
import { useRouter } from 'next/router'
import { signIn } from 'utils/api'
import Cookies from 'js-cookie'

function SignInForm({ formStyle }) {
  const dispatch = useDispatch()
  const router = useRouter()

  const USER_SCHEMA = Yup.object({
    email: Yup.string().email().required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'At least 8 characters')
      .test('hasUpperCase', 'Password need at least 1 uppercase character', (value) => {
        return /[A-Z]/.test(value)
      })
      .test('hasLowerCase', 'Password need at least 1 lowercase character', (value) => {
        return /[a-z]/.test(value)
      })
      .test('hasNumber', 'Password need at least 1 number', (value) => {
        return /[0-9]/.test(value)
      })
      .test('hasSymbol', 'Password need at least 1 special character (!, @, #, %, &)', (value) => {
        return /[!@#%&]/.test(value)
      }),
  })

  return (
    <Formik
      validationSchema={USER_SCHEMA}
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          setSubmitting(true)
          // Validate user
          const res = await signIn(values).then(({ data }) => data)

          // Set userSlice
          dispatch(setUser(res))
          Cookies.set('user', JSON.stringify(res), { expires: 60 / 1440 })
          router.push('/')
          resetForm()
          setSubmitting(false)
        } catch (e) {
          console.log(e)
          setSubmitting(false)
          resetForm()
        }
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form
          name="sign-in"
          className="form-wrapper"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          style={formStyle}
        >
          <div className="icon-lg">
            <Image src="/images/Auth/Logo.svg" width={128} height={128} />
          </div>
          <div className="form-container">
            <div className="input">
              <div className="icon-sm">
                <Image src="/images/Auth/email.svg" width={24} height={24} />
              </div>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="EMAIL"
              />
            </div>
            {touched['email'] && errors['email'] && (
              <div className="error">
                <p>{errors['email']}</p>
              </div>
            )}
            <div className="input">
              <div className="icon-sm">
                <Image src="/images/Auth/lock.svg" width={24} height={24} />
              </div>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="PASSWORD"
                autoComplete="current-password"
              />
            </div>
            {touched['password'] && errors['password'] && (
              <div className="error">
                <p>{errors['password']}</p>
              </div>
            )}
            <div className="reset-password">
              <Link href="/reset-password">
                <a>Forgot password?</a>
              </Link>
            </div>
          </div>
          <div className="form-event">
            <button
              type="submit"
              disabled={isSubmitting}
              className="button"
              style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
            >
              LOGIN
            </button>

            <p className="sign-up">
              You don&apos;t have account?{' '}
              <Link href="/sign-up">
                <a>Sign up here!</a>
              </Link>
            </p>
          </div>
          <style jsx>{styles}</style>
        </form>
      )}
    </Formik>
  )
}

const SignIn = () => {
  return (
    <div className="wrapper">
      <div className="round-layer">
        <Image src="/images/Auth/BG.png" layout="fill" alt="background" />
      </div>
      <SignInForm formStyle={{}} />
      <style jsx>{styles}</style>
    </div>
  )
}

export default SignIn
