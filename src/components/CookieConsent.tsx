import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

const CookieConsent = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setOpen(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>      <DialogContent className="bg-eppion-dark/95 backdrop-blur-lg border border-eppion-purple/20 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Cookie Consent</DialogTitle>
          <DialogDescription className="text-gray-300 mt-2">
            This website uses cookies to analyze traffic and enhance your browsing experience. 
            By accepting cookies, you agree to our data collection practices.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            onClick={handleAcceptCookies}
            className="bg-eppion-purple hover:bg-eppion-purple-light whitespace-nowrap px-6"
          >
            Accept All Cookies
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CookieConsent;
