import { ReactElement, useState } from 'react';
// import * as Switch from '@radix-ui/react-switch';

interface ToggleButtonProperties {}

export default function ToggleButton(properties: ToggleButtonProperties): ReactElement {
  const [enabled, setEnabled] = useState(false);
  return (
    // <div style={{ display: 'flex', alignItems: 'center' }}>
    //   <label className="Label" htmlFor="airplane-mode" style={{ paddingRight: 15 }}>
    //     Airplane mode
    //   </label>
    //   <Switch.Root className="SwitchRoot" id="airplane-mode">
    //     <Switch.Thumb className="SwitchThumb" />
    //   </Switch.Root>
    // </div>
    <div></div>
  );
}
