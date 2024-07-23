import Header from './components/Header';
import WeatherDashboard from './components/WeatherDashboard';
import CityCardList from './components/CityCardList';
import Footer from './components/Footer';
import Spinner from './components/Sipnner';

function App() {
  return (
    <div className='mx-auto max-w-screen-md'>
      <Header />
      <main className='text-shadow-sm px-2 pb-20 mx-auto min-h-screen relative select-none overflow-y-scroll'>
        <WeatherDashboard />
        <CityCardList />
      </main>
      <Footer />
      <Spinner />
    </div>
  )
}

export default App
