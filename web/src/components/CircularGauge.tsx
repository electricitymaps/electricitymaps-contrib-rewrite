import { Label, Pie, PieChart } from 'recharts';

const PIE_START_ANGLE = 90;

export interface CircularGaugeProps {
  percentage: number;
  name: string;
}

export function CircularGauge({ percentage, name }: CircularGaugeProps) {
  const value = percentage / 100;
  const data = [{ value }];
  const percentageAsAngle = value * 360;
  const endAngle = PIE_START_ANGLE - percentageAsAngle;

  return (
    <div className="flex flex-col items-center">
      <PieChart width={65} height={65} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
        <Pie
          innerRadius="80%"
          outerRadius="100%"
          startAngle={90}
          endAngle={-360}
          paddingAngle={0}
          dataKey="value"
          data={[{ value: 100 }]}
          fill="#eee"
          isAnimationActive={false}
          strokeWidth={0}
        >
          <Label
            className="select-none fill-black text-sm font-bold"
            position="center"
            offset={0}
            formatter={(value: number) => `${value}%`}
            value={percentage}
          />
        </Pie>
        <Pie
          data={data}
          innerRadius="80%"
          outerRadius="100%"
          startAngle={90}
          endAngle={endAngle}
          fill="#3C764A" // TODO: Use theme color
          paddingAngle={0}
          dataKey="value"
          animationDuration={500}
          animationBegin={0}
          strokeWidth={0}
        />
      </PieChart>
      <div className="mt-3 text-center text-xs">{name}</div>
    </div>
  );
}
