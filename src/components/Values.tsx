
import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { isInViewport } from '@/lib/scrollUtils';

const coreValues = [
  {
    title: "Innovation",
    description: "Embracing cutting-edge technologies and strategies in AdTech and MarTech."
  },
  {
    title: "Inclusivity",
    description: "Championing diversity and creating opportunities for underrepresented communities."
  },
  {
    title: "Excellence",
    description: "Striving for the highest standards in our investments and strategic guidance."
  }
];

const commitments = [
  "Build strong and meaningful relationships within the diaspora and beyond to gain knowledge insights on market sectors.",
  "Invest in promising ventures and ideas from underrepresented communities.",
  "Guide entrepreneurs and businesses with our expertise and resources.",
  "Ignite innovation and growth in marginalized communities."
];

const Values = () => {
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
      id="values" 
      ref={sectionRef}
      className="section-padding bg-eppion-dark"
    >
      <div className="max-w-7xl mx-auto">
        <div 
          className="mb-16 opacity-0 translate-y-20 transition-all duration-700"
          ref={el => (elementsRef.current[0] = el)}
        >
          <h2 className="h2 text-center mb-4">
            <span className="text-gradient">Core Values</span>
          </h2>
          <p className="text-center text-lg text-gray-300 max-w-2xl mx-auto">
            The principles that guide our business and relationships
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {coreValues.map((value, index) => (
            <Card 
              key={value.title}
              className="glass-morphism border-0 p-6 text-center opacity-0 translate-y-20 transition-all duration-700"
              style={{ transitionDelay: `${index * 100 + 100}ms` }}
              ref={el => (elementsRef.current[index + 1] = el)}
            >
              <div className="mb-4">
                <div className="w-16 h-16 rounded-full bg-eppion-purple mx-auto flex items-center justify-center">
                  <span className="text-2xl">{value.title.charAt(0)}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-eppion-purple">{value.title}</h3>
              <p className="text-gray-300">{value.description}</p>
            </Card>
          ))}
        </div>
        
        <div 
          className="mb-16 opacity-0 translate-y-20 transition-all duration-700 delay-400"
          ref={el => (elementsRef.current[4] = el)}
        >
          <h3 className="h3 mb-6 text-center">Our Core Commitments</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commitments.map((commitment, index) => (
            <div 
              key={index}
              className="flex items-start glass-morphism p-6 rounded-lg opacity-0 translate-y-20 transition-all duration-700"
              style={{ transitionDelay: `${(index + 5) * 100}ms` }}
              ref={el => (elementsRef.current[index + 5] = el)}
            >
              <span className="text-eppion-purple mr-3 text-xl font-bold">✓</span>
              <p className="text-gray-300">{commitment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
