import React from 'react'
import MultilayerParallax from './MultilayerParallax';
import Startlearning from './Startlearning';
import KeyFeature from './KeyFeature';
import HowItWorks from './HowItWorks';
import ReviewSection from './ReviewSection';
import ValuePropositionSection from './ValuePropositionSection';

function Home() {

  return (
    <>
    <div> 
      
      <div>
      <MultilayerParallax/>
      </div>


      <div> 
      <Startlearning/>
      </div>

      <div>
        <KeyFeature/>
      </div>

      <div>
        <HowItWorks/>
      </div>

      <div>
        <ValuePropositionSection/>
      </div>

      <div>
        <ReviewSection/>
      </div>
      {/* // variants , gesture animations , scroll triggred animations , scroll linked animations , shared layout animations , react router 6 page transactions */}
    </div>
      </>
  )
}

export default Home
