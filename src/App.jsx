import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Menu, X, ArrowRight, ChevronRight,
  Wifi, Layers, Drill, Truck, Shield, Phone, Mail, MapPin
} from 'lucide-react'
import Preloader from './Preloader'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = ['Servicios', 'Proyectos', 'Tecnología', 'Contacto']

const SERVICES = [
  {
    icon: Wifi,
    title: 'Tendido de Fibra Óptica',
    desc: 'Instalación de redes de alta velocidad para telecomunicaciones residenciales, comerciales e industriales.',
    img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=80',
    span: 'col-span-12 md:col-span-7 row-span-2',
    big: true,
  },
  {
    icon: Drill,
    title: 'Perforación Horizontal',
    desc: 'Cruzamos calles, rutas y obstáculos sin excavación superficial.',
    img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=700&q=80',
    span: 'col-span-12 md:col-span-5 row-span-1',
  },
  {
    icon: Layers,
    title: 'Instalación de Cañerías',
    desc: 'Todo tipo de ductos: agua, gas, electricidad y telecomunicaciones.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
    span: 'col-span-12 md:col-span-5 row-span-1',
  },
  {
    icon: Truck,
    title: 'Tuneleras de Gran Escala',
    desc: 'Equipamiento de última generación para proyectos de infraestructura mayor.',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80',
    span: 'col-span-12 md:col-span-8 row-span-1',
  },
  {
    icon: Shield,
    title: 'Mantenimiento y Diagnóstico',
    desc: 'Monitoreo continuo y reparación de redes subterráneas.',
    img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80',
    span: 'col-span-12 md:col-span-4 row-span-1',
  },
]

const STATS = [
  { value: '14+', label: 'Años de experiencia' },
  { value: '340+', label: 'Proyectos completados' },
  { value: '1.800km', label: 'De tendido instalado' },
  { value: '97%', label: 'Satisfacción del cliente' },
]

const MARQUEE_ITEMS = [
  'Fibra Óptica', 'Perforación Horizontal', 'Tuneleras HDD', 'Cañerías HDPE',
  'Ductos Eléctricos', 'Infraestructura Subterránea', 'Uruguay', 'Fibra Óptica',
  'Perforación Horizontal', 'Tuneleras HDD', 'Cañerías HDPE', 'Ductos Eléctricos',
]

