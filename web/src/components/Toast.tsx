import * as React from 'react';
import * as RadixToast from '@radix-ui/react-toast';

function Toast() {
  const [open, setOpen] = React.useState(false);
  const eventDateReference = React.useRef(new Date());
  const timerReference = React.useRef(0);

  React.useEffect(() => {
    return () => clearTimeout(timerReference.current);
  }, []);

  return (
    // <Toast.Provider swipeDirection="right">
    //   <button
    //     className="Button large violet"
    //     onClick={() => {
    //       setOpen(false);
    //       window.clearTimeout(timerRef.current);
    //       timerRef.current = window.setTimeout(() => {
    //         eventDateRef.current = oneWeekAway();
    //         setOpen(true);
    //       }, 100);
    //     }}
    //   >
    //     Add to calendar
    //   </button>

    <RadixToast.Root className="ToastRoot" open={true} onOpenChange={setOpen}>
      <RadixToast.Title className="ToastTitle">Scheduled: Catch up</RadixToast.Title>
      <RadixToast.Description asChild>
        <time
          className="ToastDescription"
          dateTime={eventDateReference.current.toISOString()}
        >
          12:00pm on {eventDateReference.current.toLocaleDateString()}
        </time>
      </RadixToast.Description>
      <RadixToast.Action className="ToastAction" asChild altText="Goto schedule to undo">
        <button className="Button small green">Undo</button>
      </RadixToast.Action>
    </RadixToast.Root>
  );
}

export default Toast;
