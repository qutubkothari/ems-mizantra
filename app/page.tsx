'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';

type Enquiry = { id: string; lead_number?: string; company_name?: string; contact_person?: string; status?: string; value?: number };
type Workspace = { stages?: Array<{ stage_name?: string; leads?: Enquiry[]; value?: number }>; intake_messages?: unknown[]; notifications?: unknown[] };

const API = '/api/v1';

async function request<T>(path: string, init: RequestInit = {}, token?: string) {
  const response = await fetch(`${API}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(init.headers || {}) },
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) throw new Error(body?.message || body?.error || 'The service could not complete this request.');
  return (body?.data ?? body) as T;
}

export default function EnquiryManagementSystem() {
  const [token, setToken] = useState<string | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const loadWorkspace = useCallback(async (accessToken: string) => {
    setBusy(true); setError('');
    try {
      setWorkspace(await request<Workspace>('/ems/dashboard', {}, accessToken));
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Unable to load enquiries.'); }
    finally { setBusy(false); }
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem('ems_access_token');
    if (saved) { setToken(saved); void loadWorkspace(saved); }
  }, [loadWorkspace]);

  async function signIn(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      const result = await request<{ accessToken?: string }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      if (!result.accessToken) throw new Error('Sign-in did not return an access token.');
      window.localStorage.setItem('ems_access_token', result.accessToken);
      setToken(result.accessToken); await loadWorkspace(result.accessToken);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Unable to sign in.'); }
    finally { setBusy(false); }
  }

  function signOut() { window.localStorage.removeItem('ems_access_token'); setToken(null); setWorkspace(null); }

  if (!token) return <main className="auth"><section className="authCard"><p className="eyebrow">MIZANTRA</p><h1>Enquiry Management System</h1><p>Track every enquiry, follow-up and conversion in one focused workspace.</p><form onSubmit={signIn}><label>Work email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required /></label><label>Password<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required /></label>{error && <p className="error">{error}</p>}<button disabled={busy}>{busy ? 'Signing in…' : 'Sign in to EMS'}</button></form><small>Connected to the Mizantra test environment.</small></section></main>;

  const stages = workspace?.stages || [];
  const enquiries = stages.flatMap((stage) => stage.leads || []);
  return <main className="shell"><header><div><p className="eyebrow">MIZANTRA · EMS</p><h1>Enquiry Management System</h1></div><div className="actions"><button className="secondary" onClick={() => void loadWorkspace(token)} disabled={busy}>Refresh</button><button className="secondary" onClick={signOut}>Sign out</button></div></header><section className="metrics"><article><span>Total enquiries</span><b>{enquiries.length}</b></article><article><span>Pipeline stages</span><b>{stages.length}</b></article><article><span>New intake</span><b>{workspace?.intake_messages?.length || 0}</b></article><article><span>Actions waiting</span><b>{workspace?.notifications?.length || 0}</b></article></section>{error && <p className="error">{error}</p>}<section className="board">{stages.map((stage, index) => <article className="lane" key={`${stage.stage_name}-${index}`}><div className="laneTitle"><h2>{stage.stage_name || 'Unassigned'}</h2><span>{stage.leads?.length || 0}</span></div>{(stage.leads || []).map((enquiry) => <div className="enquiry" key={enquiry.id}><b>{enquiry.company_name || 'Unnamed enquiry'}</b><p>{enquiry.contact_person || enquiry.lead_number || 'No contact recorded'}</p>{typeof enquiry.value === 'number' && <strong>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(enquiry.value)}</strong>}</div>)}{!(stage.leads || []).length && <p className="empty">No enquiries here.</p>}</article>)}</section></main>;
}
