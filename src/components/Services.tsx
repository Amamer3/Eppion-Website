
import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { isInViewport } from '@/lib/scrollUtils';

const serviceCategories = [
  {
    title: "Process",
    subtitle: "Process Optimization",
    items: [
      "Workflow analysis",
      "Efficiency improvements",
      "Technology integration"
    ],
    icon: "⚙️"
  },
  {
    title: "Marketing",
    subtitle: "Marketing Strategies",
    items: [
      "Brand positioning",
      "Digital marketing plans",
      "Customer acquisition strategies"
    ],
    icon: "📊"
  },
  {
    title: "Strategy",
    subtitle: "Strategic Planning",
    items: [
      "Market analysis",
      "Goal setting",
      "Action plan development"
    ],
    icon: "🎯"
  }
];

const Services = () => {
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
      id="services" 
      ref={sectionRef}
      className="section-padding bg-eppion-dark"
    >
      <div className="max-w-7xl mx-auto">
        <div 
          className="mb-16 opacity-0 translate-y-20 transition-all duration-700"
          ref={el => (elementsRef.current[0] = el)}
        >
          <h2 className="h2 text-center mb-4">
            <span className="text-gradient">Consulting Services</span>
          </h2>
          <p className="text-center text-lg text-gray-300 max-w-2xl mx-auto">
            Comprehensive solutions tailored to your business needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {serviceCategories.map((service, index) => (
            <Card 
              key={service.title}
              className="glass-morphism border-0 overflow-hidden opacity-0 translate-y-20 transition-all duration-700"
              style={{ transitionDelay: `${index * 100 + 100}ms` }}
              ref={el => (elementsRef.current[index + 1] = el)}
            >
              <div className="absolute -right-4 -top-4 text-6xl opacity-20 rotate-12">
                {service.icon}
              </div>
              <CardHeader>
                <CardTitle className="text-eppion-purple">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="text-xl font-semibold mb-4">{service.subtitle}</h4>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-eppion-purple mr-2">✓</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div 
          className="glass-morphism p-8 rounded-lg opacity-0 translate-y-20 transition-all duration-700 delay-400"
          ref={el => (elementsRef.current[4] = el)}
        >
          <h3 className="h3 mb-6">Target Market</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            We serve small and medium-sized businesses from various industries, including technology, 
            manufacturing, healthcare, and professional services.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
