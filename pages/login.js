import Layout from '@/components/Layout'
import React, {useContext, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import authContext from '@/context/auth/authContext'
import { toast } from 'react-toastify'
import {useRouter} from 'next/router'


const Login = () => {

  const AuthContext = useContext(authContext)
  const { login, msg, isAuthenticated } = AuthContext
  const router = useRouter()

  useEffect(() => {
    if(msg) {
      if(msg.error) {
        toast.error(msg.content)
      } else {
        toast.success(msg.content)
      }
    }
  }, [msg])

  useEffect(() => {
    if(isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated])
  
  //Form validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email is not valid')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
    }),
    onSubmit: values => {
      login(values)
    }
  })

  return (
    <Layout>
        <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
          <h2 className='text-4xl font-sans font-bold test-gray-800 text-center my-4'>Login</h2>
          <div className='flex justify-center mt-5'>
            <div className='w-full max-w-lg'>
              <form 
                className='bg-white rounded shadow-md px-8 pt-6 pb-8 pb-4'
                onSubmit={formik.handleSubmit}
              >
                
                <div className='mb-4'>
                  <label 
                    className='block text-black text-sm font-bold mb-2'
                    htmlFor='email'
                  >Email</label>
                  <input 
                    type='email' 
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-name focus:shadow-outline' 
                    id="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                      <p className='font-bold'>Error</p>
                      <p>{formik.errors.email}</p>
                    </div>
                  ) : null
                  }
                </div>
                <div className='mb-4'>
                  <label 
                    className='block text-black text-sm font-bold mb-2'
                    htmlFor='password'
                  >Password</label>
                  <input 
                    type='password' 
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-name focus:shadow-outline' 
                    id="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                      <p className='font-bold'>Error</p>
                      <p>{formik.errors.password}</p>
                    </div>
                  ) : null
                  }
                </div>

                <input
                  type="submit"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold hover:cursor-pointer"
                  value="Login"
                />
              </form>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Login