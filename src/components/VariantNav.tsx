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
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">Preview Mode</div>
          <div className="flex gap-2">
            {variants.map((variant) => (
              <button
                key={variant.path}
                onClick={() => navigate(variant.path)}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-all
                  ${location.pathname === variant.path 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
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
