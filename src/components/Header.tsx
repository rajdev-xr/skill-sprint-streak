
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface HeaderProps {
  isLoggedIn: boolean;
  onAuthClick: () => void;
  onLogout: () => void;
}

export const Header = ({ isLoggedIn, onAuthClick, onLogout }: HeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SS</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            SkillSprint
          </h1>
        </div>

        <nav className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Button>
              <Button variant="outline" size="sm" onClick={onLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button onClick={onAuthClick} className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              Get Started
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};
