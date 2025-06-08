import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { QueryClient , QueryClientProvider } from '@tanstack/react-query'
import 'antd/dist/reset.css'
import './index.css'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{
          token: {
            colorPrimary : '#F65F42',
            colorLink : 'F65F42'
        }
      }}>
        <RouterProvider router={router}/>
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>,
)
