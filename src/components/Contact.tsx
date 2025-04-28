
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { isInViewport } from '@/lib/scrollUtils';
import { toast } from '@/components/ui/use-toast';

const businessHours = [
  { day: 'Monday', hours: '09:00 am – 05:00 pm' },
  { day: 'Tuesday', hours: '09:00 am – 05:00 pm' },
  { day: 'Wednesday', hours: '09:00 am – 05:00 pm' },
  { day: 'Thursday', hours: '09:00 am – 05:00 pm' },
  { day: 'Friday', hours: '09:00 am – 05:00 pm' },
  { day: 'Saturday', hours: 'Closed' },
  { day: 'Sunday', hours: 'Closed' },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [isToday, setIsToday] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });
  
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
  
  useEffect(() => {
    // Get current day and check if business is open
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayName = dayNames[today];
    setIsToday(currentDayName);
    
    // Check if business is open today
    const currentDayHours = businessHours.find(day => day.day === currentDayName)?.hours;
    setIsOpen(currentDayHours !== 'Closed');
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. We will get back to you shortly.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      interest: '',
      message: ''
    });
  };
  
  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-eppion-dark to-eppion-charcoal"
    >
      <div className="max-w-7xl mx-auto">
        <div 
          className="mb-16 opacity-0 translate-y-20 transition-all duration-700"
          ref={el => (elementsRef.current[0] = el)}
        >
          <h2 className="h2 text-center mb-4">
            <span className="text-gradient">Contact Us</span>
          </h2>
          <p className="text-center text-lg text-gray-300 max-w-2xl mx-auto">
            Drop us a line! We'd love to hear from you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div 
            className="opacity-0 translate-y-20 transition-all duration-700 delay-100"
            ref={el => (elementsRef.current[1] = el)}
          >
            <Card className="glass-morphism border-0 p-6 h-full">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange}
                      className="bg-transparent border-white/20 focus:border-eppion-purple" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email*</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleChange}
                      required
                      className="bg-transparent border-white/20 focus:border-eppion-purple" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange}
                    className="bg-transparent border-white/20 focus:border-eppion-purple" 
                  />
                </div>
                
                <div className="space-y-2 mb-6">
                  <Label htmlFor="interest">I'm interested in...</Label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-eppion-purple"
                  >
                    <option value="" className="bg-eppion-charcoal">Select an interest</option>
                    <option value="consulting" className="bg-eppion-charcoal">Consulting Services</option>
                    <option value="marketing" className="bg-eppion-charcoal">Marketing Strategies</option>
                    <option value="investment" className="bg-eppion-charcoal">Investment Opportunities</option>
                    <option value="other" className="bg-eppion-charcoal">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2 mb-6">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={5}
                    value={formData.message} 
                    onChange={handleChange}
                    className="bg-transparent border-white/20 focus:border-eppion-purple" 
                  />
                </div>
                
                <div className="mb-6 text-sm text-gray-400">
                  This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-eppion-purple hover:bg-eppion-purple-light"
                >
                  Send
                </Button>
              </form>
            </Card>
          </div>
          
          <div 
            className="opacity-0 translate-y-20 transition-all duration-700 delay-200"
            ref={el => (elementsRef.current[2] = el)}
          >
            <div className="glass-morphism p-6 rounded-lg mb-8">
              <h3 className="h3 mb-6">Better yet, see us in person!</h3>
              <p className="text-gray-300 mb-4">
                We love our customers, so feel free to visit during normal business hours.
              </p>
              
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4 text-eppion-purple">Eppion Ventures</h4>
                <p className="text-gray-300">
                  contact@eppionventures.com
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-4">Hours</h4>
                <table className="w-full">
                  <tbody>
                    {businessHours.map((day) => (
                      <tr key={day.day} className={isToday === day.day ? "text-eppion-purple" : ""}>
                        <td className="py-1">{day.day}</td>
                        <td className="py-1 text-right">{day.hours}</td>
                      </tr>
                    ))}
                    <tr className="font-semibold">
                      <td className="pt-4">Today</td>
                      <td className="pt-4 text-right">{isOpen ? "Open" : "Closed"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="glass-morphism p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Join Us on Our Journey</h3>
              <p className="text-gray-300 mb-6">
                Take the first step, and contact us to discuss your marketing and business goals.
              </p>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2">See why our customers love Eppion Ventures</h4>
                <p className="text-gray-400 italic">Reviews coming soon!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
