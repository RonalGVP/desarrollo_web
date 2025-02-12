'use client';
import WeatherStats from '../../components/WeatherStats';
import AuthRedirect from '../../components/users/AuthRedirect';

export default function WeatherPage() {
  return (
    <div>
     <AuthRedirect>
      <WeatherStats />
      </AuthRedirect> 
    </div>
  );
}