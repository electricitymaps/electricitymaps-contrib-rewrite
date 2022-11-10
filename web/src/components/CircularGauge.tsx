import { Label, PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';

export interface CircularGaugeProps {
  percentage: number;
  name: string;
  pixelWidth?: number;
  pixelHeight?: number;
}

const MAX_PERCENTAGE = 100;

export function CircularGauge({ percentage, name }: CircularGaugeProps) {
  const data = [{ percentage, fill: '#4C764A' }];
  return (
    <div className="flex flex-col items-center">
      <RadialBarChart
        width={90}
        height={90}
        data={data}
        innerRadius="75%"
        outerRadius="100%"
      >
        <PolarAngleAxis
          type="number"
          domain={[0, MAX_PERCENTAGE]}
          dataKey={'percentage'}
          tick={false}
        >
          <Label value={'Low carbon'} offset={0} position="insideBottom" />
        </PolarAngleAxis>
        <RadialBar
          label={{
            position: 'center',
            offset: 0,
            className: 'select-none fill-black font-bold',
            formatter: (value: number) => `${value}%`,
          }}
          background
          dataKey="percentage"
          data={data}
        ></RadialBar>
      </RadialBarChart>
      <div>
        <div className="text-center text-xs">{name}</div>
      </div>
    </div>
  );
}
