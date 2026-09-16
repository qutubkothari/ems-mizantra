"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Building2, Contact, Handshake, Loader2, Plus, RefreshCw, X } from "lucide-react";
import { apiClient } from "../../../../lib/api-client";

type Mode = "accounts" | "contacts" | "opportunities";
type User = { id: string; name: string; email?: string };
type Account = {
  id: string; account_number: string; account_name: string; account_type: string;
  customer_id?: string; industry?: string; territory?: string; email?: string;
  phone?: string; owner_user_id?: string; status: string;
};
type Contact = {
  id: string; salutation?: string; first_name: string; last_name?: string;
  job_title?: string; email?: string; mobile?: string; is_primary: boolean;
  email_consent: string; whatsapp_consent: string; do_not_call: boolean;
  account?: { id: string; account_number: string; account_name: string };
};
type Stage = {
  id: string; stage_code: string; stage_name: string; probability: number;
  colour?: string; is_closed: boolean; is_won: boolean;
};
type Opportunity = {
  id: string; opportunity_number: string; opportunity_name: string; account_id: string;
  owner_user_id?: string; stage_id: string; status: string; amount: number;
  currency_code: string; probability: number; expected_close_date?: string;
  next_step?: string; product_interest?: string; loss_reason?: string;
  account?: { id: string; account_number: string; account_name: string };
  primary_contact?: Contact; stage?: Stage;
};
type Workspace = {
  accounts: Account[]; contacts: Contact[]; opportunities: Opportunity[]; stages: Stage[];
  kpis: { accounts: number; contacts: number; open_opportunities: number; open_pipeline: number; weighted_pipeline: number };
};

const field = "w-full rounded-xl border border-[#D9C9AC] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#8B6F47] focus:ring-2 focus:ring-[#EADCC4]";
const blank: Workspace = { accounts: [], contacts: [], opportunities: [], stages: [], kpis: { accounts: 0, contacts: 0, open_opportunities: 0, open_pipeline: 0, weighted_pipeline: 0 } };
function money(value: any, currency = "INR") {
  try { return new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(Number(value || 0)); }
  catch { return `${currency} ${Number(value || 0).toLocaleString("en-IN")}`; }
}
function fullName(contact?: Contact) {
  return contact ? [contact.salutation, contact.first_name, contact.last_name].filter(Boolean).join(" ") : "—";
}

