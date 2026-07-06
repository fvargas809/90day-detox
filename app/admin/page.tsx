import { redirect } from 'next/navigation';
import { stackServerApp } from '@/lib/stack';
import { isAdminEmail } from '@/lib/admin';
import { prisma } from '@/lib/prisma';
import AdminOffers from '@/components/admin/AdminOffers';

export const metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect('/handler/sign-in?after_auth_return_to=%2Fadmin');
  }
  if (!isAdminEmail(user.primaryEmail)) {
    redirect('/');
  }

  const [totalLeads, pendingReviewCount, funnels, counts, recentLeads] = await Promise.all([
    prisma.lead.count(),
    prisma.review.count({ where: { approved: false } }),
    prisma.funnel.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.lead.groupBy({ by: ['offerTag'], _count: { offerTag: true } }),
    prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 15 }),
  ]);

  const countMap: Record<string, number> = {};
  for (const c of counts) {
    if (c.offerTag) countMap[c.offerTag] = c._count.offerTag;
  }
  const initialOffers = funnels.map((f: { id: string; ctaLabel: string; offerTag: string; active: boolean }) => ({ ...f, responseCount: countMap[f.offerTag] ?? 0 }));

  const offerNameByTag: Record<string, string> = {};
  for (const f of funnels) offerNameByTag[f.offerTag] = f.ctaLabel;

  return (
    <div className="min-h-screen bg-linen text-ink font-body">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="eyebrow">Admin only</p>
            <h1 className="font-display text-3xl mt-1">Dashboard</h1>
          </div>
          <p className="text-sm text-inkMuted">Signed in as {user.primaryEmail}</p>
        </div>
        <p className="text-inkMuted mb-8">
          Edit any button&rsquo;s text below and it updates on the live site right away.
        </p>

        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          <div className="bg-white rounded-2xl border border-sage/40 p-6">
            <p className="text-sm text-inkMuted">Total people who&rsquo;ve responded</p>
            <p className="font-display text-3xl mt-1">{totalLeads}</p>
          </div>
          <div className="bg-white rounded-2xl border border-sage/40 p-6">
            <p className="text-sm text-inkMuted">Reviews waiting for your approval</p>
            <p className="font-display text-3xl mt-1">{pendingReviewCount}</p>
          </div>
        </div>

        <AdminOffers initialOffers={initialOffers} />

        <div className="bg-white rounded-2xl border border-sage/40 p-6 mt-10">
          <h2 className="font-display text-xl mb-4">Recent responses</h2>
          {recentLeads.length === 0 ? (
            <p className="text-inkMuted text-sm">No one has responded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="text-left text-inkMuted border-b border-sage/30">
                    <th className="pb-2 font-medium">Name</th>
                    <th className="pb-2 font-medium">Email</th>
                    <th className="pb-2 font-medium">Responded to</th>
                    <th className="pb-2 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead: { id: string; name: string | null; email: string; offerTag: string | null; createdAt: Date }) => (
                    <tr key={lead.id} className="border-b border-sage/20 last:border-0">
                      <td className="py-2">{lead.name || '—'}</td>
                      <td className="py-2">{lead.email}</td>
                      <td className="py-2">
                        {(lead.offerTag && offerNameByTag[lead.offerTag]) || lead.offerTag || '—'}
                      </td>
                      <td className="py-2 text-inkMuted">{lead.createdAt.toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-inkMuted mt-8">
          To approve a review, run <code className="bg-surface px-1.5 py-0.5 rounded">npx prisma studio</code>,
          open the <code className="bg-surface px-1.5 py-0.5 rounded">Review</code> table, and change{' '}
          <code className="bg-surface px-1.5 py-0.5 rounded">approved</code> to true.
        </p>
      </div>
    </div>
  );
}