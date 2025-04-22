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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="text-sm text-gray-400">Preview Mode</div>
          <div className="flex flex-nowrap overflow-x-auto gap-2 pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {variants.map((variant) => (
              <button
                key={variant.path}
                onClick={() => navigate(variant.path)}
                className={`
                  px-4 py-2 rounded-[1px] text-sm font-medium transition-all whitespace-nowrap flex-shrink-0
                  ${location.pathname === variant.path 
                    ? 'bg-accent text-primary shadow-sm' 
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
