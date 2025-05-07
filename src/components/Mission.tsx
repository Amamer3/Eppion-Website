
import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { isInViewport } from '@/lib/scrollUtils';

const missionItems = [
  {
    key: "B",
    title: "Build",
    description: "Strong and meaningful relationships within the diaspora and beyond to gain knowledge and insights on market sectors."
  },
  {
    key: "I1", // Changed from "I" to "I1" to make it unique
    title: "Invest",
    description: "In promising ventures that have the potential to create lasting impact in underserved communities."
  },
  {
    key: "G",
    title: "Guide",
    description: "Entrepreneurs and businesses through complex challenges, leveraging our expertise and network."
  },
  {
    key: "I2", // Changed from "I" to "I2" to make it unique
    title: "Ignite",
    description: "Innovation and growth in sectors that can drive positive change for marginalized communities."
  }
];

const Mission = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    const observeElements = () => {
      if (!sectionRef.current) return;
      
      elementsRef.current.forEach((el) => {
        if (el && isInViewport(el)) {
          el.classList.add('animate-slide-up');
          el.classList.remove('opacity-0', 'translate-y-20');
        }
      });
    };
    
    window.addEventListener('scroll', observeElements);
    observeElements(); // Check on initial load
    
    return () => window.removeEventListener('scroll', observeElements);
  }, []);
  
  return (
    <section 
      id="mission" 
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-eppion-charcoal to-eppion-dark"
    >
      <div className="max-w-7xl mx-auto">
        <div 
          className="mb-16 opacity-0 translate-y-20 transition-all duration-700"
          ref={el => (elementsRef.current[0] = el)}
        >
          <h2 className="h2 text-center mb-4">
            <span className="text-gradient">Our Mission</span>
          </h2>
          <p className="text-center text-lg text-gray-300 max-w-2xl mx-auto">
            Driving innovation and creating meaningful impact
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {missionItems.map((item, index) => (
            <Card 
              key={item.key}
              className="glass-morphism border-0 p-6 group hover:bg-eppion-purple/10 transition-all duration-300 opacity-0 translate-y-20"
              style={{ transitionDelay: `${index * 100 + 100}ms` }}
              ref={el => (elementsRef.current[index + 1] = el)}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-eppion-purple flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">{item.key}</span>
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
              </div>
              <p className="text-gray-300">{item.description}</p>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            className="opacity-0 translate-y-20 transition-all duration-700 delay-500"
            ref={el => (elementsRef.current[5] = el)}
          >
            <h3 className="h3 mb-6">Vision Graphic</h3>
            <div className="aspect-video bg-eppion-gray rounded-lg glass-morphism flex items-center justify-center mb-4">
              <img className="rounded-md" src="https://images.pexels.com/photos/7648221/pexels-photo-7648221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Vision graphic" />
            </div>
          </div>
          
          <div 
            className="opacity-0 translate-y-20 transition-all duration-700 delay-600"
            ref={el => (elementsRef.current[6] = el)}
          >
            <h3 className="h3 mb-6">Our Vision for the Future</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              We anticipate robust growth over the next three years, expanding our market share 
              and clientele through targeted marketing campaigns, referrals, and strategic alliances.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our goal is to establish ourselves as the leading consulting firm in the market, 
              delivering exceptional value to our clients and fostering a culture of innovation and excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
