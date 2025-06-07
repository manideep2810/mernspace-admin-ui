import {describe , expect, it} from 'vitest'
import {render , screen} from '@testing-library/react'
import LoginPage from './login'

describe("Login Page",()=>{
    it('should render with required feilds',()=>{
        render(<LoginPage />)
        expect(screen.getByText(/Sign In/)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/UserName/)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/Password/)).toBeInTheDocument()
        expect(screen.getByRole('button', {name : 'Log in'})).toBeInTheDocument()
        expect(screen.getByRole('checkbox')).toBeInTheDocument()
        expect(screen.getByText('Forgot Password')).toBeInTheDocument()
    })
})