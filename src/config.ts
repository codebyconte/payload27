/** The only place to update official links and launch details. */
const links = {
  twitter: 'https://x.com/Payload_27',
  telegram: 'https://t.me/payload27',
  pumpfun: '',
  contractAddress: '',
};
// Supplying BOTH an official HTTPS Pump.fun URL and a contract activates live mode.
const ready = /^https:\/\/pump\.fun\//.test(links.pumpfun) && links.contractAddress.trim() !== '';
export const project = {
  ...links,
  launchStatus: ready ? 'live' as const : 'prelaunch' as const,
  heroImage: '/hero.jpg',
};
export const transmissions = [
  { code: '001', caption: 'Mission Control has questions.', label: 'UNIDENTIFIED LIFEFORM', image: '' },
  { code: '002', caption: 'Not on the manifest.', label: 'UNAUTHORIZED CARGO', image: '' },
  { code: '003', caption: 'Still onboard.', label: 'TOO LATE NOW', image: '' },
  { code: '004', caption: 'Destination: Mars.', label: 'NO RETURN TICKET', image: '' },
];
