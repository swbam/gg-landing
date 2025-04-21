import * as React from 'react';
import { ResponsiveContainer } from "recharts"

import { cn } from '@/lib/utils';

interface ChartConfig {
  colors?: string[];
  height?: number;
  width?: number;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

const ChartContext = React.createContext<ChartConfig>({});

const Chart = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof ResponsiveContainer>['children'];
  }
>(({ className, children, config, ...props }, ref) => {
  return (
    <ChartContext.Provider value={config}>
      <div
        ref={ref}
        className={cn('w-full', className)}
        {...props}
      >
        <ResponsiveContainer width="100%" height={config.height || 350}>
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
Chart.displayName = 'Chart';

interface ChartContentProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    dataKey: string;
    color?: string;
  }>;
  label?: string;
  labelFormatter?: (label: string) => string;
  labelClassName?: string;
  formatter?: (value: number) => string;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  className?: string;
}

const ChartContent = React.forwardRef<HTMLDivElement, ChartContentProps>(
  ({ className, active, payload, label, labelFormatter, labelClassName, formatter, hideLabel, hideIndicator }, ref) => {
    if (!active || !payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn('rounded-lg border bg-background p-2 shadow-md', className)}
      >
        {!hideLabel && (
          <div className={cn('mb-1 text-sm font-medium', labelClassName)}>
            {labelFormatter ? labelFormatter(label || '') : label}
          </div>
        )}
        <div className="flex flex-col gap-0.5">
          {payload.map((item, index) => (
            <div key={`item-${index}`} className="flex items-center gap-2">
              {!hideIndicator && (
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              <span className="text-sm font-medium">
                {item.name}:{' '}
                {formatter
                  ? formatter(item.value)
                  : typeof item.value === 'number'
                  ? item.value.toLocaleString()
                  : item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
ChartContent.displayName = 'ChartContent';

export { Chart, ChartContent };
