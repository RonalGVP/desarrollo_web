'use client'
import PlagueSimulation from '../../components/plagesimulation';
import AuthRedirect from '../../components/users/AuthRedirect';
export default function PlagueSimulationPage() {
  return (
  <div>


    <AuthRedirect>
    <PlagueSimulation />
      </AuthRedirect> 

  </div>
  )
}