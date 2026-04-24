import ProtectedRoute from '@/components/ProtectedRoute'
import AccountPage from '@/components/account/AccountPage'

export default function AccountPageRoute() {
  return (
    <ProtectedRoute>
      <AccountPage />
    </ProtectedRoute>
  )
}