const PROJECTS = [
  {
    title: 'Red Metropolitana Montevideo',
    category: 'Fibra Óptica',
    year: '2024',
    km: '47km',
    img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80',
  },
  {
    title: 'Ducto Troncal Maldonado',
    category: 'Tuneladora',
    year: '2023',
    km: '12km',
    img: 'https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?w=1200&q=80',
  },
  {
    title: 'Infraestructura Punta del Este',
    category: 'Cañerías',
    year: '2023',
    km: '28km',
    img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80',
  },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
      <div className={`mx-auto max-w-6xl px-6 flex items-center justify-between rounded-2xl transition-all duration-500 ${scrolled ? 'glass-card py-3 mx-6' : 'py-0'}`}>
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
              <img src="/logo-franil.png" alt="Franil" className="w-full h-full object-contain" />
            </div>
          <span className="text-2xl text-franil-text tracking-widest" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>FRANIL</span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="px-4 py-2 text-sm font-medium text-franil-muted hover:text-franil-text rounded-xl transition-colors duration-200 hover:bg-white/5"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contacto"
            className="flex items-center gap-2 px-5 py-2.5 bg-franil-accent text-franil-dark font-semibold text-sm rounded-xl hover:bg-amber-400 transition-colors duration-200"
          >
            Cotizar proyecto
            <ArrowRight size={15} />
          </a>
        </div>

        <button
          className="md:hidden p-2 text-franil-muted hover:text-franil-text transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mx-4 mt-2 glass-card rounded-2xl p-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="px-4 py-3 text-sm font-medium text-franil-muted hover:text-franil-text rounded-xl hover:bg-white/5 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="#contacto"
            className="mt-2 flex items-center justify-center gap-2 px-5 py-3 bg-franil-accent text-franil-dark font-semibold text-sm rounded-xl"
            onClick={() => setOpen(false)}
          >
            Cotizar proyecto <ArrowRight size={15} />
          </a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(titleRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 })
        .fromTo(subtitleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.6')
        .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')

      gsap.fromTo(imgRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: 'power2.out', delay: 0.3 }
      )

      gsap.to(imgRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        }
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      <div
        ref={imgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80)',
          filter: 'grayscale(30%) contrast(110%) brightness(0.35)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-franil-dark/60 via-transparent to-franil-dark" />
      <div className="absolute inset-0 bg-radial-gradient" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(232,122,26,0.08) 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-28 pb-72 md:pb-40 text-center">
        <div ref={titleRef} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-franil-accent/30 bg-franil-accent/10 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-franil-accent animate-pulse" />
            <span className="text-franil-accent text-xs font-semibold tracking-widest uppercase">Uruguay · Desde 2001</span>
          </div>

          <h1 className="text-[clamp(2.5rem,6vw,6rem)] font-black leading-[1.05] md:leading-[0.95] tracking-[-0.03em] text-franil-text max-w-5xl mx-auto">
            Infraestructura que{' '}
            <span className="relative inline-block">
              <span className="text-accent-gradient">conecta</span>
            </span>
            {' '}el Uruguay
          </h1>
        </div>

        <p ref={subtitleRef} className="text-franil-muted text-[clamp(1rem,1.5vw,1.25rem)] font-light max-w-2xl mx-auto leading-relaxed mb-8">
          Tendido de fibra óptica, perforación horizontal y redes de cañerías subterráneas.
          Desde el primer kilómetro hasta los proyectos más complejos con tuneleras de última generación.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
          <a
            href="#servicios"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-franil-accent text-franil-dark font-bold text-base rounded-2xl hover:bg-amber-400 transition-all duration-200 active:scale-[0.98]"
          >
            <span className="leading-none">Ver servicios</span>
            <ArrowRight size={18} className="shrink-0" />
          </a>
          <a
            href="#proyectos"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 glass-card text-franil-text font-semibold text-base rounded-2xl hover:border-franil-accent/30 transition-all duration-200 active:scale-[0.98]"
          >
            <span className="leading-none">Proyectos realizados</span>
            <ChevronRight size={18} className="shrink-0 text-franil-muted" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <div className="max-w-6xl mx-auto px-6 pb-12 grid grid-cols-2 md:grid-cols-4 gap-4 pointer-events-auto">
          {STATS.map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-5 text-center">
              <div className="text-[clamp(1.6rem,3vw,2.2rem)] font-black text-accent-gradient leading-none mb-1">{s.value}</div>
              <div className="text-franil-muted text-xs font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  return (
    <div className="py-8 overflow-hidden border-y border-franil-border bg-franil-surface/40">
      <div className="flex gap-10 animate-marquee whitespace-nowrap">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-4 shrink-0">
            <span className="text-franil-muted text-sm font-medium tracking-widest uppercase">{item}</span>
            <span className="w-1 h-1 rounded-full bg-franil-accent shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}

function Services() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.08,
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="servicios" ref={sectionRef} className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-franil-accent text-sm font-semibold tracking-widest uppercase mb-4">Lo que hacemos</p>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.05] tracking-[-0.025em] text-franil-text max-w-5xl whitespace-nowrap">
            Soluciones completas bajo tierra
          </h2>
        </div>

        <div className="grid grid-cols-12 grid-rows-auto gap-4 grid-flow-dense">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <div
                key={s.title}
                ref={el => cardsRef.current[i] = el}
                className={`${s.span} glass-card card-hover rounded-3xl overflow-hidden group relative min-h-[280px]`}
                onMouseEnter={e => {
                  const bg = e.currentTarget.querySelector('[data-card-bg]')
                  if (bg) bg.style.filter = 'grayscale(0%) contrast(110%) brightness(0.9)'
                }}
                onMouseLeave={e => {
                  const bg = e.currentTarget.querySelector('[data-card-bg]')
                  if (bg) bg.style.filter = 'grayscale(20%) contrast(110%) brightness(0.5)'
                }}
              >
                <div
                  data-card-bg=""
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${s.img})`,
                    filter: 'grayscale(20%) contrast(110%) brightness(0.5)',
                    transition: 'transform 0.7s ease-out, filter 0.5s ease-out',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-franil-dark/90 via-franil-dark/30 to-transparent transition-opacity duration-500 group-hover:opacity-30" />
                <div className="relative z-10 h-full flex flex-col justify-end p-7">
                  <div className="mb-4 inline-flex w-10 h-10 rounded-xl bg-franil-accent/20 border border-franil-accent/30 items-center justify-center">
                    <Icon size={18} className="text-franil-accent" />
                  </div>
                  <h3 className={`font-bold text-franil-text leading-tight mb-2 ${s.big ? 'text-3xl md:text-4xl' : 'text-xl'}`}>{s.title}</h3>
                  <p className="text-franil-muted text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const MACHINES = [
  {
    name: 'maquina1',
    category: 'Flota Franil',
    img: '/imagenes-maquinas/maquina1.jpg',
    desc: {
      descripcion: 'Descripción de la máquina 1.',
      usos: ['Uso 1', 'Uso 2', 'Uso 3'],
      horas: '—',
    },
  },
  {
    name: 'maquina2',
    category: 'Flota Franil',
    img: '/imagenes-maquinas/maquina2.jpg',
    desc: {
      descripcion: 'Descripción de la máquina 2.',
      usos: ['Uso 1', 'Uso 2', 'Uso 3'],
      horas: '—',
    },
  },
]

function MachineModal({ machine, onClose }) {
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(5,8,16,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg glass-card rounded-3xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div
          className="h-52 bg-cover bg-center"
          style={{
            backgroundImage: `url(${machine.img})`,
            filter: 'brightness(0.6)',
          }}
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-franil-dark/80 border border-franil-border flex items-center justify-center text-franil-muted hover:text-franil-text transition-colors"
        >
          <X size={14} />
        </button>

        <div className="p-7 flex flex-col gap-5">
          <div>
            <span className="text-franil-accent text-xs font-bold tracking-widest uppercase">{machine.category}</span>
            <h3 className="text-franil-text font-black text-2xl mt-1 leading-tight">{machine.name}</h3>
          </div>

          <p className="text-franil-muted text-sm leading-relaxed">{machine.desc.descripcion}</p>

          <div>
            <p className="text-franil-text text-xs font-bold uppercase tracking-widest mb-3">Utilidades</p>
            <ul className="flex flex-col gap-2">
              {machine.desc.usos.map((u, i) => (
                <li key={i} className="flex items-center gap-2.5 text-franil-muted text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-franil-accent shrink-0" />
                  {u}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-franil-border">
            <div>
              <p className="text-franil-muted text-xs uppercase tracking-wider">Horas de uso</p>
              <p className="text-franil-text font-bold text-lg mt-0.5">{machine.desc.horas}</p>
            </div>
            <button
              onClick={() => {
                const ta = document.getElementById('mensaje')
                if (ta) ta.value = `Consulta por disponibilidad de: ${machine.name}`
                onClose()
                setTimeout(() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }), 200)
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-franil-accent text-franil-dark font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors"
            >
              <span className="leading-none">Ver disponibilidad</span>
              <ArrowRight size={14} className="shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Machines() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const [selectedMachine, setSelectedMachine] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8,
            ease: 'power3.out',
            delay: (i % 3) * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="maquinas" ref={sectionRef} className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-franil-accent text-sm font-semibold tracking-widest uppercase mb-4">Flota propia</p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.05] tracking-[-0.025em] text-franil-text max-w-xl">
              Nuestras máquinas
            </h2>
          </div>
          <p className="text-franil-muted text-base max-w-sm leading-relaxed">
            Equipamiento de última generación para proyectos de cualquier escala y complejidad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MACHINES.map((m, i) => (
            <div key={m.name} ref={el => cardsRef.current[i] = el} className="flex flex-col gap-3">
              <div
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] glass-card cursor-default"
                onMouseEnter={e => {
                  const bg = e.currentTarget.querySelector('[data-card-bg]')
                  if (bg) bg.style.filter = 'grayscale(0%) contrast(110%) brightness(0.9)'
                }}
                onMouseLeave={e => {
                  const bg = e.currentTarget.querySelector('[data-card-bg]')
                  if (bg) bg.style.filter = 'grayscale(25%) contrast(110%) brightness(0.45)'
                }}
              >
                <div
                  data-card-bg=""
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${m.img})`,
                    filter: 'grayscale(25%) contrast(110%) brightness(0.45)',
                    transition: 'transform 0.7s ease-out, filter 0.5s ease-out',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-franil-dark/95 via-franil-dark/20 to-transparent transition-opacity duration-500 group-hover:opacity-30" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-franil-accent/20 border border-franil-accent/30 text-franil-accent backdrop-blur-sm">
                    {m.category}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-franil-text font-bold text-lg leading-snug">{m.name}</h3>
                  <div className="mt-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <div className="w-1 h-1 rounded-full bg-franil-accent" />
                    <span className="text-franil-muted text-xs">Flota Franil</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedMachine(m)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-franil-border bg-franil-surface/60 text-franil-muted text-sm font-semibold hover:border-franil-accent/50 hover:text-franil-accent hover:bg-franil-accent/5 transition-all duration-200 active:scale-[0.98]"
                >
                  <span className="leading-none">Descripción</span>
                </button>
                <button
                  onClick={() => {
                    const ta = document.getElementById('mensaje')
                    if (ta) ta.value = `Consulta por disponibilidad de: ${m.name}`
                    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-franil-border bg-franil-surface/60 text-franil-muted text-sm font-semibold hover:border-franil-accent/50 hover:text-franil-accent hover:bg-franil-accent/5 transition-all duration-200 active:scale-[0.98]"
                >
                  <span className="leading-none">Disponibilidad</span>
                  <ChevronRight size={15} className="shrink-0" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedMachine && <MachineModal machine={selectedMachine} onClose={() => setSelectedMachine(null)} />}
    </section>
  )
}

