import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={{
        token: {
          colorPrimary : '#F65F42',
          colorLink : 'F65F42'
      }
    }}>
      <RouterProvider router={router}/>
    </ConfigProvider>
  </StrictMode>,
)
