import { useLocation, useNavigate } from 'react-router-dom';

const variants = [
  { 
    path: '/variant/1', 
    label: 'System Alone',
    description: 'Facing the System Alone?'
  },
  { 
    path: '/variant/2', 
    label: 'Claim Approved',
    description: 'Your Disability Claim Approved'
  },
  { 
    path: '/variant/3', 
    label: 'Not a Battle',
    description: 'Benefits Shouldn\'t Be a Battle'
  },
  { 
    path: '/variant/4', 
    label: 'Can\'t Work',
    description: 'Can\'t Work Due to Disability?'
  }
];

export default function VariantNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-400 px-4 py-2">Preview Mode</div>
          <div className="flex overflow-x-auto whitespace-nowrap pb-2 sm:pb-0 hide-scrollbar">
            {variants.map((variant) => (
              <button
                key={variant.path}
                onClick={() => navigate(variant.path)}
                className={`
                  px-6 py-2 text-sm font-medium transition-all flex-shrink-0
                  ${location.pathname === variant.path 
                    ? 'bg-accent text-primary' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }
                `}
                title={variant.description}
              >
                {variant.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
