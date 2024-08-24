import React from 'react'
import service from '../../Appwrite/configure';
import MultilayerParallax from './MultilayerParallax';
import Startlearning from './Startlearning';
function Home() {

  return (
    <>
    <div> 
      <MultilayerParallax/>
      <div className='h-[1000px] bg-gradient-to-b from-[#F0F8FF] to-[#c8e5ff] to-90% ' > 

      <Startlearning/>
      </div>
      {/* // variants , gesture animations , scroll triggred animations , scroll linked animations , shared layout animations , react router 6 page transactions */}
    </div>
      </>
  )
}

export default Home
