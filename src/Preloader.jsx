import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }) {
  const rootRef = useRef(null)
  const boomRef = useRef(null)
  const stickRef = useRef(null)
  const bucketRef = useRef(null)
  const dirtRef = useRef(null)
  const progressRef = useRef(null)
  const counterRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Initial state — arm raised
      gsap.set(boomRef.current, { transformOrigin: '30px 20px', rotation: -20 })
      gsap.set(stickRef.current, { transformOrigin: '0px 0px', rotation: 15 })
      gsap.set(bucketRef.current, { transformOrigin: '0px 0px', rotation: -30 })
      gsap.set(dirtRef.current, { scaleX: 0, transformOrigin: 'left center', opacity: 0 })

      // Dig cycle 1
      tl.to(boomRef.current, { rotation: 10, duration: 0.7, ease: 'power2.inOut' })
        .to(stickRef.current, { rotation: 40, duration: 0.5, ease: 'power2.in' }, '-=0.3')
        .to(bucketRef.current, { rotation: 20, duration: 0.4, ease: 'power2.in' }, '-=0.2')

      // Scoop
        .to(bucketRef.current, { rotation: -40, duration: 0.35, ease: 'power3.out' })
        .to(stickRef.current, { rotation: -10, duration: 0.5, ease: 'power2.out' }, '-=0.2')
        .to(boomRef.current, { rotation: -25, duration: 0.5, ease: 'power2.out' }, '-=0.3')

      // Dirt appears
        .to(dirtRef.current, { scaleX: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }, '-=0.1')

      // Dump
        .to(bucketRef.current, { rotation: 35, duration: 0.3, ease: 'power1.in' })
        .to(dirtRef.current, { x: 14, opacity: 0, duration: 0.4, ease: 'power2.in' }, '-=0.15')

      // Reset for dig 2
        .to(boomRef.current, { rotation: -20, duration: 0.4, ease: 'power2.inOut' })
        .to(stickRef.current, { rotation: 15, duration: 0.3, ease: 'power2.inOut' }, '-=0.2')
        .to(bucketRef.current, { rotation: -30, duration: 0.3, ease: 'power2.inOut' }, '-=0.2')
        .set(dirtRef.current, { x: 0 })

      // Dig cycle 2 — faster
        .to(boomRef.current, { rotation: 12, duration: 0.55, ease: 'power2.inOut' })
        .to(stickRef.current, { rotation: 42, duration: 0.4, ease: 'power2.in' }, '-=0.25')
        .to(bucketRef.current, { rotation: 22, duration: 0.3, ease: 'power2.in' }, '-=0.15')
        .to(bucketRef.current, { rotation: -40, duration: 0.3, ease: 'power3.out' })
        .to(stickRef.current, { rotation: -10, duration: 0.4, ease: 'power2.out' }, '-=0.15')
        .to(boomRef.current, { rotation: -25, duration: 0.4, ease: 'power2.out' }, '-=0.25')
        .to(dirtRef.current, { scaleX: 1, opacity: 1, duration: 0.25 }, '-=0.1')
        .to(bucketRef.current, { rotation: 35, duration: 0.25 })
        .to(dirtRef.current, { x: 14, opacity: 0, duration: 0.35 }, '-=0.1')

      // Progress bar
      gsap.to(progressRef.current, {
        scaleX: 1,
        duration: tl.totalDuration() * 0.85,
        ease: 'power1.inOut',
        transformOrigin: 'left center',
      })

      // Counter
      gsap.to({ val: 0 }, {
        val: 100,
        duration: tl.totalDuration() * 0.85,
        ease: 'power1.inOut',
        onUpdate: function () {
          if (counterRef.current)
            counterRef.current.textContent = Math.round(this.targets()[0].val) + '%'
        },
      })

      // Exit
      tl.to(logoRef.current, { y: -20, opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=0.1')
        .to(rootRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete,
        }, '-=0.05')
    }, rootRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
      style={{ background: '#080C14' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(232,122,26,0.07) 0%, transparent 70%)'
      }} />

      {/* Ground line */}
      <div className="absolute bottom-[30%] left-0 right-0 h-px bg-franil-border opacity-30" />

      <div ref={logoRef} className="flex flex-col items-center gap-10">
        {/* SVG Excavator */}
        <svg
          viewBox="0 0 260 160"
          width="320"
          height="200"
          className="overflow-visible"
          style={{ filter: 'drop-shadow(0 0 30px rgba(232,122,26,0.15))' }}
        >
          {/* === TRACKS === */}
          <rect x="20" y="110" width="140" height="18" rx="9" fill="#1A2035" />
          <rect x="25" y="113" width="130" height="12" rx="6" fill="#0F1420" />
          {/* track detail */}
          {[35, 55, 75, 95, 115, 135].map(x => (
            <rect key={x} x={x} y="114" width="12" height="10" rx="2" fill="#1E2A40" />
          ))}
          {/* Drive wheels */}
          <circle cx="30" cy="118" r="10" fill="#1A2035" stroke="#2A3550" strokeWidth="1.5" />
          <circle cx="30" cy="118" r="5" fill="#0F1420" />
          <circle cx="150" cy="118" r="10" fill="#1A2035" stroke="#2A3550" strokeWidth="1.5" />
          <circle cx="150" cy="118" r="5" fill="#0F1420" />

          {/* === BODY === */}
          <rect x="35" y="78" width="110" height="36" rx="5" fill="#1A2035" />
          <rect x="38" y="81" width="104" height="30" rx="4" fill="#0F1420" />

          {/* === CABIN === */}
          <rect x="80" y="54" width="60" height="30" rx="4" fill="#1A2035" />
          <rect x="83" y="57" width="54" height="24" rx="3" fill="#0F1420" />
          {/* cabin windows */}
          <rect x="86" y="59" width="22" height="16" rx="2" fill="#0D1828" stroke="#E87A1A" strokeWidth="0.5" opacity="0.8" />
          <rect x="112" y="59" width="20" height="16" rx="2" fill="#0D1828" stroke="#2A3550" strokeWidth="0.5" opacity="0.5" />
          {/* window glare */}
          <line x1="88" y1="61" x2="93" y2="61" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

          {/* === COUNTERWEIGHT === */}
          <rect x="135" y="80" width="18" height="22" rx="3" fill="#141C2E" stroke="#1A2035" strokeWidth="1" />

          {/* === ACCENT STRIPE === */}
          <rect x="35" y="92" width="110" height="3" rx="1.5" fill="#E87A1A" opacity="0.6" />

          {/* === LIGHTS === */}
          <circle cx="42" cy="84" r="4" fill="#E87A1A" opacity="0.9" />
          <circle cx="42" cy="84" r="7" fill="#E87A1A" opacity="0.1" />

          {/* === ARM GROUP (boom pivot at body top-left) === */}
          <g ref={boomRef} style={{ transformOrigin: '78px 78px' }}>
            {/* Boom */}
            <line x1="78" y1="78" x2="108" y2="30" stroke="#2A3550" strokeWidth="8" strokeLinecap="round" />
            <line x1="78" y1="78" x2="108" y2="30" stroke="#1A2035" strokeWidth="5" strokeLinecap="round" />

            {/* Hydraulic cylinder (boom) */}
            <line x1="82" y1="74" x2="100" y2="50" stroke="#E87A1A" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />

            {/* Stick pivot at boom tip */}
            <g ref={stickRef} style={{ transformOrigin: '108px 30px' }}>
              <line x1="108" y1="30" x2="128" y2="68" stroke="#2A3550" strokeWidth="7" strokeLinecap="round" />
              <line x1="108" y1="30" x2="128" y2="68" stroke="#1A2035" strokeWidth="4" strokeLinecap="round" />

              {/* Hydraulic cylinder (stick) */}
              <line x1="110" y1="34" x2="122" y2="58" stroke="#E87A1A" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

              {/* Bucket pivot at stick tip */}
              <g ref={bucketRef} style={{ transformOrigin: '128px 68px' }}>
                {/* Bucket shape */}
                <path
                  d="M128 68 L138 80 L132 88 L118 88 L112 80 Z"
                  fill="#1A2035"
                  stroke="#2A3550"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                {/* Bucket teeth */}
                <line x1="116" y1="88" x2="113" y2="95" stroke="#E87A1A" strokeWidth="2" strokeLinecap="round" />
                <line x1="122" y1="88" x2="120" y2="96" stroke="#E87A1A" strokeWidth="2" strokeLinecap="round" />
                <line x1="128" y1="88" x2="127" y2="95" stroke="#E87A1A" strokeWidth="2" strokeLinecap="round" />

                {/* Dirt clump */}
                <g ref={dirtRef}>
                  <ellipse cx="122" cy="91" rx="8" ry="4" fill="#8B6914" opacity="0.9" />
                  <ellipse cx="118" cy="93" rx="4" ry="2.5" fill="#A07820" opacity="0.7" />
                  <ellipse cx="126" cy="92" rx="3" ry="2" fill="#7A5C10" opacity="0.8" />
                </g>

                {/* Bucket hydraulic */}
                <line x1="128" y1="68" x2="124" y2="80" stroke="#E87A1A" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
              </g>
            </g>
          </g>

          {/* Ground shadow */}
          <ellipse cx="90" cy="130" rx="80" ry="5" fill="rgba(0,0,0,0.4)" />
        </svg>

        {/* Brand */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-franil-border" />
            <span className="text-franil-accent text-xs font-bold tracking-[0.3em] uppercase">Franil</span>
            <div className="h-px w-12 bg-franil-border" />
          </div>
          <p className="text-franil-muted text-xs tracking-widest uppercase">Infraestructura subterránea</p>
        </div>

        {/* Progress bar */}
        <div className="w-56">
          <div className="flex justify-between items-center mb-2">
            <span className="text-franil-border text-xs font-mono">Cargando</span>
            <span ref={counterRef} className="text-franil-accent text-xs font-mono font-bold">0%</span>
          </div>
          <div className="h-px w-full bg-franil-border/40 overflow-hidden rounded-full">
            <div
              ref={progressRef}
              className="h-full bg-franil-accent rounded-full"
              style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
