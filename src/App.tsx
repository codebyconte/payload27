import React, { useEffect, useRef, useState } from 'react';
import { project, transmissions } from './config';
const nav = [['LORE','lore'],['MISSION','mission'],['$P27','token'],['COMMUNITY','community']];
function ExternalLink({url, children, className = ''}: {url:string;children:React.ReactNode;className?:string}) {
  if (!url || !/^https:\/\//.test(url)) return null;
  return <a className={className} href={url} target="_blank" rel="noopener noreferrer">{children}</a>;
}
function Label({number,children}: {number:string;children:React.ReactNode}) { return <div className="section-label"><span>{number} /</span> {children}</div>; }
function ContractArea({compact = false}: {compact?:boolean}) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  async function copyContract() {
    try {
      await navigator.clipboard.writeText(project.contractAddress);
      setCopied(true); setFeedback('Official contract copied.');
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => { setCopied(false); setFeedback(''); }, 2200);
    } catch { setFeedback('Copy unavailable. Select the full contract address below to copy it.'); }
  }
  const short = `${project.contractAddress.slice(0,4)}…${project.contractAddress.slice(-4)}`;
  return <div className={compact ? 'contract-area compact-contract' : 'contract-area reveal'}>
    <div className="contract"><div><span>OFFICIAL CONTRACT</span><strong className="short-address" title={project.contractAddress}>{short}</strong></div><button className="button secondary" onClick={copyContract}>{copied ? 'COPIED' : 'COPY CONTRACT'}</button></div>
    <p className="contract-note" role="status" aria-live="polite">{feedback || 'VERIFY THE CONTRACT'}</p>
    {!compact && <p className="contract-warning">Only trust the official contract shown on payload27.com and the official PAYLOAD 27 channels.</p>}
    <code className="full-contract">{project.contractAddress}</code>
  </div>;
}
export default function App() {
  const [menu,setMenu] = useState(false);
  const [active,setActive] = useState(''); const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.06 });
    reveals.forEach(el => { el.classList.add('reveal-ready'); observer.observe(el); });
    const sections = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    }), { rootMargin: '-15% 0px -55% 0px' });
    document.querySelectorAll('section[id], .hero').forEach(el => sections.observe(el));
    return () => { observer.disconnect(); sections.disconnect(); };
  }, []);
  useEffect(() => {
    if (!menu) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenu(false); menuButton.current?.focus(); }
    };
    const clickAway = (event: MouseEvent) => {
      if (event.target instanceof Element && !event.target.closest('header')) setMenu(false);
    };
    const resize = () => { if (window.innerWidth > 800) setMenu(false); };
    document.addEventListener('keydown', close); document.addEventListener('click', clickAway); window.addEventListener('resize', resize);
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('click', clickAway); window.removeEventListener('resize', resize); };
  }, [menu]);
  return <><a className="skip" href="#main">Skip to content</a><header><a className="brand" href="#" aria-label="Payload 27 home"><span className="brand-mark">27</span><span>PAYLOAD 27<span className="brand-small">UNAUTHORIZED SINCE ORBIT</span></span></a><nav id="main-navigation" aria-label="Main navigation" className={menu?'open':''}>{nav.map(([name,id])=><a key={id} aria-current={active === id ? 'location' : undefined} href={`#${id}`} onClick={()=>setMenu(false)}>{name}</a>)}</nav><ExternalLink url={project.pumpfun} className="button nav-buy">BUY $P27</ExternalLink><button ref={menuButton} aria-controls="main-navigation" className="menu-toggle" aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?'CLOSE':'MENU'} <span>{menu?'−':'+'}</span></button></header>
  <main id="main"><section className="hero" aria-labelledby="hero-title"><img className="hero-art" width="1536" height="1024" src={project.heroImage} srcSet={project.heroImage === '/hero.jpg' ? '/hero-mobile.jpg 768w, /hero.jpg 1536w' : undefined} sizes="100vw" alt="P27, a mysterious small astronaut with glowing eyes, floating in space beside Mars" fetchPriority="high"/><div className="hero-shade"/><div className="hero-content"><div className="eyebrow"><span className="signal"/> UNAUTHORIZED PAYLOAD DETECTED</div><h1 id="hero-title">PAYLOAD<span>27</span></h1><p className="hero-story">26 were on the manifest.<br/><strong>27 made it to orbit.</strong></p><p className="hero-support">The unauthorized payload.<br/><span className="hero-destination">Destination: Mars.</span></p><div className="hero-actions"><ExternalLink url={project.pumpfun} className="button primary">BUY $P27</ExternalLink><ExternalLink url={project.telegram} className="button secondary">JOIN THE MISSION</ExternalLink></div><div className="hero-live">LIVE ON SOLANA <ExternalLink url={project.twitter}>X / @Payload_27</ExternalLink></div></div><div className="hero-coordinates">SUBJECT P27<br/><span>ORIGIN: UNKNOWN</span></div><div className="hero-bottom"><span>01 / FIRST CONTACT</span><a href="#lore">SCROLL TO DECLASSIFY <span>↓</span></a><span>DESTINATION: MARS</span></div></section>
  <div className="ticker-strip"><span>MANIFEST <b>26</b></span><span>ONBOARD <b>27</b></span><span>DESTINATION <b>MARS</b></span></div>
  <section id="lore" className="section lore"><div className="reveal"><Label number="02">THE INCIDENT</Label><h2>THE 27TH<br/><span className="outline-text">PAYLOAD.</span></h2><p className="large-copy">26 payloads were accounted for.<br/>Then something appeared on the manifest.</p><p className="red-copy">Payload 27.</p><p>Nobody knows who put him there.<br/>Nobody knows what he is.<br/>Nobody knows how he got onboard.</p><p className="lore-last">By the time anyone noticed,<br/><strong>he was already in orbit.</strong></p></div><article className="mission-log reveal"><div className="log-top"><span>FLIGHT MANIFEST / 027</span><span className="red">RESTRICTED</span></div><div className="log-heading">MISSION CONTROL<span>INCIDENT REPORT</span></div><div className="log-row"><span>EXPECTED PAYLOADS</span><strong>26</strong></div><div className="log-row"><span>ACTUAL PAYLOADS</span><strong className="red">27</strong></div><div className="log-row"><span>SUBJECT IDENTITY</span><strong className="redacted" aria-label="Classified">████████</strong></div><div className="log-row"><span>AUTHORIZATION</span><strong>NONE</strong></div><div className="log-note"><span>OPERATOR NOTE</span><p>“That's definitely not one of ours.”</p></div><div className="stamp">STILL ONBOARD</div><div className="log-footer">FILE P27-001 <span>CLASSIFICATION: WE HAVE NO IDEA</span></div></article></section>
  <section id="mission" className="section mission"><div className="reveal mission-intro"><Label number="03">THE ONLY PLAN</Label><h2>MISSION: <span className="red">MARS</span></h2><p>No roadmap. No promises. One destination.</p></div><div className="journey reveal">{[['01','EARTH','LEFT WITHOUT ASKING'],['02','ORBIT','CURRENTLY LOITERING'],['03','???','WE’LL FIGURE IT OUT'],['04','MARS','THE DESTINATION']].map(([n,title,subtitle],i)=><div className={`journey-stop stop-${i}`} key={n}><div className="journey-node" aria-hidden="true">{i===2?'?':i===3?'04':i===1?'27':'01'}</div><span className="stop-number">{n}</span><h3>{title}</h3><p>{subtitle}</p>{i===1&&<span className="here">YOU ARE HERE</span>}</div>)}</div><div className="mission-command reveal">GET P27 TO MARS<span>NO RETURN TICKET.</span></div></section>
  <section id="token" className="section token"><div className="token-heading reveal"><div><Label number="04">THE PAYLOAD</Label><h2>$P27<span className="red">.</span></h2></div><p>Not on the manifest.<br/>Still onboard.</p></div><div className="token-grid reveal">{[['NAME',project.tokenName],['TICKER',`$${project.ticker}`],['NETWORK',project.network],['LAUNCH','PUMP.FUN']].map(([label,value])=><div className="token-card" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="launch-status reveal"><span>STATUS</span><strong>{project.launchStatus.toUpperCase()}</strong></div><ContractArea /><div className="verified-links reveal"><ExternalLink url={project.pumpfun}>VIEW ON PUMP.FUN</ExternalLink><ExternalLink url={project.solscan}>VIEW ON SOLSCAN</ExternalLink><ExternalLink url={project.launchTransaction}>LAUNCH TRANSACTION</ExternalLink><ExternalLink url={project.twitter}>X</ExternalLink><ExternalLink url={project.telegram}>TELEGRAM</ExternalLink></div></section>
  <section id="community" className="section community"><div className="community-heading reveal"><div><Label number="05">SIGNAL RECEIVED</Label><h2>TRANSMISSIONS<br/><span className="outline-text">FROM ORBIT.</span></h2></div><p>P27 has been spotted.<br/>Follow the transmissions before<br/>Mission Control notices.</p></div><div className="community-links reveal"><ExternalLink url={project.twitter} className="community-card"><span className="social-platform">X</span><strong>@Payload_27</strong><span className="social-action">FOLLOW TRANSMISSIONS</span></ExternalLink><ExternalLink url={project.telegram} className="community-card telegram-card"><span className="social-platform">Telegram</span><strong>PAYLOAD 27</strong><span className="social-action">JOIN THE CREW</span></ExternalLink></div><div className="meme-grid">{transmissions.map((m,i)=><article className={`meme-card meme-${i} reveal`} key={m.code}><div className="meme-image">{m.image?<img src={m.image} alt={m.caption} loading="lazy" decoding="async" width="640" height="480"/>:<><img src={project.heroImage === '/hero.jpg' ? '/transmission.jpg' : project.heroImage} alt="" loading="lazy" decoding="async" width="640" height="427"/><span className="meme-overlay">{i===0?'WHO\nIS THAT?':i===1?'ACCESS\nDENIED.':i===2?'27':'MARS\nOR BUST.'}</span></>}<span className="transmission-id">TRANSMISSION {m.code}</span></div><div className="meme-caption"><h3>{m.caption}</h3><span>{m.label}</span></div></article>)}</div></section>
  <section className="final-cta"><div className="reveal"><div className="eyebrow">THE MANIFEST WAS WRONG.</div><h2>HE WASN'T SUPPOSED<br/>TO BE HERE.<br/><span>BUT HE'S NOT<br/>GOING BACK.</span></h2><p className="final-destination">Destination: Mars. <span aria-hidden="true">🔴</span></p><div className="hero-actions"><ExternalLink url={project.pumpfun} className="button primary">BUY $P27</ExternalLink><ExternalLink url={project.telegram} className="button secondary">JOIN TELEGRAM</ExternalLink></div><ContractArea compact /><div className="final-brand">PAYLOAD 27 <span>$P27</span></div></div><span className="final-orbit" aria-hidden="true">27</span></section>
  </main><footer><div className="footer-top"><a className="brand" href="#"><span className="brand-mark">27</span>PAYLOAD 27</a><div><ExternalLink url={project.twitter}>X / TWITTER</ExternalLink><ExternalLink url={project.telegram}>TELEGRAM</ExternalLink><ExternalLink url={project.pumpfun}>PUMP.FUN</ExternalLink><ExternalLink url={project.solscan}>SOLSCAN</ExternalLink><ExternalLink url={project.website}>OFFICIAL WEBSITE</ExternalLink></div></div><p>PAYLOAD 27 is an independent internet meme project. It is not affiliated with, endorsed by, or associated with SpaceX, Elon Musk, Starlink, Tesla, or any related company.</p><p>Cryptocurrency involves significant risk. Do your own research.</p><div className="footer-bottom"><span>© {new Date().getFullYear()} PAYLOAD 27</span><span>26 ON THE MANIFEST. 27 IN ORBIT.</span></div></footer></>;
}
