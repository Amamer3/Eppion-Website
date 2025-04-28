
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter.",
    });
    
    setEmail('');
  };
  
  const handleAcceptCookies = () => {
    setCookiesAccepted(true);
    localStorage.setItem('cookiesAccepted', 'true');
  };
  
  return (
    <footer className="bg-eppion-charcoal pt-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-gradient mb-4">Eppion Ventures</h3>
            <p className="text-gray-400 mb-6">
              Empowering Innovation in Technology and Marketing
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-eppion-purple transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-eppion-purple transition-colors">About Us</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-eppion-purple transition-colors">Services</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-eppion-purple transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Eppion Ventures</h3>
            <p className="text-gray-400 mb-2">
              contact@eppionventures.com
            </p>
            <p className="text-gray-400 mb-4">
              Hours: Mon-Fri 09:00 am – 05:00 pm
            </p>
            
            <h4 className="text-lg font-semibold mb-3 text-white">Subscribe</h4>
            <p className="text-gray-400 mb-4">
              Stay up to date on the latest marketing ideas!
            </p>
            
            <form onSubmit={handleSubscribe} className="flex space-x-2">
              <Input 
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-white/20 focus:border-eppion-purple"
              />
              <Button 
                type="submit"
                className="bg-eppion-purple hover:bg-eppion-purple-light whitespace-nowrap"
              >
                Sign up
              </Button>
            </form>
          </div>
        </div>
        
        <div className="py-6 text-center text-gray-500 text-sm">
          <p>Copyright © 2025 Eppion Ventures - All Rights Reserved.</p>
        </div>
      </div>
      
      {/* Cookie consent banner */}
      {!cookiesAccepted && (
        <div className="fixed bottom-0 left-0 right-0 bg-eppion-dark glass-morphism p-4 flex flex-col sm:flex-row justify-between items-center gap-4 z-50">
          <p className="text-gray-300 text-sm">
            This website uses cookies. We use cookies to analyze website traffic and optimize your website experience. 
            By accepting our use of cookies, your data will be aggregated with all other user data.
          </p>
          <Button 
            onClick={handleAcceptCookies}
            className="bg-eppion-purple hover:bg-eppion-purple-light whitespace-nowrap"
          >
            Accept
          </Button>
        </div>
      )}
    </footer>
  );
};

export default Footer;
