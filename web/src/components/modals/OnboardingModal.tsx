import React from 'react';
import { resolvePath, useParams } from 'react-router-dom';
import { saveKey } from '../../utils/localStorage';

import Modal from './OnboardingModalInner';

const views = [
  {
    headerImage: resolvePath('electricitymaps-icon.svg'),
    isMainTitle: true,
    renderContent: (__: (translationKey: string) => string) => (
      <React.Fragment>
        <div>
          <h1 className="text-2xl">Electricity Maps</h1>
        </div>
        <div className=" py-6 text-xl">
          <h2>{__('onboarding-modal.view1.subtitle')}</h2>
        </div>
      </React.Fragment>
    ),
  },
  {
    headerImage: resolvePath('onboarding/mapExtract.png'),
    renderContent: (__: (translationKey: string) => string) => (
      <React.Fragment>
        <div>
          <h2 className="text-xl">{__('onboarding-modal.view2.header')}</h2>
        </div>
        <div>{__('onboarding-modal.view2.text')}</div>
      </React.Fragment>
    ),
  },
  {
    headerImage: resolvePath('onboarding/exchangeArrows.png'),
    renderContent: (__: (translationKey: string) => string) => (
      <React.Fragment>
        <div>
          <h2 className="text-xl">{__('onboarding-modal.view3.header')}</h2>
        </div>
        <div>{__('onboarding-modal.view3.text')}</div>
      </React.Fragment>
    ),
  },
  {
    headerImage: resolvePath('onboarding/splitLayers.png'),
    renderContent: (__: (translationKey: string) => string) => (
      <React.Fragment>
        <div>
          <h2 className="text-xl">{__('onboarding-modal.view4.header')}</h2>
        </div>
        <div>{__('onboarding-modal.view4.text')}</div>
      </React.Fragment>
    ),
  },
];

export function OnboardingModal() {
  const { skipOnboarding } = useParams();
  const [isVisible, setIsVisible] = React.useState(
    localStorage.getItem('onboardingSeen') !== 'true' && !skipOnboarding
  );
  const handleDismiss = () => {
    saveKey('onboardingSeen', 'true');
    setIsVisible(false);
  };
  return (
    <Modal
      modalName="onboarding"
      visible={isVisible}
      onDismiss={handleDismiss}
      views={views}
    />
  );
}