function Projects() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      PROJECTS.forEach((_, i) => {
        const imgEl = document.querySelector(`[data-project-img="${i}"]`)
        if (!imgEl) return
        gsap.fromTo(imgEl,
          { scale: 0.85, opacity: 0.3 },
          {
            scale: 1, opacity: 1, duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: imgEl,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      })

      const words = document.querySelectorAll('.scrub-word')
      if (words.length) {
        gsap.to(words, {
          opacity: 1,
          stagger: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: '.scrub-text',
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: 1.5,
          }
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const manifesto = 'Cada proyecto que entregamos transforma la manera en que Uruguay se conecta, construye y crece hacia el futuro.'

  return (
    <section id="proyectos" ref={sectionRef} className="py-20 md:py-28 px-6 bg-franil-surface/20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-franil-accent text-sm font-semibold tracking-widest uppercase mb-4">Proyectos destacados</p>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.05] tracking-[-0.025em] text-franil-text max-w-xl">
            Nuestros proyectos destacados
          </h2>
        </div>

        <div className="space-y-4">
          {PROJECTS.map((p, i) => (
            <div
              key={p.title}
              className="rounded-3xl glass-card border border-franil-border"
            >
              <div className="flex items-center justify-between p-6 md:p-8">
                <div className="flex items-center gap-5">
                  <span className="text-franil-border font-mono text-sm">0{i + 1}</span>
                  <div>
                    <h3 className="text-franil-text font-bold text-xl md:text-2xl tracking-tight">{p.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-franil-accent text-xs font-semibold tracking-widest uppercase">{p.category}</span>
                      <span className="w-1 h-1 rounded-full bg-franil-border" />
                      <span className="text-franil-muted text-xs">{p.km} instalados</span>
                      <span className="w-1 h-1 rounded-full bg-franil-border" />
                      <span className="text-franil-muted text-xs">{p.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Technology() {
  const sectionRef = useRef(null)
  const [activeSlice, setActiveSlice] = useState(0)

  const slices = [
    {
      label: 'HDD',
      title: 'Perforación Direccional Horizontal',
      desc: 'Instalamos ductos bajo rutas, ríos y edificaciones sin interrumpir la superficie. Nuestras máquinas HDD operan con precisión milimétrica.',
      img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80',
    },
    {
      label: 'Microtúnel',
      title: 'Tuneleras de Microtúnel',
      desc: 'Para proyectos urbanos de gran escala, nuestras tuneleras avanzan metros por hora con control remoto total y mínima afectación.',
      img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900&q=80',
    },
    {
      label: 'HDPE',
      title: 'Cañerías HDPE y Ductos',
      desc: 'Instalación de polietileno de alta densidad para agua, gas y telecomunicaciones. Resistencia, flexibilidad y décadas de vida útil.',
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    },
    {
      label: 'Fibra',
      title: 'Redes de Fibra Óptica',
      desc: 'Diseño, tendido y certificación de redes FTTH, FTTB y backbone para operadores de telecomunicaciones.',
      img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=80',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tech-title',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="tecnología" ref={sectionRef} className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="tech-title mb-16">
          <p className="text-franil-accent text-sm font-semibold tracking-widest uppercase mb-4">Nuestra tecnología</p>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.05] tracking-[-0.025em] text-franil-text max-w-2xl">
            Equipamiento de vanguardia para cada desafío
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-1 h-auto md:h-[480px]">
          {slices.map((s, i) => (
            <div
              key={s.label}
              className={`accordion-slice glass-card rounded-3xl overflow-hidden cursor-pointer relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${activeSlice === i ? 'flex-[3]' : 'flex-1'} min-h-[80px] md:min-h-0`}
              onClick={() => setActiveSlice(i)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{
                  backgroundImage: `url(${s.img})`,
                  filter: activeSlice === i ? 'grayscale(10%) contrast(110%) brightness(0.5)' : 'grayscale(60%) brightness(0.25)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-franil-dark/90 via-franil-dark/40 to-transparent" />

              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <div className={`transition-all duration-500 ${activeSlice === i ? 'opacity-100' : 'opacity-60'}`}>
                  <span className="text-franil-accent text-xs font-bold tracking-widest uppercase block mb-2">{s.label}</span>
                  {activeSlice === i && (
                    <>
                      <h3 className="text-franil-text font-black text-xl md:text-2xl leading-tight mb-3 tracking-tight">{s.title}</h3>
                      <p className="text-franil-muted text-sm leading-relaxed max-w-xs">{s.desc}</p>
                    </>
                  )}
                  {activeSlice !== i && (
                    <p className="text-franil-muted text-sm hidden md:block truncate">{s.title}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const sectionRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | ok | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = {
      nombre: form.nombre.value,
      empresa: form.empresa.value,
      email: form.email.value,
      mensaje: form.mensaje.value,
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('ok')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-card',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contacto" ref={sectionRef} className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="contact-card glass-card rounded-3xl overflow-hidden relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80)',
              filter: 'grayscale(50%) brightness(0.15) contrast(120%)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-franil-accent/10 via-transparent to-franil-cyan/5" />

          <div className="relative z-10 grid md:grid-cols-2 gap-12 p-10 md:p-16">
            <div>
              <p className="text-franil-accent text-sm font-semibold tracking-widest uppercase mb-6">Hablemos</p>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.05] tracking-[-0.025em] text-franil-text mb-6">
                Cada proyecto comienza con una conversación
              </h2>
              <p className="text-franil-muted leading-relaxed mb-10">
                Desde tendidos de fibra óptica de largo alcance hasta perforaciones complejas en entornos urbanos.
                El equipo de Franil está listo para analizar tu proyecto.
              </p>

              <div className="space-y-4">
                {[
                  { Icon: Phone, text: '099 106 464 — Fabio Conti', label: 'Director' },
                  { Icon: Mail, text: 'fconti@franil.com.uy', label: 'Email' },
                  { Icon: MapPin, text: 'San Bautista, Canelones, Uruguay', label: 'Sede central' },
                ].map(({ Icon, text, label }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-franil-accent/15 border border-franil-accent/20 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-franil-accent" />
                    </div>
                    <div>
                      <p className="text-franil-muted text-xs uppercase tracking-wider mb-0.5">{label}</p>
                      <p className="text-franil-text text-sm font-medium">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {[
                { id: 'nombre', label: 'Nombre completo', type: 'text', placeholder: 'Ej: Carlos Rodríguez' },
                { id: 'empresa', label: 'Empresa', type: 'text', placeholder: 'Tu organización' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'correo@empresa.com' },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-franil-muted text-xs uppercase tracking-wider mb-2">{label}</label>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    placeholder={placeholder}
                    required={id !== 'empresa'}
                    className="w-full bg-white/5 border border-franil-border rounded-xl px-4 py-3 text-franil-text text-sm placeholder-franil-border focus:outline-none focus:border-franil-accent/50 transition-colors"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="mensaje" className="block text-franil-muted text-xs uppercase tracking-wider mb-2">Descripción del proyecto</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  required
                  placeholder="Contanos sobre tu proyecto, ubicación y alcance estimado..."
                  className="w-full bg-white/5 border border-franil-border rounded-xl px-4 py-3 text-franil-text text-sm placeholder-franil-border focus:outline-none focus:border-franil-accent/50 transition-colors resize-none"
                />
              </div>

              {status === 'ok' && (
                <p className="text-green-400 text-sm text-center py-2">¡Mensaje enviado! Te contactamos pronto.</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm text-center py-2">Hubo un error, intentá de nuevo.</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex items-center justify-center gap-2.5 px-8 py-4 bg-franil-accent text-franil-dark font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors duration-200 active:scale-[0.98] mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar consulta'}
                {status !== 'sending' && <ArrowRight size={16} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

const DESKTOP_FRAMES = 383
const MOBILE_FRAMES = 193

function VideoReel() {
  const wrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const framesRef = useRef([])
  const loadedRef = useRef(0)
  const [loadPct, setLoadPct] = useState(0)
  const [ready, setReady] = useState(false)

  // desktop = landscape video (hfps), mobile = portrait video
  const isDesktop = window.matchMedia('(min-width: 768px)').matches
  const frameFolder = isDesktop ? '/frames-desktop-hfps' : '/frames'
  const TOTAL_FRAMES = isDesktop ? DESKTOP_FRAMES : MOBILE_FRAMES

  // Preload all frames
  useEffect(() => {
    framesRef.current = new Array(TOTAL_FRAMES)
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = `${frameFolder}/frame_${String(i + 1).padStart(4, '0')}.jpg`
      img.onload = () => {
        framesRef.current[i] = img
        loadedRef.current++
        setLoadPct(Math.round(loadedRef.current / TOTAL_FRAMES * 100))
        if (loadedRef.current === TOTAL_FRAMES) setReady(true)
      }
    }
  }, [])

  // Canvas + scroll scrubbing — se activa cuando el canvas tiene dimensiones reales
  useEffect(() => {
    if (!ready) return
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrapper || !canvas) return

    const dpr = window.devicePixelRatio || 1
    const ctx = canvas.getContext('2d')
    let lastIdx = -1
    let raf = null

    const draw = (idx) => {
      if (idx === lastIdx) return
      lastIdx = idx
      const img = framesRef.current[idx]
      if (!img) return
      const W = canvas.width
      const H = canvas.height
      // contain fit: el video portrait se ve completo, centrado
      const scale = Math.min(W / img.width, H / img.height)
      const w = Math.round(img.width * scale)
      const h = Math.round(img.height * scale)
      ctx.fillStyle = '#050810'
      ctx.fillRect(0, 0, W, H)
      ctx.drawImage(img, Math.round((W - w) / 2), Math.round((H - h) / 2), w, h)
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        const rect = wrapper.getBoundingClientRect()
        const scrollRange = wrapper.offsetHeight - window.innerHeight
        const progress = Math.min(1, Math.max(0, -rect.top / scrollRange))
        draw(Math.round(progress * (TOTAL_FRAMES - 1)))
      })
    }

    // ResizeObserver garantiza que leemos las dimensiones reales post-paint
    const ro = new ResizeObserver(() => {
      const W = canvas.offsetWidth * dpr
      const H = canvas.offsetHeight * dpr
      if (W === 0 || H === 0) return
      canvas.width = W
      canvas.height = H
      lastIdx = -1
      onScroll()
    })
    ro.observe(canvas)

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ready])

  return (
    <div ref={wrapperRef} style={{ height: isDesktop ? '200vh' : '130vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#050810' }}>

        {!ready && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
            <span className="text-franil-muted text-xs tracking-widest uppercase">Cargando</span>
            <div style={{ width: 180, height: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 1, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${loadPct}%`, background: '#E87A1A', transition: 'width 0.1s' }} />
            </div>
            <span className="text-franil-accent text-xs font-mono">{loadPct}%</span>
          </div>
        )}

        {/* position absolute + inset 0 → el canvas mide exactamente lo mismo que el sticky container */}
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: ready ? 'block' : 'none' }}
        />

        {!isDesktop && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%', background: 'linear-gradient(to bottom, transparent 0%, #050810 70%)', pointerEvents: 'none', zIndex: 5 }} />}

      </div>
    </div>
  )
}

function SobreNosotros() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal of each block
      gsap.fromTo('.sobre-block',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
          }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const values = [
    { title: 'Trayectoria', desc: 'Más de 14 años en el rubro de la construcción, volcados a obras de infraestructura y mantenimiento de telefonía y electricidad en todo el Uruguay.' },
    { title: 'Alcance nacional', desc: 'Proyectos ejecutados en Montevideo, Canelones, San José, Colonia y Soriano, tanto para ANTEL, UTE como para la Intendencia de Montevideo.' },
    { title: 'Sede', desc: 'Oficinas y obrador central en Calle B entre Pedro Marabotto y Justo Alvarez, San Bautista, Canelones.' },
  ]

  const timeline = [
    { year: '2007', event: 'Primeros contratos: obra civil y cambio de medidores para UTE (subcontrato Clauger).' },
    { year: '2009', event: 'Obra civil para FTTH de ANTEL Montevideo (subcontrato Unión Eléctrica).' },
    { year: '2010', event: 'Obra civil y montaje FTTH de ANTEL Canelones durante 4 años (Electro Sistemas).' },
    { year: '2014', event: 'FTTH ANTEL en Montevideo, Canelones y San José junto a 3W. Expansión a Colonia y Soriano con Oritecno hasta 2023.' },
    { year: '2021', event: 'Tendido para UTE y ANTEL con SIE. Tendido para UTE con Intendencia de Montevideo.' },
    { year: '2023', event: 'Consorcio Litoral Este. Tendido de alumbrado público — actividad vigente a la fecha.' },
  ]

  return (
    <section id="sobre-nosotros" ref={sectionRef} className="pt-0 pb-20 md:py-28 px-6 bg-franil-surface/20">
      <div className="max-w-6xl mx-auto">

        <div className="sobre-block mb-20 grid md:grid-cols-2 gap-12 items-end">
          <div>
            <p className="text-franil-accent text-sm font-semibold tracking-widest uppercase mb-5">Sobre nosotros</p>
            <h2 className="text-[clamp(2.2rem,4.5vw,4rem)] font-black leading-[1.02] tracking-[-0.03em] text-franil-text">
              Construimos la red que{' '}
              <span className="text-accent-gradient">Uruguay</span>{' '}
              necesita
            </h2>
          </div>
          <p className="text-franil-muted text-lg leading-relaxed">
            FRANIL S.R.L. es una empresa uruguaya con más de 14 años de experiencia en infraestructura
            de telecomunicaciones y electricidad. Desde San Bautista, Canelones, operamos en todo
            el país ejecutando obras para ANTEL, UTE e intendencias departamentales.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-20">
          {values.map((v) => (
            <div key={v.title} className="sobre-block glass-card card-hover rounded-3xl p-8">
              <div className="w-10 h-0.5 bg-franil-accent mb-6" />
              <h3 className="text-franil-text font-bold text-xl mb-4 tracking-tight">{v.title}</h3>
              <p className="text-franil-muted text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="sobre-block glass-card rounded-3xl p-8 md:p-12">
          <p className="text-franil-accent text-xs font-bold tracking-widest uppercase mb-8">Historial de proyectos</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {timeline.map((item) => (
              <div key={item.year} className="border-t border-franil-border pt-5">
                <p className="text-franil-accent font-black text-2xl mb-2">{item.year}</p>
                <p className="text-franil-muted text-sm leading-relaxed">{item.event}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

function MapaUruguay() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.mapa-text',
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      )
      gsap.fromTo('.mapa-video',
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="mapa-text flex flex-col gap-6">
          <p className="text-franil-accent text-sm font-semibold tracking-widest uppercase">Nuestra expansión</p>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-black leading-[1.05] tracking-[-0.025em] text-franil-text">
            De Montevideo<br />a todo el país
          </h2>
          <p className="text-franil-muted text-base leading-relaxed max-w-md">
            Comenzamos trabajando en distintos barrios de Montevideo, creciendo con cada proyecto. Con el tiempo, llevamos esa experiencia a todo el país, llegando tanto a grandes ciudades como a pueblos del interior, siempre con el mismo compromiso y calidad en cada obra.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-franil-accent" />
            <span className="text-franil-muted text-sm">Presencia en todo el territorio uruguayo</span>
          </div>
        </div>

        <div className="mapa-video relative rounded-3xl overflow-hidden glass-card flex items-center justify-center" style={{ background: '#050810' }}>
          <video
            src="/mapa-uruguay.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto rounded-3xl"
          />
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-franil-border px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
              <img src="/logo-franil.png" alt="Franil" className="w-full h-full object-contain" />
            </div>
            <span className="text-2xl text-franil-text tracking-widest" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>FRANIL</span>
          </div>
          <p className="text-franil-muted text-sm max-w-xs leading-relaxed">
            Infraestructura subterránea de alta calidad para el Uruguay del futuro.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div>
            <p className="text-franil-muted text-xs uppercase tracking-widest mb-4">Servicios</p>
            <ul className="space-y-2">
              {['Fibra Óptica', 'Perforación HDD', 'Cañerías', 'Microtúnel'].map(s => (
                <li key={s}><a href="#servicios" className="text-franil-muted text-sm hover:text-franil-text transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-franil-muted text-xs uppercase tracking-widest mb-4">Empresa</p>
            <ul className="space-y-2">
              {['Proyectos', 'Tecnología', 'Contacto'].map(s => (
                <li key={s}><a href={`#${s.toLowerCase()}`} className="text-franil-muted text-sm hover:text-franil-text transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-franil-border flex flex-col md:flex-row justify-between gap-2">
        <p className="text-franil-border text-xs">© 2025 Franil S.A. — Montevideo, Uruguay. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

const WA_CONTACTS = [
  { name: 'Fabio — Director', number: '59899106464' },
  { name: 'Franil',        number: '59898557308' },
]

function WhatsAppWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-[9990] flex flex-col-reverse items-start gap-3">
      {open && (
        <div className="flex flex-col gap-2 mb-1">
          {WA_CONTACTS.map(c => (
            <a
              key={c.number}
              href={`https://wa.me/${c.number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-card border border-franil-border hover:border-[#25D366]/40 hover:bg-[#25D366]/5 transition-all duration-200 group"
            >
              <div className="w-7 h-7 rounded-full bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.123 1.532 5.855L.057 23.882l6.195-1.624A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-5.006-1.374l-.36-.214-3.724.976.994-3.634-.235-.374A9.786 9.786 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                </svg>
              </div>
              <span className="text-franil-text text-sm font-semibold whitespace-nowrap group-hover:text-[#25D366] transition-colors">{c.name}</span>
            </a>
          ))}
        </div>
      )}

      <button
        onClick={() => setOpen(o => !o)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 active:scale-95"
        style={{ background: '#25D366', boxShadow: '0 4px 24px rgba(37,211,102,0.35)' }}
      >
        {open ? (
          <X size={22} color="white" />
        ) : (
          <svg viewBox="0 0 24 24" width="26" height="26" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.123 1.532 5.855L.057 23.882l6.195-1.624A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-5.006-1.374l-.36-.214-3.724.976.994-3.634-.235-.374A9.786 9.786 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
          </svg>
        )}
      </button>
    </div>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <>
      {!ready && <Preloader onComplete={() => setReady(true)} />}
      <WhatsAppWidget />
      <main
        className="w-full max-w-full grain-overlay"
        style={{ overflowX: 'clip', visibility: ready ? 'visible' : 'hidden' }}
      >
        <Navbar />
        <VideoReel />
        <SobreNosotros />
        <MapaUruguay />
        <Hero />
        <Marquee />
        <Services />
        {/* <Machines /> */}
        <Projects />
        {/* <Technology /> */}
        <Contact />
        <Footer />
      </main>
    </>
  )
}
