import { WaIcon } from './icons';

export default function FAB() {
  return (
    <a
      className="fab"
      href="https://wa.me/526641747593"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <span className="fab-pulse" aria-hidden="true" />
      <span className="fab-badge" aria-hidden="true">1</span>
      <WaIcon style={{ color: '#fff' }} />
    </a>
  );
}
