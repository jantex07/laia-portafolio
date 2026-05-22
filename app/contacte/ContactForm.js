'use client';

import { useState } from 'react';

export default function ContactForm({ email }) {
  const [form, setForm] = useState({ nom: '', correu: '', missatge: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'ok' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          nom: form.nom,
          correu: form.correu,
          missatge: form.missatge,
          _subject: `Nova consulta de ${form.nom}`,
        }),
      });
      if (res.ok) { setStatus('ok'); setForm({ nom: '', correu: '', missatge: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  if (status === 'ok') return (
    <div className="form-success">
      <div className="form-success-icon">✓</div>
      <p>Missatge enviat!</p>
      <span>Et respondré el més aviat possible.</span>
    </div>
  );

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label>Nom</label>
        <input
          type="text"
          placeholder="El teu nom"
          value={form.nom}
          onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
          required
        />
      </div>
      <div className="form-field">
        <label>Correu electrònic</label>
        <input
          type="email"
          placeholder="hola@example.com"
          value={form.correu}
          onChange={e => setForm(f => ({ ...f, correu: e.target.value }))}
          required
        />
      </div>
      <div className="form-field">
        <label>Missatge</label>
        <textarea
          placeholder="Explica'm la teva idea..."
          rows={5}
          value={form.missatge}
          onChange={e => setForm(f => ({ ...f, missatge: e.target.value }))}
          required
        />
      </div>
      {status === 'error' && (
        <p style={{ color: '#c0392b', fontSize: '13px', marginBottom: '12px' }}>
          Hi ha hagut un error. Prova per email directament.
        </p>
      )}
      <button type="submit" className="form-submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviant...' : 'Enviar missatge'}
      </button>
    </form>
  );
}
