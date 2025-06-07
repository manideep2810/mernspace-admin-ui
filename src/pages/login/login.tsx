const LoginPage = () => {
  return (
    <>
        <h1>Sign In</h1>
        <input type="text" placeholder="UserName" />
        <input type="password" placeholder="Password" />
        <button>Log in</button>
        <label htmlFor="remember-me">Remember me</label>
        <input type="checkbox" id="remember-me"/>
        <a href="#">Forgot Password</a>
    </>
  )
}

export default LoginPage