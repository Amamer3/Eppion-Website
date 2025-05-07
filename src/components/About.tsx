
import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { isInViewport } from '@/lib/scrollUtils';

const About = () => {
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
      id="about" 
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-eppion-dark to-eppion-charcoal"
    >
      <div className="max-w-7xl mx-auto">
        <div 
          className="mb-16 opacity-0 translate-y-20 transition-all duration-700"
          ref={el => (elementsRef.current[0] = el)}
        >
          <h2 className="h2 text-center mb-4">
            <span className="text-gradient">About Us</span>
          </h2>
          <p className="text-center text-lg text-gray-300 max-w-2xl mx-auto">
            At the forefront of the rapidly evolving advertising and marketing technology landscape
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div 
            className="opacity-0 translate-y-20 transition-all duration-700 delay-100"
            ref={el => (elementsRef.current[1] = el)}
          >
            <h3 className="h3 mb-6">Our Story</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              At the forefront of the rapidly evolving advertising and marketing technology landscape, 
              Eppion Venture Capital stands as a beacon of innovation and strategic insight. 
              We specialize in Go-To-Market (GTM) strategies and investments that propel AdTech 
              and MarTech companies to new heights of success.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our team of seasoned professionals brings together decades of experience in digital 
              advertising, marketing technology, and investment strategy. We understand the intricate 
              dynamics of the AdTech and MarTech ecosystems, from programmatic advertising and data 
              analytics to customer relationship management and marketing automation.
            </p>
          </div>
          
          <div 
            className="opacity-0 translate-y-20 transition-all duration-700 delay-200"
            ref={el => (elementsRef.current[2] = el)}
          >
            <div className="glass-morphism p-8 rounded-lg h-full">
              <h3 className="h3 mb-6">Team Meeting</h3>
              <div className="aspect-video bg-eppion-gray rounded-lg mb-6 flex items-center justify-center">
              <img src="https://images.pexels.com/photos/8866768/pexels-photo-8866768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Team" />
              </div>
              <p className="text-gray-300">
                Our collaborative approach brings together experts from diverse backgrounds to 
                deliver innovative solutions that drive business growth.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Card 
            className="glass-morphism border-0 p-6 opacity-0 translate-y-20 transition-all duration-700 delay-300"
            ref={el => (elementsRef.current[3] = el)}
          >
            <h3 className="h3 mb-4 text-gradient">Who We Are</h3>
            <p className="text-gray-300">
              Eppion Venture Capital is a dynamic and innovative consulting firm offering 
              comprehensive solutions for businesses seeking to maximize performance and 
              achieve sustainable development.
            </p>
          </Card>
          
          <Card 
            className="glass-morphism border-0 p-6 opacity-0 translate-y-20 transition-all duration-700 delay-400"
            ref={el => (elementsRef.current[4] = el)}
          >
            <h3 className="h3 mb-4 text-gradient">Our Approach</h3>
            <p className="text-gray-300">
              We collaborate with our clients, understand their unique challenges, and deliver 
              customized strategies and actionable recommendations that produce quantifiable results.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
