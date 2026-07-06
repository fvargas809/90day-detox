'use client';

import { useState } from 'react';

type Offer = {
  id: string;
  ctaLabel: string;
  offerTag: string;
  active: boolean;
  responseCount: number;
};

function OfferCard({
  offer,
  onSave,
  onToggle,
  onDelete,
}: {
  offer: Offer;
  onSave: (id: string, newLabel: string) => Promise<void>;
  onToggle: (offer: Offer) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(offer.ctaLabel);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (draft.trim() === '' || draft === offer.ctaLabel) {
      setEditing(false);
      setDraft(offer.ctaLabel);
      return;
    }
    setSaving(true);
    await onSave(offer.id, draft.trim());
    setSaving(false);
    setEditing(false);
  };

  return (
    <div className="bg-white border border-sage/40 rounded-2xl p-5 flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === 'Enter') save();
              if (e.key === 'Escape') {
                setDraft(offer.ctaLabel);
                setEditing(false);
              }
            }}
            className="w-full rounded-lg border border-forest px-3 py-1.5 text-lg font-display"
          />
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="font-display text-lg text-left hover:underline decoration-dashed underline-offset-4"
            title="Click to edit"
          >
            {saving ? 'Saving…' : offer.ctaLabel}
          </button>
        )}
        <p className="text-sm text-inkMuted mt-1">
          {offer.responseCount} {offer.responseCount === 1 ? 'response' : 'responses'}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
            offer.active ? 'bg-forest/10 text-forest' : 'bg-red-50 text-red-600'
          }`}
        >
          {offer.active ? 'Live' : 'Hidden'}
        </span>
        <button
          onClick={() => onToggle(offer)}
          className="text-sm px-3 py-1.5 rounded-full border border-sage/60 hover:bg-surface"
        >
          {offer.active ? 'Hide' : 'Show'}
        </button>
        <button
          onClick={() => onDelete(offer.id)}
          className="text-sm px-3 py-1.5 rounded-full border border-red-200 text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function AdminOffers({ initialOffers }: { initialOffers: Offer[] }) {
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [adding, setAdding] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customTag, setCustomTag] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const refresh = async () => {
    const res = await fetch('/api/admin/funnels');
    const data = await res.json();
    setOffers(data.funnels ?? []);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/admin/funnels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ctaLabel: newLabel.trim(),
          offerTag: showAdvanced && customTag.trim() ? customTag.trim() : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        return;
      }
      setNewLabel('');
      setCustomTag('');
      setShowAdvanced(false);
      setAdding(false);
      refresh();
    } catch {
      setError('Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLabel = async (id: string, newCtaLabel: string) => {
    await fetch(`/api/admin/funnels/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ctaLabel: newCtaLabel }),
    });
    refresh();
  };

  const handleToggle = async (offer: Offer) => {
    await fetch(`/api/admin/funnels/${offer.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !offer.active }),
    });
    refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this permanently?')) return;
    await fetch(`/api/admin/funnels/${id}`, { method: 'DELETE' });
    refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl">Your offers</h2>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="rounded-full bg-forest text-linen px-4 py-2 text-sm font-semibold hover:bg-forestDark"
          >
            + Add an offer
          </button>
        )}
      </div>

      {adding && (
        <form onSubmit={handleAdd} className="bg-surface rounded-2xl p-5 mb-4 space-y-3">
          <label className="text-sm font-medium text-ink">What should the button say?</label>
          <input
            autoFocus
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="e.g. Get My Free Guide"
            required
            className="w-full rounded-lg border border-sage/60 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-inkMuted hover:text-forest underline"
          >
            {showAdvanced ? 'Hide advanced option' : 'Advanced: use a specific identifier'}
          </button>
          {showAdvanced && (
            <input
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_'))}
              placeholder="e.g. tier_foundational (only needed to match existing code)"
              className="w-full rounded-lg border border-sage/60 px-3 py-2 text-sm"
            />
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-forest text-linen px-5 py-2 text-sm font-semibold hover:bg-forestDark disabled:opacity-60"
            >
              {saving ? 'Adding…' : 'Add Offer'}
            </button>
            <button
              type="button"
              onClick={() => {
                setAdding(false);
                setError('');
              }}
              className="text-sm text-inkMuted hover:text-ink px-2"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {offers.length === 0 ? (
        <p className="text-inkMuted text-sm">No offers yet. Click &ldquo;+ Add an offer&rdquo; to create one.</p>
      ) : (
        <div className="space-y-3">
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onSave={handleSaveLabel}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}