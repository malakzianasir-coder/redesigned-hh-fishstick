"use client"
import React, { useState } from 'react'

export default function KanbanPage() {
  const [modalContent, setModalContent] = useState<{title: string, body: React.ReactNode, isDone?: boolean} | null>(null)

  const Card = ({ title, isDone, children }: { title: string, isDone?: boolean, children: React.ReactNode }) => (
    <div 
      className="custom-card" 
      style={{ cursor: 'pointer', opacity: isDone ? 0.65 : 1 }}
      onClick={() => setModalContent({ title, body: children, isDone })}
    >
      <h3 className="vbg-label" style={{ textDecoration: isDone ? 'line-through' : 'none' }}>
        {title}
      </h3>
      <p className="vbg-meta mt-2" style={{ opacity: 0.6 }}>Click to view details &rarr;</p>
    </div>
  )

  return (
    <div className="vbg-shell relative">
      {modalContent && (
        <div 
          style={{
            position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)'
          }}
          onClick={() => setModalContent(null)}
        >
          <div 
            className="custom-card" 
            style={{ 
              width: '90%', maxWidth: '500px', background: 'var(--vbg-surface-primary)', cursor: 'default',
              boxShadow: '0 4px 24px rgba(0,0,0,0.1)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--vbg-space-4)' }}>
              <h2 className="vbg-heading-20" style={{ textDecoration: modalContent.isDone ? 'line-through' : 'none' }}>
                {modalContent.title}
              </h2>
              <button onClick={() => setModalContent(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1 }}>&times;</button>
            </div>
            {modalContent.body}
          </div>
        </div>
      )}

      <a className="vbg-skip-link" href="#main">
        Skip to content
      </a>
      <header className="vbg-header">
        <div className="vbg-masthead">
          <span className="vbg-identity">
            <span className="custom-company-name">NorthWest Innovation Labs & TwoCX LLC</span>
          </span>
          <div className="vbg-document-meta">August 12, 2026</div>
        </div>
      </header>
      
      <main id="main">
        <div className="vbg-section">
          <div className="custom-board">
            
            {/* Column 1: Awaiting Assets */}
            <div className="custom-board-column">
              <div className="custom-column-header">
                <h2 className="vbg-heading-16">Awaiting Pictures (Assets)</h2>
              </div>
              
              <Card title="Medical Departments">
                <p className="vbg-caption">We still need new, correct pictures for the various departments (some existing ones are placed incorrectly).</p>
              </Card>

              <Card title="Consultants">
                <p className="vbg-caption">We are awaiting the official Qualifications data for all consultants to complete their individual profile pages.</p>
              </Card>
            </div>

            {/* Column 2: Content Decisions & Tweaks */}
            <div className="custom-board-column">
              <div className="custom-column-header">
                <h2 className="vbg-heading-16">Content & Layout Decisions</h2>
              </div>
              
              <Card title="Page Headings & Text Fixes">
                <ul className="vbg-caption" style={{ paddingLeft: '1rem', listStyle: 'disc', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li>Taglines still need to be italicized globally without full stops.</li>
                  <li>The "Facts and Stats" description line needs fixing.</li>
                </ul>
              </Card>

              <Card title="IPD Content">
                <p className="vbg-caption">We need to revisit the IPD content structure (the heading in the services section is currently repeated across almost all pages under this menu).</p>
              </Card>
            </div>

            {/* Column 3: Done (Aug 12) */}
            <div className="custom-board-column">
              <div className="custom-column-header">
                <h2 className="vbg-heading-16">Done: Recent Updates (Aug 12)</h2>
              </div>

              <Card title="Hub Pages & Menus" isDone>
                <ul className="vbg-caption" style={{ paddingLeft: '1rem', listStyle: 'disc', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li>Created a dedicated "About Us" content hub, resolving the breadcrumb issue where clicking "About Us" went to the wrong page.</li>
                  <li>Explicitly moved the "Diagnostics" section so it sits properly under the Patient Care menu.</li>
                  <li>The Doctors Hub (and other filter buttons) now clearly display the total count of items on them.</li>
                  <li>Hub pages now hide category labels on cards when filtering by a specific category, for a cleaner look.</li>
                </ul>
              </Card>

              <Card title="Leadership Section" isDone>
                <ul className="vbg-caption" style={{ paddingLeft: '1rem', listStyle: 'disc', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li>Updated Mian Abdul Waheed's role to officially reflect "Co-Founder and Lifetime Chairman".</li>
                </ul>
              </Card>

              <Card title="Consultant Profiles" isDone>
                <ul className="vbg-caption" style={{ paddingLeft: '1rem', listStyle: 'disc', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li>Fixed text capitalization so it now reads properly as "Clinic Information".</li>
                </ul>
              </Card>

              <Card title="Donations & Patient Welfare" isDone>
                <ul className="vbg-caption" style={{ paddingLeft: '1rem', listStyle: 'disc', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li>Updated various donation content texts (how to donate, what you can support) and tweaked existing donation flow components.</li>
                </ul>
              </Card>

              <Card title="Homepage & UI Tweaks" isDone>
                <ul className="vbg-caption" style={{ paddingLeft: '1rem', listStyle: 'disc', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li>Replaced the hardcoded doctors grid on the homepage with a dynamic `HomeTeamCarousel`.</li>
                  <li>Added smooth, interactive floating animations to the "Facts Orbit" section on the homepage.</li>
                  <li>Minor design updates applied to the Site Header, Footer, and the Utility Top Bar.</li>
                  <li>Polished illustration gradients and mobile alignments to match the design system seamlessly.</li>
                </ul>
              </Card>
            </div>

            {/* Column 4: Done (Aug 11) */}
            <div className="custom-board-column">
              <div className="custom-column-header">
                <h2 className="vbg-heading-16">Done: Updates from Aug 11</h2>
              </div>

              <Card title="Leadership Section" isDone>
                <ul className="vbg-caption" style={{ paddingLeft: '1rem', listStyle: 'disc', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li>Replaced main leadership picture with new top banner.</li>
                  <li>Founders' pages display lifespan years.</li>
                  <li>Created dedicated biography page for Mian Abdul Waheed.</li>
                  <li>Removed "Late" from founders' titles.</li>
                  <li>Stacked Chairman & President layout names/years cleanly, removed redundant labels.</li>
                  <li>Added Senior Management team photos.</li>
                  <li>Removed phrase "presented in full" from messages.</li>
                  <li>Core Committees popup reveals Convener, Co-Convener, and Members.</li>
                </ul>
              </Card>

              <Card title="Our Impact & Partners" isDone>
                <ul className="vbg-caption" style={{ paddingLeft: '1rem', listStyle: 'disc', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li>Added logos/direct website links for health partners.</li>
                  <li>Cropped Tamgha-e-Imtiaz and rotated Visitors photos.</li>
                  <li>Highlights link directly to matching news articles.</li>
                </ul>
              </Card>

              <Card title="Doctor Profiles" isDone>
                <ul className="vbg-caption" style={{ paddingLeft: '1rem', listStyle: 'disc', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li>Separated "Qualifications" and "Specialty". Defaults to "MBBS" if missing.</li>
                </ul>
              </Card>

              <Card title="Navigation & Sorting" isDone>
                <ul className="vbg-caption" style={{ paddingLeft: '1rem', listStyle: 'disc', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li>Fixed hash link scrolling to jump to correct section.</li>
                  <li>Cleaned up names and capital letters in About Us & Patient Care menus.</li>
                  <li>Removed "Overview" from Diagnostics, standardized to Pathology/Clinical Lab.</li>
                  <li>Removed "Hub" wording from navigation areas.</li>
                  <li>Sorted procedures, services, doctors, and causes in alphabetical order.</li>
                </ul>
              </Card>
            </div>

          </div>
        </div>
      </main>

      <footer className="vbg-footer">
        <span className="custom-company-name">NorthWest Innovation Labs & TwoCX LLC</span>
      </footer>
    </div>
  )
}
