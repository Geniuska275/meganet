function HomePage({ setPage, openBooking }) {
  return (
    <div className="vd-fade">
      <PageHero src="https://www.nairaland.com/attachments/8298792_img20181130wa0024_jpegfcb0806aefb31292076f356d42f7f61a" alt="Green farmland under an open sky" height="52vh" minHeight={320} />
      <section className="vd-texture" style={{ marginTop: "-3rem" }}>
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="vd-hero-eyebrow text-xs uppercase tracking-[0.2em] vd-text-green font-semibold mb-4">
              Mega Services
            </p>
            <h1 className="vd-hero-title vd-display text-4xl md:text-5xl font-semibold leading-tight vd-text-green-dark">
              Welcome to Mega Integrated Works and Services
            </h1>
            <p className="vd-hero-body mt-6 text-base leading-relaxed max-w-md opacity-80">
             At Mega Integrated Works and Services, we offer a comprehensive suite of digital and administrative solutions, ensuring fast, reliable, and professional support for all your needs.
            </p>
            <div className="vd-hero-cta mt-8 flex flex-wrap gap-4">
              <button onClick={() => setPage("Services")} className="vd-btn-primary px-6 py-3 rounded-full text-sm font-semibold">
                See our services
              </button>
              <button onClick={() => setPage("Contact")} className="vd-btn-outline px-6 py-3 rounded-full text-sm font-semibold">
                Talk to us
              </button>
            </div>
          </div>
          <div className="max-w-xs mx-auto">
            <VineGraphic />
          </div>
        </div>
      </section>

      <section className="vd-bg-green-dark">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 vd-text-cream">
          <Stat number={120} label="Farms advised" suffix="+" />
          <Stat number={18} label="States covered" />
          <Stat number={9} label="Years in practice" suffix=" yrs" />
          <Stat number={4} label="Grants secured (₦M)" suffix=".2M" prefix="₦" />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <Reveal>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest vd-text-gold font-semibold mb-2">What we do</p>
              <h2 className="vd-display text-3xl font-semibold vd-text-green-dark">Four ways we work with you</h2>
            </div>
            <button onClick={() => setPage("Services")} className="vd-link-underline text-sm font-semibold vd-text-green">
              View all services
            </button>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.slice(0, 4).map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <div
                onClick={() => openBooking(s)}
                className="vd-card p-6 rounded-2xl bg-white/60 border vd-border-green/10 h-full"
                style={{ borderWidth: 1, borderColor: "#00751822" }}
              >
                <div className="vd-dot w-10 h-10 rounded-full vd-bg-gold mb-4" />
                <p className="font-semibold vd-text-green-dark mb-2">{s.title}</p>
                <p className="text-sm opacity-75 leading-relaxed mb-3">{s.desc}</p>
                <p className="text-xs font-semibold vd-text-green">Book — {naira(s.price)} →</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="vd-bg-green vd-text-cream">
        <Reveal>
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <p className="vd-display text-2xl md:text-3xl leading-relaxed">
              "We don't advise from an office in the city. We walk the plots, meet the
              cooperatives, and build plans that survive contact with the rain."
            </p>
            <p className="mt-6 text-sm uppercase tracking-widest vd-text-gold">Founding principle, Verdant &amp; Co.</p>
          </div>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <Reveal>
          <h2 className="vd-display text-3xl font-semibold vd-text-green-dark mb-4">
            Ready to grow something that lasts?
          </h2>
          <p className="opacity-75 max-w-lg mx-auto mb-8">
            Tell us where you are today. We'll tell you, honestly, what it takes to get where you want to be.
          </p>
          <button onClick={() => setPage("Contact")} className="vd-btn-primary px-8 py-3 rounded-full text-sm font-semibold">
            Start a conversation
          </button>
        </Reveal>
      </section>
    </div>
  );
}