// Send a greeting message to the console for curious people
export function createConsoleGreeting() {
  console.info(
    `%cWelcome to Electricity Maps!
🌍 %cReady to work on fixing the climate full-time?
  https://electricitymaps.com/jobs
🐙 Got comments or want to contribute?
  https://github.com/electricityMaps/electricitymaps-contrib`,
    'color: green; font-weight: bold',
    'color: #666; font-style: italic'
  );
}
