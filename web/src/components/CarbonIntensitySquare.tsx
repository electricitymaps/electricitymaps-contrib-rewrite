// import { useTranslation } from '../helpers/translation';
import { animated, useSpring } from '@react-spring/web';
import { useCo2ColorScale } from '../hooks/theme';

/**
 * This function finds the optimal text color based on a custom formula
 * derived from the W3CAG standard (see https://www.w3.org/TR/WCAG20-TECHS/G17.html).
 * I changed the original formula from Math.sqrt(1.05 * 0.05) - 0.05 to
 * Math.sqrt(1.05 * 0.18) - 0.05. Because this expression is a constant
 * I replaced it with it's approached value (0.3847...) to avoid useless computations.
 * See https://github.com/tmrowco/electricitymap-contrib/issues/3365 for more informations.
 * @param {string} rgbColor a string with the background color (e.g. "rgb(0,5,4)")
 */
const getTextColor = (rgbColor: string) => {
  const colors = rgbColor.replace(/[^\d,.]/g, '').split(',');
  const r = Number.parseInt(colors[0], 10);
  const g = Number.parseInt(colors[1], 10);
  const b = Number.parseInt(colors[2], 10);
  const rgb = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.039_28 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  const luminosity = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  return luminosity >= 0.384_741_302_385_683_16 ? 'black' : 'white';
};

interface CarbonIntensitySquareProps {
  co2intensity: number;
  withSubtext?: boolean;
}

function CarbonIntensitySquare({
  co2intensity,
  withSubtext,
}: CarbonIntensitySquareProps) {
  // const { __ } = useTranslation();
  const co2ColorScale = useCo2ColorScale();
  const styles = useSpring({ backgroundColor: co2ColorScale(co2intensity) });
  const { number } = useSpring({
    from: { number: 0 },
    number: Number.isFinite(co2intensity) ? co2intensity : 0,
  });

  return (
    <div>
      <div>
        <animated.div
          style={{
            color: getTextColor(co2ColorScale(co2intensity)),
            ...styles,
          }}
          className="mx-auto flex h-[65px] w-[65px] flex-col items-center justify-center rounded-2xl"
        >
          <p className="select-none text-[1rem]" data-test-id="co2-square-value">
            <animated.span className="font-bold">
              {number.to((x) => `${Math.round(x) || '?'}`)}
            </animated.span>
            &nbsp;
            <span>g</span>
          </p>
        </animated.div>
      </div>
      <div className="mt-2 flex flex-col items-center">
        <div className="text-sm">{'Carbon Intensity'}</div>
        {withSubtext && <div className="text-sm">(gCO₂eq/kWh)</div>}
      </div>
    </div>
  );
}

export default CarbonIntensitySquare;
