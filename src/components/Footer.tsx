import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

interface Social {
  name: string;
  url: string;
  icon: JSX.Element;
}

const SocialLinks: React.FC = () => {
  const socials: Social[] = [
    { name: '', url: 'https://www.linkedin.com/company/eppionventures', icon: <FaLinkedin /> },
    { name: '', url: 'https://twitter.com/eppionventures', icon: <FaTwitter /> },
    { name: '', url: 'https://www.instagram.com/eppionventures', icon: <FaInstagram /> },
    { name: '', url: 'https://www.facebook.com/eppionventures', icon: <FaFacebook /> },
  ];

  return (
    <div className="flex space-x-4">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-eppion-purple transition-colors duration-300 flex items-center space-x-2 group"
          aria-label={`Follow us on ${social.name}`}
        >
          <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
            {social.icon}
          </span>
          <span className="hidden md:inline text-sm font-medium">{social.name}</span>
        </a>
      ))}
    </div>
  );
};

const Footer: React.FC = () => {  const [email, setEmail] = useState<string>('');
  
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
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
    return (
    <footer className="bg-eppion-charcoal pt-16 px-6 shadow-lg glass-morphism">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          <div className="md:col-span-1">
            <div className="flex flex-col-2 mb-6 ">
              <img className="h-14 w-14 mb-4" src="/images/Eppion-logo-removebg-preview1.png"  alt="Eppoin-logo" />
              <h3 className="text-2xl font-bold text-gradient pt-4">Eppion Ventures</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering Innovation in Technology and Marketing
            </p>
            <SocialLinks />
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
        </div>      </div>
    </footer>
  );
};

export default Footer;