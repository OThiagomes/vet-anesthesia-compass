
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Heart size={24} className="text-vet-red" />
          <span className="text-xl font-bold text-vet-dark">VetAnesthesia Compass</span>
        </Link>
        <div className="flex space-x-6">
          <Link to="/" className="text-vet-dark hover:text-vet-blue transition-colors">
            Home
          </Link>
          <a href="#topics" className="text-vet-dark hover:text-vet-blue transition-colors">
            Tópicos
          </a>
          <a href="#about" className="text-vet-dark hover:text-vet-blue transition-colors">
            Sobre
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
