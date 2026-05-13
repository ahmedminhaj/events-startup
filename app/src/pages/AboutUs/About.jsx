import style from './About.module.css';

const VALUES = [
  { icon: '🌍', title: 'Community First',  body: 'Events bring people together. We build tech that amplifies human connection.' },
  { icon: '⚡', title: 'Speed & Simplicity', body: 'Finding and booking an event should take seconds, not minutes.' },
  { icon: '🔒', title: 'Trusted & Secure', body: 'Every transaction is protected. Your data stays yours.' },
  { icon: '✨', title: 'Delightful Design', body: 'Beautiful products inspire confidence. We obsess over every pixel.' },
];

const About = () => {
  return (
    <div className={`{style.aboutPage} animateFadeUp`}>
      {/* Hero */}
      <section className={`${style.aboutHero} section`}>
        <div className={style.aboutHeroInner}>
          <span className="badge badgeBrand" >Our story</span>
          <h1 className="sectionTitle mtSm">
            We believe great events deserve <span className="textGradient">great software.</span>
          </h1>
          <p className={style.aboutHeroSub}>
            Ticker was founded in 2023 by a team of event-goers turned engineers who were tired of
            clunky ticket platforms. We set out to build something beautiful, fast, and human.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className={`${style.aboutValues} section`}>
        <div className="sectionHeader">
          <h2 className="sectionTitle">What we stand for</h2>
        </div>
        <div className={style.aboutValuesGrid}>
          {VALUES.map(({ icon, title, body }) => (
            <div key={title} className={`card ${style.aboutValuesCard}`}>
              <div className={style.aboutValuesIcon}>{icon}</div>
              <h3 className={style.aboutValuesTitle}>{title}</h3>
              <p className={style.aboutValuesBody}>{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;