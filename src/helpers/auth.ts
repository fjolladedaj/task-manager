import sign from 'jwt-encode'

const EXAMPLE_USER_EMAIL = 'user@example.com'
const EXAMPLE_USER_PASSWORD = 'password'
const EXAMPLE_USER_RECORD = {
  email: EXAMPLE_USER_EMAIL,
  password: EXAMPLE_USER_PASSWORD,
  name: 'Example User',
  role: 'user'
}

async function mockSignIn(email: string, password: string): Promise<Record<string, any>> {
  // Simulate an asynchronous operation, like making an API call to sign in
  return new Promise<Record<string, any>>((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful sign-in
      if (email === EXAMPLE_USER_RECORD.email && password === EXAMPLE_USER_RECORD.password) {
        localStorage.setItem('user', JSON.stringify(EXAMPLE_USER_RECORD))
        resolve(EXAMPLE_USER_RECORD)
      } else {
        // Simulate failed sign-in
        reject(new Error('Invalid user email or password'))
      }
    }, 1000) // Simulating a 1-second delay
  })
}

async function mockSignOut(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (!localStorage.getItem('user')) {
        reject(new Error('User not found'))
      }
      localStorage.removeItem('user')
      resolve()
    }, 500)
  })
}

async function mockGetIdToken(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (!localStorage.getItem('user')) {
        reject(new Error('User not found'))
      }
      const email = JSON.parse(localStorage.getItem('user')!)?.email

      if (email === EXAMPLE_USER_RECORD.email) {
        // Generate a mock JWT ID token with a payload
        const payload = EXAMPLE_USER_RECORD
        // Sign the JWT token with a mock secret key
        const secretKey = 'mock-secret-key'
        const options = {
          expiresIn: '1h' // Set expiration time
        }
        const token = sign(payload, secretKey, options)
        resolve(token)
      } else {
        reject(new Error('User not found'))
      }
    }, 500)
  })
}

function mockGetCurrentUser(): Record<string, any> | null {
  if (localStorage.getItem('user')) {
    return JSON.parse(localStorage.getItem('user')!)
  }
  return null
}

export { mockGetCurrentUser, mockSignIn, mockSignOut, mockGetIdToken }
