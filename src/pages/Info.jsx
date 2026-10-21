import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Donut from '../components/Donut'
import { Field, PageBand, Wave, mailOk, useDocTitle, usePageTheme } from '../components/ui'
import { BRANCHES, D, FAQ, STORY_TIMELINE, rs, DELIVERY_FEE, FREE_DELIVERY_FROM } from '../data/shop'
import { useShop } from '../context/ShopContext'

const tint = (id) => ({ '--tint': D[id].theme.band2, '--tint-ink': D[id].theme.ink })

export function Story() {
  usePageTheme('caramel-crunch')
  useDocTitle('Our story')
  return (
    <>
      <PageBand title="Our story" sub="A small kitchen, a lot of proving time." deco="caramel-crunch" />
      <section className="wrap section pt-s">
        <div className="prose">
          <p>Donuts started with one fryer and a lot of failed batches. We wanted a donut that was soft the whole way through, with a glaze that tasted like the thing on the label and not like sugar.</p>
          <p>So the dough is proofed overnight, the glazes are cooked in our own kitchen, and each tray is small enough that we can finish it before it cools. When a tray sells out, we bake the next one.</p>
        </div>
      </section>
      <section className="wrap section pt-0">
        <h2 className="script">A day in the kitchen</h2>
        <ul className="timeline">
          {STORY_TIMELINE.map(([time, title, text]) => (
            <li key={time}><time>{time}</time><div><h3>{title}</h3><p>{text}</p></div></li>
          ))}
        </ul>
      </section>
      <section className="wrap section pt-0">
        <div className="trio">
          <div style={tint('lemon-pearl')}><h3>Dough proofed overnight</h3><p>Slow proofing is what makes the texture light and a bit chewy.</p></div>
          <div style={tint('strawberry-rush')}><h3>Glazes made in-house</h3><p>Real fruit, real vanilla and real chocolate, cooked in small pots.</p></div>
          <div style={tint('blueberry-sky')}><h3>Baked in small batches</h3><p>We would rather run out than serve a donut that has been sitting.</p></div>
        </div>
      </section>
    </>
  )
}

export function Locations() {
  usePageTheme('orange-zest')
  useDocTitle('Locations')
  return (
    <>
      <PageBand title="Find a branch" sub="Collect your order or have it delivered from the one closest to you." deco="orange-zest" />
      <section className="wrap section pt-s">
        <div className="locs">
          {BRANCHES.map((b) => (
            <article className="loc" key={b.name}>
              <h3>{b.name}</h3>
              <dl>
                <div><dt>Address</dt><dd>{b.addr}</dd></div>
                <div><dt>Hours</dt><dd>{b.hours}</dd></div>
                <div><dt>Phone</dt><dd>{b.phone}</dd></div>
              </dl>
            </article>
          ))}
        </div>
        <div className="prose" style={{ marginTop: 36 }}>
          <h2 className="script">Delivery and pickup</h2>
          <p className="mt-s">We deliver within about 5 km of each branch. Delivery costs {rs(DELIVERY_FEE)}, and it is free on orders above {rs(FREE_DELIVERY_FROM)}. For pickup, choose a branch at checkout and we will have it ready at the counter.</p>
        </div>
      </section>
    </>
  )
}

export function Contact() {
  const formRef = useRef(null)
  const [errors, setErrors] = useState({})
  const [sentTo, setSentTo] = useState(null)
  usePageTheme('vanilla-cloud')
  useDocTitle('Contact')

  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(formRef.current)
    const v = (k) => String(f.get(k) || '').trim()
    const err = {}
    if (!v('name')) err.name = 'Enter your name.'
    if (!mailOk(v('email'))) err.email = 'Enter an email like name@example.com.'
    if (v('message').length < 10) err.message = 'Write at least a short sentence so we can help.'
    setErrors(err)
    const first = Object.keys(err)[0]
    if (first) { formRef.current.elements[first]?.focus(); return }
    setSentTo({ name: v('name').split(' ')[0], email: v('email') })
  }
  const bad = (k) => (errors[k] ? { className: 'bad', 'aria-invalid': true } : {})

  return (
    <>
      <PageBand title="Contact" sub="Questions, feedback or a big order? Send us a note." deco="vanilla-cloud" />
      <section className="wrap section pt-s">
        <div className="two">
          <div>
            {sentTo ? (
              <div className="empty left" role="status">
                <h2 className="script">Message sent</h2>
                <p>Thanks, {sentTo.name}. We will reply to {sentTo.email} within one working day.</p>
                <Link className="btn btn-solid" to="/menu">Back to the menu</Link>
              </div>
            ) : (
              <form ref={formRef} onSubmit={submit} noValidate>
                <div className="cols2">
                  <Field id="c-name" label="Your name" error={errors.name}><input id="c-name" name="name" autoComplete="name" {...bad('name')} /></Field>
                  <Field id="c-mail" label="Email" error={errors.email}><input id="c-mail" name="email" type="email" autoComplete="email" {...bad('email')} /></Field>
                </div>
                <Field id="c-topic" label="Topic">
                  <select id="c-topic" name="topic"><option>An order</option><option>A big or event order</option><option>Feedback</option><option>Something else</option></select>
                </Field>
                <Field id="c-msg" label="Message" error={errors.message}><textarea id="c-msg" name="message" {...bad('message')} /></Field>
                <button className="btn btn-solid" type="submit">Send message</button>
              </form>
            )}
          </div>
          <aside className="contact-info">
            <div><b>Email</b>hello@donuts.example</div>
            <div><b>Phone</b>0300 000 0000</div>
            <div><b>Big orders</b>For 24 or more, contact us at least a day ahead.</div>
            <div><b>Quick answers</b><Link className="link" to="/faq">Read the FAQ</Link></div>
          </aside>
        </div>
      </section>
    </>
  )
}

export function Faq() {
  usePageTheme('red-velvet')
  useDocTitle('FAQ')
  return (
    <>
      <PageBand title="Questions" sub="The things people ask us most." deco="red-velvet" />
      <section className="wrap section faq pt-s" style={{ maxWidth: 860 }}>
        {FAQ.map(([q, a], i) => (
          <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>
        ))}
        <p className="mt-l">Still stuck? <Link className="link" to="/contact">Send us a message</Link>.</p>
      </section>
    </>
  )
}

export function NotFound() {
  const { theme } = useShop()
  usePageTheme(theme)
  useDocTitle('Page not found')
  return (
    <section className="page-band">
      <div className="wrap">
        <h1 className="script">Oops</h1>
        <p>That page has been eaten. Try the menu instead.</p>
        <p><Link className="btn btn-solid mt-m" to="/menu">Go to the menu</Link></p>
      </div>
      <div className="deco" aria-hidden="true"><Donut donut={D[theme]} bite /></div>
      <Wave />
    </section>
  )
}
