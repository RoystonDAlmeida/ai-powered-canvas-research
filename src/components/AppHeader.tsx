import React from 'react';

interface AppHeaderProps {
  description?: string;
}

const AppHeader: React.FC<AppHeaderProps> = () => {
  return (
    <header className="bg-blue-700 text-white py-3 font-medium text-xl md:text-2xl fixed top-0 left-0 w-full z-40">
      <div className="max-w-screen-xl mx-auto flex items-center pr-96">
        <h1 className="flex-grow text-center font-serif">
          Insight Canvas AI
        </h1>
      </div>
    </header>
  );
};

export default AppHeader; 