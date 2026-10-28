import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowRight, Heart, Sparkles, Github, Linkedin, Mail, Code2, Instagram, BriefcaseBusiness, Trophy, ExternalLink, Moon, Sun, Terminal, Braces, Music2, VolumeX } from 'lucide-react';
import './style.css';

const projects = [
  { name: 'AgentHub', type: 'FULL-STACK · GENAI', desc: 'A little home for AI agents — create, manage, and collaborate with them without the chaos.', tech: ['React', 'Node.js', 'Express', 'MongoDB'], icon: '✳', color: 'pink', link: 'https://github.com/sush123-mita/AgentHub' },
  { name: 'Mental Health Checkup', type: 'ML · WEB APP', desc: 'A mental wellness assessment project combining a simple interface with a machine learning model.', tech: ['React', 'FastAPI', 'Python', 'ML'], icon: '♡', color: 'sage', link: 'https://github.com/sush123-mita/Mental-Health-checkup' },
  { name: 'GetEmployed', type: 'AI · PRODUCTIVITY', desc: 'A job-search helper designed to make the resume-to-opportunity journey feel a little less chaotic.', tech: ['Node.js', 'FastAPI', 'MongoDB', 'Gemini'], icon: '✉', color: 'butter', link: 'https://github.com/sush123-mita' },
  { name: 'Summarizer App', type: 'GENAI · EXPERIMENT', desc: 'Turning long reads into the important bits, because not every article needs a 40-minute commitment.', tech: ['JavaScript', 'AI', 'Web'], icon: '⌁', color: 'lilac', link: 'https://github.com/sush123-mita/SummerizerApp' },
];
const skills = ['React', 'JavaScript', 'Node.js', 'Python', 'FastAPI', 'MongoDB', 'GenAI', 'Machine Learning', 'Git'];
const experiences = [
  { role: 'Web Developer Intern', company: 'TechJM LLP Solutions', date: 'Feb – May 2026', detail: 'Built React and Node.js features across multiple projects, added Redis in-memory caching for frequent queries, and wrote Python data-processing scripts.', tags: ['React', 'Node.js', 'Redis', 'Python'] },
  { role: 'Web Developer Intern', company: 'Suvidha Foundation', date: 'Oct – Nov 2025', detail: 'Developed responsive React interfaces, integrated Express REST APIs, and worked on rate limiting and input validation.', tags: ['React', 'Express', 'REST APIs'] },
  { role: 'Graphic Design Intern', company: 'InAmigos Foundation', date: 'Internship', detail: 'Created visual assets and CSR-focused posters for community and awareness initiatives.', tags: ['Graphic Design', 'Visual Communication'] },
];
const achievements = [
  { title: 'HackWithMate 5.0', detail: 'Finalist', icon: '✦' },
  { title: 'TechYug 2.0 · Glider Competition', detail: '2nd position', icon: '🏆' },
  { title: 'AI Fundamentals', detail: 'GUVI certification', icon: '✳' },
  { title: 'LeetCode', detail: '200+ problems solved', icon: '⌘' },
  { title: 'Graphic Design', detail: 'InAmigos Foundation internship', icon: '✎' },
];
const memeGifs = [
  { src: 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif', alt: 'Cat typing furiously at a keyboard', name: 'typing cat' },
  { src: 'https://media.giphy.com/media/6uGhT1O4sxpi8/giphy.gif', alt: 'Confused Travolta looking around', name: 'confused Travolta' },
  { src: 'https://media.giphy.com/media/NTur7XlVDUdqM/giphy.gif', alt: 'Dog sitting calmly while everything is on fire', name: 'this is fine' },
  { src: 'https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif', alt: 'Dancing baby celebrating', name: 'dancing baby' },
];
function App() {
  const [dark, setDark] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [musicError, setMusicError] = useState('');
  const audioRef = React.useRef(null);
  const musicTimerRef = React.useRef(null);
  const [leetcodeRating, setLeetcodeRating] = useState('Check live profile');
  const [leetcodeLoading, setLeetcodeLoading] = useState(true);
  useEffect(() => {
    let active = true;
    fetch('https://leetcode-stats.tashif.codes/Exception_indeed/contests')
      .then(r => { if (!r.ok) throw new Error('Stats unavailable'); return r.json(); })
      .then(json => {
        const data = json?.data ?? json;
        const rating = data?.rating ?? data?.contestRating ?? data?.userContestRanking?.rating;
        if (active && rating != null && Number.isFinite(Number(rating))) setLeetcodeRating(Math.round(Number(rating)).toLocaleString());
      })
      .catch(() => {})
      .finally(() => { if (active) setLeetcodeLoading(false);       });
      return () => { active = false; };
  }, []);
  const toggleMusic = async () => {
    if (musicOn) {
      if (musicTimerRef.current) window.clearInterval(musicTimerRef.current);
      if (audioRef.current) audioRef.current.context.close();
      audioRef.current = null; musicTimerRef.current = null; setMusicOn(false); return;
    }
    let context;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) throw new Error('Web Audio is not supported in this browser.');
      context = new AudioCtx();
      if (context.state === 'suspended') await context.resume();
      const master = context.createGain(); master.gain.value = 0.035; master.connect(context.destination);
      const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46];
      let index = 0;
      const playNote = () => {
        if (context.state === 'closed') return;
        const osc = context.createOscillator(); const gain = context.createGain();
        osc.type = 'sine'; osc.frequency.value = notes[index++ % notes.length];
        gain.gain.setValueAtTime(0.0001, context.currentTime); gain.gain.exponentialRampToValueAtTime(0.22, context.currentTime + 0.04); gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.48);
        osc.connect(gain); gain.connect(master); osc.start(); osc.stop(context.currentTime + 0.5);
      };
      playNote(); musicTimerRef.current = window.setInterval(playNote, 560);
      audioRef.current = { context }; setMusicError(''); setMusicOn(true);
    } catch (error) {
      if (context && context.state !== 'closed') context.close();
      console.error('Unable to start background music:', error);
      setMusicError('music unavailable');
      setMusicOn(false);
    }
  };
  useEffect(() => () => { if (musicTimerRef.current) window.clearInterval(musicTimerRef.current); if (audioRef.current?.context) audioRef.current.context.close(); }, []);

  return <div className={dark ? 'site-shell dark-theme' : 'site-shell light-theme'}>
    <header className="nav wrap">
      <a className="wordmark" href="#home"><span className="logo-heart">♡</span> sushmita<span className="pink">.exe</span><span className="tiny-spark">✳</span></a>
      <nav><a href="#home">home</a><a href="#about">about</a><a href="#skills">skills</a><a href="#work">things i made</a><a href="#experience">experience</a><a href="#achievements">wins</a><a href="#meme-break">memes</a><a href="#contact">say hi</a></nav>
      <div className="nav-actions"><div className="status"><span className="status-dot"/> open to good things <span className="smile">☺</span></div><button className="music-toggle" onClick={toggleMusic} aria-label={musicOn ? 'Turn background music off' : 'Turn background music on'} aria-pressed={musicOn} title={musicError || undefined}>{musicOn ? <VolumeX size={15}/> : <Music2 size={15}/>}<span>{musicError || (musicOn ? 'music on' : 'lo-fi on?')}</span></button><button className="theme-toggle" onClick={() => setDark(!dark)} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>{dark ? <Sun size={15}/> : <Moon size={15}/>}<span>{dark ? 'light mode' : 'dark mode'}</span></button></div>
    </header>

    <main>
      <section className="hero wrap" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line"/> A DEVELOPER WITH TOO MANY TABS OPEN</p>
          <h1>hi, i'm<br/><em>Sushmita.</em></h1>
          <p className="hero-sub">Hello, I’m Sushmita Singh —<br className="desktop"/> a developer exploring AI, one build at a time.</p><p className="hero-intro">CSE student specialising in AI. I build web apps, explore GenAI, and turn ideas into things you can click.</p>
          <p className="roles">software developer <b>·</b> AI enthusiast <b>·</b> professional tab hoarder</p><div className="hero-terminal"><Terminal size={14}/><span>currently building: <b>cool things with AI</b></span><i className="terminal-cursor">▍</i></div>
          <div className="hero-actions"><a className="btn primary" href="#work">see what i made <ArrowUpRight size={16}/></a><a className="btn secondary" href="#about">my little corner of the internet</a></div>
          <div className="hand-note note-left">good code<br/>better days <Heart size={13}/></div>
        </div>
        <div className="hero-art" aria-label="Animated illustrated developer character and scrapbook notes"><div className="hello-bubble">hello, nice to meet you! <span>✦</span></div>
          <div className="orbit orbit-one">✳</div><div className="orbit orbit-two">♡</div>
          <div className="polaroid portrait"><div className="portrait-art" role="img" aria-label="Cartoon illustration of Sushmita as a developer"><span className="hair"></span><span className="face"><i className="eye eye-left"/><i className="eye eye-right"/><i className="cheek cheek-left"/><i className="cheek cheek-right"/><i className="smile-line"/></span><span className="portrait-body"/><span className="portrait-heart">✦</span></div><p>cartoon me, pretending the bug is a feature</p></div>
          <div className="code-card"><div className="window-dots"><i/><i/><i/></div><div className="code-lines"><span className="muted">const</span> dreams = [<br/><span className="code-pink">&nbsp; "build cool stuff",</span><br/><span className="code-pink">&nbsp; "work with AI",</span><br/><span className="code-pink">&nbsp; "financial freedom",</span><br/><span className="code-pink">&nbsp; "a happy me"</span><br/>];</div></div>
          <div className="sticky">it works<br/>on my<br/>machine <span>♡</span></div>
          <div className="meme-card"><span className="meme-label">daily status report</span><p>me: one tiny change</p><p>also me at 2:47am:</p><strong>rewriting the entire thing</strong><span className="meme-face">🥲</span></div>
          <div className="flower">✿</div><div className="hand-note note-right">some girl...<br/>who debugs <span>♡</span></div>
        </div>
      </section>

      <div className="ticker"><div className="ticker-inner"><span>♡</span>{skills.map(s => <React.Fragment key={s}><b>{s}</b><i>·</i></React.Fragment>)}<span>♡</span><b>coffee</b><i>·</i><b>repeat</b><span>♡</span></div></div>

      <section className="skills-section wrap" id="skills">
        <div className="section-head"><div><p className="eyebrow"><span className="eyebrow-line"/> MY CURRENT TOOLKIT</p><h2>skills, <em>not just vibes.</em></h2></div><span className="skills-note">still learning. always building. ♡</span></div>
        <div className="skills-board">
          <article className="skill-paper skill-pink"><span className="paper-pin">✦</span><p className="skill-kicker">01 / pretty pixels</p><h3>Frontend</h3><div className="skill-pills"><span>React</span><span>JavaScript</span><span>TypeScript</span><span>HTML & CSS</span><span>Tailwind CSS</span></div></article>
          <article className="skill-paper skill-cream"><span className="paper-pin">♡</span><p className="skill-kicker">02 / under the hood</p><h3>Backend</h3><div className="skill-pills"><span>Node.js</span><span>Express</span><span>REST APIs</span><span>MongoDB</span><span>SQL</span><span>FastAPI</span></div></article>
          <article className="skill-paper skill-sage"><span className="paper-pin">✿</span><p className="skill-kicker">03 / brainyy</p><h3>AI and ML</h3><div className="skill-pills"><span>Python</span><span>GenAI</span><span>LLM APIs</span><span>Machine Learning</span><span>scikit-learn</span><span>NLP and Computer Vision</span></div></article>
          <article className="skill-paper skill-lilac"><span className="paper-pin">⌘</span><p className="skill-kicker">04 / WORKFLOW</p><h3>Devops tools</h3><div className="skill-pills"><span>Git & GitHub</span><span>Figma</span><span>Docker basics</span><span>AWS</span><span>Debugging</span></div></article>
        </div>
        <p className="skills-footnote">Actively learning by building projects ✦</p>
      </section>

      <section className="work wrap" id="work">
        <div className="section-head"><div><p className="eyebrow"><span className="eyebrow-line"/> SELECTED SIDE QUESTS</p><h2>things i made <em>(and survived)</em></h2></div><a className="text-link" href="https://github.com/sush123-mita" target="_blank" rel="noreferrer">all my code <ArrowUpRight size={16}/></a></div>
        <div className="project-grid">{projects.map((p, i) => <article className={`project-card ${p.color}`} key={p.name}>
          <a href={p.link} target="_blank" rel="noreferrer" className="project-open" aria-label={`Open ${p.name}`}><ArrowUpRight size={18}/></a>
          <div className="project-art"><span className="art-index">0{i+1} / MINI PROJECT</span><div className="art-shape"><Code2 size={38} strokeWidth={1.3}/><span>{p.icon}</span></div><span className="art-caption">{i===0?'AI agents, but make it organised.':i===1?'a gentle check-in, not a diagnosis.':i===2?'resume → opportunities → hopefully hired.':'less scrolling, more summaries.'}</span></div>
          <div className="project-info"><p className="project-type">{p.type}</p><h3>{p.name}</h3><p className="project-desc">{p.desc}</p><div className="tags">{p.tech.map(t=><span key={t}>{t}</span>)}</div><a href={p.link} target="_blank" rel="noreferrer" className="card-link">peek at the project <ArrowRight size={15}/></a></div>
        </article>)}</div>
      </section>

      <section className="experience wrap" id="experience">
        <div className="section-head"><div><p className="eyebrow"><span className="eyebrow-line"/> WHERE I’VE BEEN BUILDING</p><h2>experience <em>(real-world side quests)</em></h2></div><BriefcaseBusiness size={25} strokeWidth={1.4}/></div>
        <div className="experience-list">{experiences.map((e, i) => <article className="experience-card" key={e.company}><div className="experience-number">0{i+1}</div><div className="experience-main"><div className="experience-title-row"><div><h3>{e.role}</h3><p className="experience-company">{e.company}</p></div><span className="experience-date">{e.date}</span></div><p className="experience-detail">{e.detail}</p><div className="tags">{e.tags.map(t => <span key={t}>{t}</span>)}</div></div></article>)}</div>
      </section>

      <section className="achievements wrap" id="achievements">
        <div className="section-head"><div><p className="eyebrow"><span className="eyebrow-line"/> LITTLE WINS, BIG MOTIVATION</p><h2>Little Achivements <em>(certifications)</em></h2></div><Trophy size={25} strokeWidth={1.4}/></div>
        <div className="achievement-grid">{achievements.map((a, i) => <article className="achievement-card" key={a.title}><span className="achievement-icon">{a.icon}</span><p>0{i+1} / MILESTONE</p><h3>{a.title}</h3><strong>{a.detail}</strong>{i===3 && <a href="https://leetcode.com/u/Exception_indeed/" target="_blank" rel="noreferrer">View profile <ExternalLink size={13}/></a>}</article>)}</div>
        <a className="leetcode-link" href="https://leetcode.com/u/Exception_indeed/" target="_blank" rel="noreferrer"><span><b>LeetCode contest rating</b><small>{leetcodeLoading ? 'Checking live stats…' : leetcodeRating === 'Check live profile' ? 'Live rating is available on my profile.' : 'Latest public contest rating · updates from LeetCode stats'}</small></span><span className="leetcode-action">{leetcodeRating === 'Check live profile' ? 'Check rating' : leetcodeRating} <ArrowUpRight size={16}/></span></a>
      </section>

      <section className="about wrap" id="about"><div className="about-card"><div className="about-stamp">A LITTLE<br/>ABOUT ME <Heart size={19}/></div><div className="about-text"><p className="eyebrow">THE PERSON BEHIND THE COMMIT MESSAGES</p><h2>curious mind,<br/><em>tabs everywhere.</em></h2><p>CSE student focused on full-stack development and AI. I learn by building useful things, breaking them, and fixing them again.</p><div className="about-chips"><span>currently learning AI</span><span>powered by curiosity</span><span>emotionally attached to side projects</span></div></div><div className="about-doodle">✳<br/><span>ship it<br/>then snack</span><br/>♡</div></div></section>

      <section className="meme-zone wrap" id="meme-break">
        <div className="section-head"><div><p className="eyebrow"><span className="eyebrow-line"/> A LITTLE INTERNET CULTURE</p><h2>memes that live <em>rent-free.</em></h2></div><span className="skills-note">the classics, on loop ♡</span></div>
        <div className="meme-gif-grid">
          {memeGifs.map((meme, i) => <article className="meme-gif-card" key={meme.name}><div className="meme-gif-frame"><img src={meme.src} alt={meme.alt} loading="lazy"/></div><p>{meme.name}</p><h3>{['me fixing one tiny bug','when the code works','my browser with 37 tabs open','when the build passes'][i]} <em>{['at 2 AM','but I don’t know why','and I’m still opening more','first try'][i]}</em></h3></article>)}
        </div>
      </section>

      <section className="contact wrap" id="contact"><div className="contact-inner"><div><p className="eyebrow">LET’S CONNECT</p><h2>have a nice project?<br/><em>let's make it happen.</em></h2><p className="contact-sub">Open to developer opportunities, collaborations, and freelance projects. Pick your favourite way to reach me.</p></div><span className="contact-heart">✦</span></div><div className="contact-links"><a href="mailto:sushmitasingh2194@gmail.com" className="contact-link-card"><Mail/><span><small>DROP ME AN EMAIL</small><strong>sushmitasingh2194@gmail.com</strong></span><ArrowUpRight className="contact-arrow"/></a><a href="https://github.com/sush123-mita" target="_blank" rel="noreferrer" className="contact-link-card"><Github/><span><small>CODE & PROJECTS</small><strong>github.com/sush123-mita</strong></span><ArrowUpRight className="contact-arrow"/></a><a href="https://www.linkedin.com/in/sushmita-singh-542947295/" target="_blank" rel="noreferrer" className="contact-link-card"><Linkedin/><span><small>PROFESSIONAL HELLO</small><strong>Connect on LinkedIn</strong></span><ArrowUpRight className="contact-arrow"/></a><a href="https://www.instagram.com/exception_indeedsush/" target="_blank" rel="noreferrer" className="contact-link-card"><Instagram/><span><small>MEMES & LITTLE UPDATES</small><strong>@exception_indeedsush</strong></span><ArrowUpRight className="contact-arrow"/></a></div></section>
    </main>
    <footer className="footer wrap"><a className="wordmark small" href="#home">♡ sushmita<span className="pink">.exe</span></a><span>made with curiosity & an unreasonable number of tabs.</span><div className="socials"><a href="https://github.com/sush123-mita" aria-label="GitHub" target="_blank" rel="noreferrer"><Github size={17}/></a><a href="https://www.linkedin.com/in/sushmita-singh-542947295/" aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={17}/></a><a href="mailto:sushmitasingh2194@gmail.com" aria-label="Email"><Mail size={17}/></a><a href="https://www.instagram.com/exception_indeedsush/" aria-label="Instagram" target="_blank" rel="noreferrer"><Instagram size={17}/></a></div></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