export default function CommercialWorkspace({ mode, users, canCreate, canEdit }: { mode: Mode; users: User[]; canCreate: boolean; canEdit: boolean }) {
  const [data, setData] = useState<Workspace>(blank);
  const [busy, setBusy] = useState(true);
  const [form, setForm] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    setBusy(true); setError("");
    try { setData(await apiClient.get<Workspace>("/crm/commercial-workspace")); }
    catch (next: any) { setError(next?.message || "Unable to load EMS commercial workspace."); }
    finally { setBusy(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  useEffect(() => { setForm(false); setEditing(null); setMessage(""); setError(""); }, [mode]);
  const userName = (id?: string) => users.find((user) => user.id === id)?.name || "Unassigned";
  const contactsFor = (accountId: string) => data.contacts.filter((contact) => contact.account?.id === accountId);
  const q = query.trim().toLowerCase();
  const accounts = useMemo(() => data.accounts.filter((row) => !q || [row.account_number,row.account_name,row.industry,row.territory,row.email,row.phone].some((value) => String(value || "").toLowerCase().includes(q))), [data.accounts,q]);
  const contacts = useMemo(() => data.contacts.filter((row) => !q || [fullName(row),row.account?.account_name,row.email,row.mobile,row.job_title].some((value) => String(value || "").toLowerCase().includes(q))), [data.contacts,q]);
  const opportunities = useMemo(() => data.opportunities.filter((row) => !q || [row.opportunity_number,row.opportunity_name,row.account?.account_name,row.product_interest,row.next_step].some((value) => String(value || "").toLowerCase().includes(q))), [data.opportunities,q]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    const formElement = event.currentTarget;
    const raw = Object.fromEntries(new FormData(formElement));
    const payload: any = { ...raw };
    if (mode === "contacts") {
      payload.is_primary = raw.is_primary === "on";
      payload.do_not_call = raw.do_not_call === "on";
    }
    if (mode === "opportunities") payload.amount = Number(raw.amount || 0);
    try {
      const endpoint = mode === "accounts" ? "/crm/accounts" : mode === "contacts" ? "/crm/contacts" : "/crm/opportunities";
      if (editing) await apiClient.patch(`${endpoint}/${editing.id}`, payload);
      else await apiClient.post(endpoint, payload);
      setMessage(`${mode === "accounts" ? "Customer" : mode === "contacts" ? "Contact" : "Opportunity"} ${editing ? "updated" : "created"}.`);
      formElement.reset();
      setForm(false);
      setEditing(null);
      await load();
    } catch (next: any) { setError(next?.message || "Unable to save the EMS record."); }
    finally { setBusy(false); }
  };

  const changeStage = async (row: Opportunity, stageId: string) => {
    const stage = data.stages.find((item) => item.id === stageId);
    let lossReason: string | null = null;
    if (stage?.stage_code === "LOST") {
      lossReason = window.prompt("Loss reason is required:")?.trim() || null;
      if (!lossReason) return;
    }
    setBusy(true); setError("");
    try { await apiClient.patch(`/crm/opportunities/${row.id}`, { stage_id: stageId, loss_reason: lossReason }); await load(); }
    catch (next: any) { setError(next?.message || "Unable to move the opportunity."); }
    finally { setBusy(false); }
  };
  const editRecord=(kind:"accounts"|"contacts"|"opportunities",row:any)=>{ if(kind!==mode) return; setEditing(row); setForm(true); };
  const deleteRecord=async(kind:"accounts"|"contacts"|"opportunities",row:any)=>{if(!window.confirm(`Delete ${row.account_name||fullName(row)||row.opportunity_name}?`))return;try{await apiClient.delete(`/crm/${kind}/${row.id}`);setMessage("Record deleted.");await load();}catch(next:any){setError(next?.message||"This record cannot be deleted because it has linked history.");}};

  const title = mode === "accounts" ? "Customers" : mode === "contacts" ? "Contacts" : "Opportunities";
  const Icon = mode === "accounts" ? Building2 : mode === "contacts" ? Contact : Handshake;
  return <section className="space-y-3">
    <header className="flex flex-col gap-2 rounded-xl border border-[#E7DBC5] bg-white px-4 py-3 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2"><Icon className="h-5 w-5 text-[#8B6F47]"/><div><h2 className="text-xl font-black">{title}</h2><p className="text-xs text-[#6F5A49]">{mode === "accounts" ? "Prospects and customers." : mode === "contacts" ? "Decision-makers and consent." : "Active commercial deals."}</p></div></div>
      <div className="flex gap-2"><button onClick={load} className="rounded-lg border p-2" aria-label="Refresh commercial EMS"><RefreshCw className={`h-4 w-4 ${busy ? "animate-spin" : ""}`}/></button>{canCreate && <button onClick={() => setForm(true)} className="inline-flex items-center gap-2 rounded-lg bg-[#3E2A1F] px-3 py-2 text-sm font-black text-white"><Plus className="h-4 w-4"/>New {mode === "accounts" ? "customer" : mode === "contacts" ? "contact" : "opportunity"}</button>}</div>
    </header>
    {error && <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    {message && <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p>}
    <div className="grid gap-3 sm:grid-cols-3">
      <K label="Customers" value={data.kpis.accounts}/><K label="Contacts" value={data.kpis.contacts}/><K label={mode === "opportunities" ? "Weighted pipeline" : "Open opportunities"} value={mode === "opportunities" ? money(data.kpis.weighted_pipeline) : data.kpis.open_opportunities}/>
    </div>
    <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${title.toLowerCase()}…`} className={field}/>
    {mode === "accounts" && <div className="overflow-x-auto rounded-2xl border bg-white"><table className="min-w-full text-sm"><thead className="border-b bg-[#F7F3EA] text-left text-xs uppercase text-[#6F5A49]"><tr><th className="p-3">Customer</th><th className="p-3">Type</th><th className="p-3">Industry / territory</th><th className="p-3">Contact</th><th className="p-3">Owner</th><th className="p-3">Actions</th></tr></thead><tbody>{accounts.map((row) => <tr key={row.id} className="border-b"><td className="p-3"><b>{row.account_name}</b><small className="block text-slate-500">{row.account_number}</small></td><td className="p-3">{row.account_type}</td><td className="p-3">{row.industry || "—"}<small className="block text-slate-500">{row.territory || "—"}</small></td><td className="p-3">{row.email || row.phone || "—"}</td><td className="p-3">{userName(row.owner_user_id)}</td><td className="p-3">{canEdit&&<span className="flex gap-1"><button onClick={()=>void editRecord("accounts",row)} className="rounded border px-2 py-1 text-xs font-bold">Edit</button><button onClick={()=>void deleteRecord("accounts",row)} className="rounded border border-red-200 px-2 py-1 text-xs font-bold text-red-700">Delete</button></span>}</td></tr>)}</tbody></table>{!accounts.length && !busy && <Empty/>}</div>}
    {mode === "contacts" && <div className="overflow-x-auto rounded-2xl border bg-white"><table className="min-w-full text-sm"><thead className="border-b bg-[#F7F3EA] text-left text-xs uppercase text-[#6F5A49]"><tr><th className="p-3">Contact</th><th className="p-3">Account</th><th className="p-3">Role</th><th className="p-3">Phone / email</th><th className="p-3">Consent</th><th className="p-3">Actions</th></tr></thead><tbody>{contacts.map((row) => <tr key={row.id} className="border-b"><td className="p-3"><b>{fullName(row)}</b>{row.is_primary && <small className="ml-2 rounded bg-emerald-50 px-2 py-1 font-bold text-emerald-700">PRIMARY</small>}</td><td className="p-3">{row.account?.account_name || "—"}</td><td className="p-3">{row.job_title || "—"}</td><td className="p-3">{row.mobile || "—"}<small className="block text-slate-500">{row.email || "—"}</small></td><td className="p-3 text-xs">Email {row.email_consent}<br/>WhatsApp {row.whatsapp_consent}{row.do_not_call && <b className="block text-red-700">DO NOT CALL</b>}</td><td className="p-3">{canEdit&&<span className="flex gap-1"><button onClick={()=>void editRecord("contacts",row)} className="rounded border px-2 py-1 text-xs font-bold">Edit</button><button onClick={()=>void deleteRecord("contacts",row)} className="rounded border border-red-200 px-2 py-1 text-xs font-bold text-red-700">Delete</button></span>}</td></tr>)}</tbody></table>{!contacts.length && !busy && <Empty/>}</div>}
    {mode === "opportunities" && <div className="flex gap-3 overflow-x-auto pb-3">{data.stages.map((stage) => <div key={stage.id} className="w-72 shrink-0 rounded-2xl border bg-white" style={{borderTop:`4px solid ${stage.colour || "#8B6F47"}`}}><div className="border-b p-3"><b>{stage.stage_name}</b><small className="block text-slate-500">{stage.probability}% · {opportunities.filter((row) => row.stage_id === stage.id).length} deal(s)</small></div><div className="space-y-2 p-2">{opportunities.filter((row) => row.stage_id === stage.id).map((row) => <article key={row.id} className="rounded-xl border p-3"><b className="text-sm">{row.opportunity_name}</b><small className="block text-slate-500">{row.opportunity_number} · {row.account?.account_name}</small><p className="mt-2 font-black">{money(row.amount,row.currency_code)}</p><p className="text-xs text-slate-500">Close {row.expected_close_date || "not set"} · {userName(row.owner_user_id)}</p>{row.next_step && <p className="mt-2 rounded bg-[#F7F3EA] p-2 text-xs">Next: {row.next_step}</p>}{canEdit && <><select value={row.stage_id} onChange={(event) => changeStage(row,event.target.value)} className={`${field} mt-2 py-1.5`}>{data.stages.map((next) => <option key={next.id} value={next.id}>{next.stage_name}</option>)}</select><div className="mt-2 flex gap-1"><button onClick={()=>void editRecord("opportunities",row)} className="rounded border px-2 py-1 text-xs font-bold">Edit</button><button onClick={()=>void deleteRecord("opportunities",row)} className="rounded border border-red-200 px-2 py-1 text-xs font-bold text-red-700">Delete</button></div></>}</article>)}{!opportunities.some((row) => row.stage_id === stage.id) && <p className="p-3 text-center text-xs text-slate-400">No deals</p>}</div></div>)}</div>}
    {form && <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/50 p-4"><button aria-label="Close form" className="absolute inset-0" onClick={() => {setForm(false);setEditing(null);}}/><form onSubmit={submit} className="relative max-h-[90vh] w-full max-w-3xl space-y-3 overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-xl font-black">{editing ? "Edit" : "New"} {mode === "accounts" ? "customer" : mode === "contacts" ? "contact" : "opportunity"}</h3><button type="button" onClick={() => {setForm(false);setEditing(null);}}><X/></button></div>{mode === "accounts" && <AccountForm initial={editing} users={users}/>} {mode === "contacts" && <ContactForm initial={editing} accounts={data.accounts}/>} {mode === "opportunities" && <OpportunityForm initial={editing} accounts={data.accounts} contactsFor={contactsFor} stages={data.stages} users={users}/>}<button disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-[#3E2A1F] px-5 py-2.5 font-black text-white disabled:opacity-50">{busy && <Loader2 className="h-4 w-4 animate-spin"/>}Save</button></form></div>}
  </section>;
}

function AccountForm({users,initial}:{users:User[];initial?:any}) { return <div className="grid gap-3 sm:grid-cols-2"><input required name="account_name" defaultValue={initial?.account_name||""} className={field} placeholder="Customer/company name"/><select name="account_type" defaultValue={initial?.account_type||"PROSPECT"} className={field}><option>PROSPECT</option><option>CUSTOMER</option><option>PARTNER</option><option>DISTRIBUTOR</option><option>GOVERNMENT</option><option>OTHER</option></select><input name="industry" defaultValue={initial?.industry||""} className={field} placeholder="Industry"/><input name="territory" defaultValue={initial?.territory||""} className={field} placeholder="Territory"/><input type="email" name="email" defaultValue={initial?.email||""} className={field} placeholder="Company email"/><input name="phone" defaultValue={initial?.phone||""} className={field} placeholder="Company phone"/><input name="website" defaultValue={initial?.website||""} className={field} placeholder="Website"/><input name="tax_registration_number" defaultValue={initial?.tax_registration_number||""} className={field} placeholder="GST/VAT/TRN"/><select name="owner_user_id" defaultValue={initial?.owner_user_id||""} className={field}><option value="">Customer owner</option>{users.map((user)=><option data-i18n-skip key={user.id} value={user.id}>{user.name}</option>)}</select><textarea name="billing_address" defaultValue={initial?.billing_address||""} className={field} placeholder="Billing address"/><textarea name="shipping_address" defaultValue={initial?.shipping_address||""} className={field} placeholder="Shipping address"/></div>; }
function ContactForm({accounts,initial}:{accounts:Account[];initial?:any}) { return <div className="grid gap-3 sm:grid-cols-2"><select required name="account_id" defaultValue={initial?.account_id||""} className={field}><option value="">Select customer</option>{accounts.map((row)=><option key={row.id} value={row.id}>{row.account_number} — {row.account_name}</option>)}</select><select name="salutation" defaultValue={initial?.salutation||""} className={field}><option value="">Salutation</option><option>Mr.</option><option>Ms.</option><option>Mrs.</option><option>Dr.</option></select><input required name="first_name" defaultValue={initial?.first_name||""} className={field} placeholder="First name"/><input name="last_name" defaultValue={initial?.last_name||""} className={field} placeholder="Last name"/><input name="job_title" defaultValue={initial?.job_title||""} className={field} placeholder="Job title"/><input name="department" defaultValue={initial?.department||""} className={field} placeholder="Department"/><input type="email" name="email" defaultValue={initial?.email||""} className={field} placeholder="Email"/><input name="mobile" defaultValue={initial?.mobile||""} className={field} placeholder="Mobile"/><input name="whatsapp" defaultValue={initial?.whatsapp||""} className={field} placeholder="WhatsApp"/><select name="email_consent" defaultValue={initial?.email_consent||"UNKNOWN"} className={field}><option>UNKNOWN</option><option>OPTED_IN</option><option>OPTED_OUT</option></select><select name="whatsapp_consent" defaultValue={initial?.whatsapp_consent||"UNKNOWN"} className={field}><option>UNKNOWN</option><option>OPTED_IN</option><option>OPTED_OUT</option></select><label className="flex items-center gap-2 rounded-xl border p-3"><input type="checkbox" name="is_primary" defaultChecked={!!initial?.is_primary}/>Primary contact</label><label className="flex items-center gap-2 rounded-xl border p-3"><input type="checkbox" name="do_not_call" defaultChecked={!!initial?.do_not_call}/>Do not call</label></div>; }
function OpportunityForm({accounts,contactsFor,stages,users,initial}:{accounts:Account[];contactsFor:(id:string)=>Contact[];stages:Stage[];users:User[];initial?:any}) { const [account,setAccount]=useState(initial?.account_id||""); return <div className="grid gap-3 sm:grid-cols-2"><input required name="opportunity_name" defaultValue={initial?.opportunity_name||""} className={field} placeholder="Opportunity/deal name"/><select required name="account_id" value={account} onChange={(event)=>setAccount(event.target.value)} className={field}><option value="">Select account</option>{accounts.map((row)=><option key={row.id} value={row.id}>{row.account_number} — {row.account_name}</option>)}</select><select name="primary_contact_id" defaultValue={initial?.primary_contact_id||""} className={field}><option value="">Primary contact</option>{contactsFor(account).map((row)=><option key={row.id} value={row.id}>{fullName(row)}</option>)}</select><select required name="stage_id" defaultValue={initial?.stage_id||""} className={field}><option value="">Stage</option>{stages.map((stage)=><option key={stage.id} value={stage.id}>{stage.stage_name} · {stage.probability}%</option>)}</select><input required name="amount" type="number" min="0" step="0.01" defaultValue={initial?.amount??""} className={field} placeholder="Expected value"/><select name="currency_code" defaultValue={initial?.currency_code||"AED"} className={field}><option>INR</option><option>AED</option><option>USD</option></select><input name="expected_close_date" type="date" defaultValue={initial?.expected_close_date||""} className={field}/><select name="owner_user_id" defaultValue={initial?.owner_user_id||""} className={field}><option value="">Opportunity owner</option>{users.map((user)=><option data-i18n-skip key={user.id} value={user.id}>{user.name}</option>)}</select><input name="product_interest" defaultValue={initial?.product_interest||""} className={field} placeholder="Product / solution"/><input name="competitors" defaultValue={initial?.competitors||""} className={field} placeholder="Competitors"/><textarea name="requirement" defaultValue={initial?.requirement||""} className={`${field} sm:col-span-2`} placeholder="Customer requirement"/><textarea name="next_step" defaultValue={initial?.next_step||""} className={`${field} sm:col-span-2`} placeholder="Next step"/></div>; }
function K({label,value}:{label:string;value:any}) { return <div className="rounded-xl border border-[#E7DBC5] bg-white px-3 py-2"><small className="font-bold uppercase text-[#806D5C]">{label}</small><p className="text-xl font-black">{value}</p></div>; }
function Empty(){return <p className="p-8 text-center text-sm text-slate-500">No matching records.</p>}
